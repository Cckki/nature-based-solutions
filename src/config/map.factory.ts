import L, { Map, Icon, icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet.markercluster"
import { mapProvider, Regions } from "@/config/map.config"
import defaultIcon from "@/assets/icon/defaultMarker.svg"
import shoreIcon from "@/assets/icon/shoreMarker.svg"
import urbanIcon from "@/assets/icon/urbanMarker.svg"
import roadIcon from "@/assets/icon/roadMarker.svg"
import stormIcon from "@/assets/icon/stormMarker.svg"
import wildIcon from "@/assets/icon/wildMarker.svg"

/** customize each marker for different asset type **/
const defaultMarker = L.icon({
    iconUrl: defaultIcon,
    iconSize: [12, 12],
    iconAnchor: [0, 0],
    popupAnchor: [6, -1],
})

const shoreMarker = L.icon({
    iconUrl: shoreIcon,
    iconSize: [12, 12],
    iconAnchor: [0, 0],
    popupAnchor: [6, -1],
})

const urbanMarker = L.icon({
    iconUrl: urbanIcon,
    iconSize: [12, 12],
    iconAnchor: [0, 0],
    popupAnchor: [6, -1],
})

const roadMarker = L.icon({
    iconUrl: roadIcon,
    iconSize: [12, 12],
    iconAnchor: [0, 0],
    popupAnchor: [6, -1],
})

const wildMarker = L.icon({
    iconUrl: wildIcon,
    iconSize: [12, 12],
    iconAnchor: [0, 0],
    popupAnchor: [6, -1],
})

const stormMarker = L.icon({
    iconUrl: stormIcon,
    iconSize: [12, 12],
    iconAnchor: [0, 0],
    popupAnchor: [6, -1],
})

const customizeMarker = (type: string): Icon => {
    switch (type) {
        case 'coastal':
            return shoreMarker
        case 'riverine':
            return urbanMarker
        case 'stormwater':
            return stormMarker
        case 'uplandSlope':
            return wildMarker
        case 'corridor':
            return roadMarker
        default:
            return defaultMarker
    }
}

const legendData = [
    { icon: shoreIcon, label: 'coastal' },
    { icon: urbanIcon, label: 'riverine' },
    { icon: stormIcon, label: 'stormwater' },
    { icon: wildIcon, label: 'uplandSlope' },
    { icon: roadIcon, label: 'corridor' }
]

/**
 * @param map -> map-instance to be added
 */
export const initLegend = (map: Map) => {
    // @ts-ignore
    const legend = L.control({ position: "bottomright" })
    legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.style.background = "white";
        div.style.padding = "8px";
        div.style.border = "1px solid #ccc";
        div.style.borderRadius = "4px";
        div.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
        div.style.fontSize = "12px";
        div.style.lineHeight = "20px";

        div.innerHTML = legendData
            .map(
                (item) => `
                               <div style="display:flex; align-items:center; margin-bottom:4px;">
                                 <img src="${item.icon}" width="12" height="12" style="margin-right:6px;">
                                 <span>${item.label}</span>
                               </div>
                               `
            )
            .join("");

        return div;
    }
    legend.addTo(map)
    return legend               //  return instance for future usage
}
/**
 * 
 * @param elementId -> div id for map display
 * @param bounds      -> view 
 * @returns  an instance of map and clusterGroup for instance to add markers later
 */
export const initMap = (
    elementId: string,
    bounds?: L.LatLngBoundsExpression
): {
    map: Map;
    // @ts-ignore
    markerCluster: L.MarkerClusterGroup                   // ignore MarkerClusterGroup type warning
} => {
    /************* initiate map instance *************/
    const mapInstance: Map = L.map(elementId, {
        zoom: 5,                                                             // national level
        maxZoom: 19                                                      // world-wide level
    })

    /************** config map source **************/
    L.tileLayer(mapProvider.osm.url, {
        attribution: mapProvider.osm.attribution
    }).addTo(mapInstance)

    /******** customize default marker icon *********/
    // L.Marker.prototype.options.icon = L.icon({
    //     iconUrl: defaultIcon,
    //     iconSize: [12, 12],
    //     iconAnchor: [0, 0],
    //     popupAnchor: [6, 0],
    // })
    
    /**** build marker cluster for instance to add ****/
    // @ts-ignore
    const markerCluster = L.markerClusterGroup()     // ignore MarkerClusterGroup type warning
    mapInstance.addLayer(markerCluster)

    /************ set default central view ***********/
    if (bounds) mapInstance.fitBounds(bounds)
    else mapInstance.fitBounds(Regions.USA)

    return { map: mapInstance, markerCluster }
}

/**
 * 
 * @param map                  -> instance of map where to add pending markers
 * @param locations          -> pending markers
 * @param markerCluster -> cluster to add pending markers ! markerCluster is not an attribute of  Map !
 * @param onMarkerClick -> click event to impart data
 */
export const lazyLoadMarkers = (
    map: L.Map,
    locations: any[],                                                    // cases data -> array
    // @ts-ignore
    markerCluster?: L.MarkerClusterGroup,               // ignore MarkerClusterGroup type warning
    onMarkerClick?: (location: any) => void
) => {
    if (locations.length == 0) return
    console.log('valid spots: ' + locations.length)
    const pendingMarkers: L.Marker[] = []

    /*************** for lazy load (incomplete ) ***************/
    // const bounds = map.getBounds()                       // get current window range  

    locations.forEach((item) => {
        const marker = L.marker([item.latitude, item.longitude], { icon: customizeMarker(item.category) }).bindPopup(`<b>${item.Asset ?? ""}</b>`)
        marker.on("mouseover", () => marker.openPopup())
        marker.on("mouseout", () => marker.closePopup())
        marker.on("click", () => {
            if (onMarkerClick) onMarkerClick(item)
        })
        if (!markerCluster) marker.addTo(map)
        else pendingMarkers.push(marker)
    })

    if (markerCluster && pendingMarkers.length > 0) markerCluster.addLayers(pendingMarkers)
}