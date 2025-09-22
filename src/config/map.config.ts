import { type LatLngBoundsExpression } from 'leaflet'

export const mapProvider = {
    osm: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© OpenStreetMap contributors'
    }
}

export const Regions: Record<string, LatLngBoundsExpression> = {
    // define the display range of the whole nation
    USA: [
        [25.0, -125.0],                   // us southern-west
        [49.0, -66.5]                     // us northern-east
    ],
    Canada: [
        [41.7, -141.0],                   // canadian southern-west
        [70.0, -52.0]                    // canadian southern-west
    ]
}