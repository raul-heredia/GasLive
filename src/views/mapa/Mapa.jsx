import React, { useState, useEffect, useRef } from 'react';
import { Map, View, } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import "./Mapa.css";
export default function Mapa() {
    const [map, setMap] = useState();

    let [
        view = new View({
            center: fromLonLat([-3.70256, 40.4165]),
            zoom: 5
        }),
        latitud = 40.4165,
        longitud = -3.70256
    ] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (posicio) {
            latitud = posicio.coords.latitude;
            longitud = posicio.coords.longitude;
            console.log("state", latitud, longitud)
            view.animate({
                center: fromLonLat([longitud, latitud]),
                zoom: 11,
                duration: 1500,
            })
        });
    } else {
        console.log("Localització no disponible")
    }
    useEffect(() => {
        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: view
        });
        setMap(initialMap);
    }, []);

    return (
        <div ref={mapElement} className="map-container mapa" />
    );
}