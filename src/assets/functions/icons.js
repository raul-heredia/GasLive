import L from "leaflet";

export var defaultIcon = L.icon({
    iconUrl: '/icons/logo.svg',
    iconSize: [38, 24], // size of the icon
    iconAnchor: [24, 24], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
export var repsol = L.icon({
    iconUrl: '/icons/REPSOL.png',
    iconSize: [38, 24], // size of the icon
    iconAnchor: [24, 24], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});