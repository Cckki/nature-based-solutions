/**
 * 
 * @param  locations original
 * @returns filtered locations
 */
export const coordinateFilter = (locations: { latitude?: number; longitude?: number }[]): { latitude: number; longitude: number }[] => {
    console.log('detected spots: ' + locations.length)
    return locations.filter(
        (spot): spot is { latitude: number; longitude: number } =>
            typeof spot.latitude === "number" && typeof spot.longitude === "number"
    )
}