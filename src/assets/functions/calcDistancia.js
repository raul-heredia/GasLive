/**
 * Convert the latitude and longitude of two points to radians, calculate the distance between the
 * points in radians, convert the distance from radians to kilometers, and return the result.
 * @param lat1 - The latitude of the first point.
 * @param lon1 - The longitude of the first point.
 * @param lat2 - The latitude of the second point.
 * @param lon2 - The longitude of the second point
 * @returns The distance between two points in kilometers.
 */
export function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

/**
 * It converts degrees to radians.
 * @param Value - The value to be converted.
 * @returns The value in radians.
 */
function toRad(Value) {
    return Value * Math.PI / 180;
}