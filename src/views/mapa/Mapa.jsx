import React, { useState, useEffect, useRef } from 'react';
import { Map, View, } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import "./Mapa.css";
export default function Mapa() {
    const [map, setMap] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;

    useEffect(() => {
        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([2.190907184737403, 41.41310947011314]),
                zoom: 7,
            })
        });
        setMap(initialMap);
    }, []);

    return (
        <div ref={mapElement} className="map-container mapa" />
    );
}