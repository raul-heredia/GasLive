
import React, { useEffect, useState } from "react";
import { MapContainer as Map, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon, latlng } from 'leaflet';
import './Mapa.css';
import { fetchGasolineras } from '../../assets/functions/fetchGasolineras'

export default function Mapa() {
    // Obtenemos localizacion del usuario y lo mostramos en el mapa
    function LocationMarker() {
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);
        const map = useMap();
        useEffect(() => {
            map.locate().on("locationfound", (e) => {
                setPosition(e.latlng);
                map.flyTo(e.latlng, 13, {
                    duration: 2.5
                });
                const radius = e.accuracy;
                const circle = L.circle(e.latlng, radius);
                circle.addTo(map);
                setBbox(e.bounds.toBBoxString().split(","));
            });
        }, [map]);
    }
    function loadMarkers() {
        const [gasolineras] = useState([]);
        const map = useMap();
        useEffect(() => {


        }, [map]);
    }


    return (
        <Map center={[40.416775, -3.703790]} zoom={6} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </Map>
    );
}