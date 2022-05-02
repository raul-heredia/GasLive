
import React, { useEffect, useState } from "react";
import { MapContainer as Map, TileLayer, useMap } from 'react-leaflet';
import L from "leaflet";
import './Mapa.css';

import { fetchGasolineras } from '../../assets/functions/fetchGasolineras'
import { calcCrow } from "../../assets/functions/calcDistancia";
import * as Iconos from "../../assets/functions/icons";

export default function Mapa() {
    // Obtenemos localizacion del usuario y lo mostramos en el mapa
    let gasolineras = useState([]);
    let ubicacionUsuari = useState();
    function LocationMarker() {
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);
        const map = useMap();
        useEffect(() => {
            map.locate().on("locationfound", (e) => {
                setPosition(e.latlng);
                ubicacionUsuari = e.latlng;
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
    function LoadMarkers() {
        const map = useMap();
        useEffect(() => {
            fetchGasolineras().then(response => {
                response.ListaEESSPrecio.forEach((gasolinera, index) => {
                    // Datos Gasolinera
                    let key = index;
                    let codigoPostal = gasolinera['C.P.'];
                    let direccion = gasolinera['Dirección'];
                    let horario = gasolinera['Horario'];
                    let localidad = gasolinera['Localidad'];
                    let municipio = gasolinera['Municipio'];
                    let provincia = gasolinera['Provincia'];
                    let rotulo = gasolinera['Rótulo']
                    // Coordenadas
                    let long = gasolinera['Longitud (WGS84)'].replace(',', '.');
                    let lat = gasolinera['Latitud'].replace(',', '.');
                    // Precio Gasoil    
                    let gasoilA = gasolinera['Precio Gasoleo A'];
                    let gasoilB = gasolinera['Precio Gasoleo B'];
                    let gasoilPremium = gasolinera['Precio Gasoleo Premium'];
                    // Precio Gasolina
                    let gasolina95 = gasolinera['Precio Gasolina 95 E10'] ? gasolinera['Precio Gasolina 95 E10'] : gasolinera['Precio Gasolina 95 E5'];
                    let gasolina95Premium = gasolinera['Precio Gasolina 95 E5 Premium'];
                    let gasolina98 = gasolinera['Precio Gasolina 98 E10'] ? gasolinera['Precio Gasolina 98 E10'] : gasolinera['Precio Gasolina 98 E5'];
                    let g = {
                        key: key,
                        latitud: lat,
                        longitud: long,
                        codigoPostal: codigoPostal,
                        direccion: direccion,
                        horario: horario,
                        localidad: localidad,
                        municipio: municipio,
                        provincia: provincia,
                        rotulo: rotulo,
                        gasoilA: gasoilA,
                        gasoilB: gasoilB,
                        gasoilPremium: gasoilPremium,
                        gasolina95: gasolina95,
                        gasolina95Premium: gasolina95Premium,
                        gasolina98: gasolina98
                    }
                    gasolineras.push(g);
                    if (calcCrow(ubicacionUsuari.lat, ubicacionUsuari.lng, g.latitud, g.longitud).toFixed(1) <= 100) {
                        console.log(g)
                        let rotulo = g.rotulo.split(' ');
                        let texto = `
                            <h1 class="text-xl mb-2">${g.rotulo}</h1>
                            <p><span class="font-bold">Dirección: </span><span>${g.direccion} ${codigoPostal}</span>
                            <p><span class="font-bold">Horario: </span><span>${g.horario}</span>
                            <div class="tablaCombustible rounded-lg border shadow-2xl mt-5">
                                <table class="table-auto w-full text-left">
                                    <thead>
                                        <tr class="bg-gray-800 rounded-lg">
                                            <th class="p-4 text-neutral-50 text-left">Combustible</th>
                                            <th class="p-4 text-neutral-50 text-left">Precio</th>
                                        </tr>
                                    <tbody>
                                            <tr class="bg-gray-800 text-center">
                                                <th colspan="2" class="p-4 text-neutral-50">Gasoil</th>
                                            </tr>
                                            ${g.gasoilA && `<tr>
                                                <td class="p-4">Gasoil A</td>
                                                <td class="p-4">${g.gasoilA} €</td>
                                            </tr>`}
                                            ${g.gasoilPremium && `<tr>
                                                <td class="p-4">Gasoil Premium</td>
                                                <td class="p-4">${g.gasoilPremium} €</td>
                                            </tr>`}
                                            ${g.gasoilB && `<tr>
                                                <td class="p-4">Gasoil Agrícola</td>
                                                <td class="p-4">${g.gasoilB} €</td>
                                            </tr>`}
                                            <tr class="bg-gray-800 text-center">
                                                <th colspan="2" class="p-4 text-neutral-50">Gasolina</th>
                                            </tr>
                                            ${g.gasolina95 && `<tr>
                                                <td class="p-4">Gasolina 95</td>
                                                <td class="p-4">${g.gasolina95} €</td>
                                            </tr>`}
                                            ${g.gasolina95Premium && `<tr>
                                                <td class="p-4">Gasolina 95 Premium</td>
                                                <td class="p-4">${g.gasolina95Premium} €</td>
                                            </tr>`}
                                            ${g.gasolina98 && `<tr>
                                                <td class="p-4">Gasolina 98</td>
                                                <td class="p-4">${g.gasolina98} €</td>
                                            </tr>`}
                                    </tbody>
                                </table>
                            </div>
                                            
                        `;
                        const marker = L.marker([g.latitud, g.longitud], { icon: Iconos[rotulo[0]] ? Iconos[rotulo[0]] : Iconos.defaultIcon }).bindPopup(texto);
                        marker.addTo(map);
                    }
                });
            }).then(() => console.log("final"));
        }, [map]);
    }

    return (
        <Map center={[40.416775, -3.703790]} zoom={6} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <LoadMarkers />
        </Map >
    );
}