import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { calcCrow } from '../../assets/functions/calcDistancia'
import { resetClasses, addClass, switchClasses } from "./classes";
import "./Lista.css";

export default function Lista() {
    const [gasolineras, setGasolineras] = useState([]);
    const [gasFilter, setGasFilter] = useState([]);
    const [gasFilterSearch, setGasFilterSearch] = useState(['']);
    const [distanciaFilter, setDistanciaFilter] = useState(5);
    const [mediasCombustible, setMediasCombustible] = useState({});
    const [ubicacionUsuari, setUbicacionUsuari] = useState({})
    const [sortBy, setSortBy] = useState('distanciaA');
    const [orderBy, setOrderBy] = useState(1);
    useEffect(() => {
        document.body.classList.remove('overflownt');
        document.body.classList.add('overflow');
        let gasTemp = JSON.parse(sessionStorage.getItem('gasolineras')) || 0;
        if (!gasTemp) {
            window.location.href = window.location.protocol + "//" + window.location.host;
        }
        let ubiTemp = JSON.parse(sessionStorage.getItem('ubicacionUsuari'));
        if (!ubiTemp) {
            ubiTemp = {
                lat: 40.416775,
                lng: -3.703790
            };
        }
        gasTemp.splice(0, 1);
        gasTemp.splice(0, 1);
        setUbicacionUsuari(ubiTemp);
        filterGasolineras()
        setGasolineras(gasTemp);
    })
    function filterGasolineras() {
        let mediasTemp = {};
        let gasFilterTemp = [];
        let media95 = 0, media98 = 0, mediaGasoilA = 0, mediaGasoilP = 0, mediaGnc = 0, mediaGnl = 0, mediaGlp = 0;
        let c95 = 0, c98 = 0, cGasA = 0, cGasP = 0, cGnc = 0, cGnl = 0, cGlp = 0;
        gasolineras.forEach(gasolinera => {
            let distancia = calcCrow(ubicacionUsuari.lat, ubicacionUsuari.lng, gasolinera.latitud, gasolinera.longitud).toFixed(1)
            if (distancia <= distanciaFilter) {
                try {
                    gasolinera.gasolina95 = gasolinera.gasolina95.replace(',', '.') * 1;
                    gasolinera.gasolina98 = gasolinera.gasolina98.replace(',', '.') * 1;
                    gasolinera.gasoilA = gasolinera.gasoilA.replace(',', '.') * 1;
                    gasolinera.gasoilPremium = gasolinera.gasoilPremium.replace(',', '.') * 1;
                    gasolinera.gnc = gasolinera.gnc.replace(',', '.') * 1;
                    gasolinera.gnl = gasolinera.gnl.replace(',', '.') * 1;
                    gasolinera.glp = gasolinera.glp.replace(',', '.') * 1;
                } catch (error) { }
                if (gasolinera.gasolina95) c95 += 1; media95 += gasolinera.gasolina95;
                if (gasolinera.gasolina98) c98 += 1; media98 += gasolinera.gasolina98;
                if (gasolinera.gasoilA) cGasA += 1; mediaGasoilA += gasolinera.gasoilA;
                if (gasolinera.gasoilPremium) cGasP += 1; mediaGasoilP += gasolinera;
                if (gasolinera.gnc) cGnc += 1; mediaGnc += gasolinera.gnc;
                if (gasolinera.gnl) cGnl += 1; mediaGnl += gasolinera.gnl;
                if (gasolinera.glp) cGlp += 1; mediaGlp += gasolinera.glp;
                gasolinera.distanciaA = distancia;
                gasFilterTemp.push(gasolinera);
            }
        })
        media95 = (media95 / c95).toFixed(3); media98 = (media98 / c98).toFixed(3); mediaGasoilA = (mediaGasoilA / cGasA).toFixed(3); mediaGasoilP = (mediaGasoilP / cGasP).toFixed(3); mediaGnc = (mediaGnc / cGnc).toFixed(3); mediaGnl = (mediaGnl / cGnl).toFixed(3); mediaGlp = (mediaGlp / cGlp).toFixed(3);
        mediasTemp.media95 = media95; mediasTemp.media98 = media98; mediasTemp.mediaGasA = mediaGasoilA; mediasTemp.mediaGasP = mediaGasoilP; mediasTemp.mediaGnc = mediaGnc; mediasTemp.mediaGnl = mediaGnl; mediasTemp.mediaGlp = mediaGlp;

        gasFilterTemp.sort((a, b) => {
            if (orderBy) {
                if (!a[sortBy]) a[sortBy] = 999;
                if (!b[sortBy]) b[sortBy] = 999;
                return a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            }
        });
        setGasFilter(gasFilterTemp);
        setMediasCombustible(mediasTemp);
    }
    function handleClick(ev) {
        if (ev.target.id == "rotulo") return;
        let cssClass = orderBy ? 'order-asc' : 'order-desc';
        resetClasses();
        setSortBy(ev.target.id);
        addClass(ev.target.id, cssClass);
    }
    function handleDistance(ev) {
        setDistanciaFilter(ev.target.value * 1);
    }
    function handleOrderBy(ev) {
        setOrderBy(ev.target.value * 1);
        switchClasses(ev.target.value * 1);
    }
    function handleSearch(ev) {
        console.log(ev.target.value);
        setGasFilterSearch(ev.target.value);
    }
    return (
        <main className="container mx-auto mb-2 px-4 pt-20">
            <div className="flex justify-center gap-3 flex-wrap">
                <div className="mb-3 xl:w-96">
                    <label htmlFor="orderBy">Ordenar por</label>
                    <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="orderBy" onChange={handleOrderBy}>
                        <option value="1">Orden Ascendente</option>
                        <option value="0">Orden Descendente</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <div className="mb-3 xl:w-96">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <label htmlFor="buscarGasolinera">Buscar Gasolinera</label>
                            <input type="search" name="buscarGasolinera" onKeyUp={handleSearch} class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Buscar" aria-label="Search" aria-describedby="button-addon2" />
                        </div>
                    </div>
                </div>
                <div className="relative pt-1">
                    <label htmlFor="distance">Limitar Distancia a: <span className="text-gray-800">{distanciaFilter} KM</span></label>
                    <input type="range" min="1" max="25" name="distance" value={distanciaFilter} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" onChange={handleDistance} />
                </div>
            </div>

            <div className="tablaCombustible rounded-lg border shadow-2xl mt-5">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-800 ph-5" onClick={handleClick}>
                            <th className="p-4 text-neutral-50 text-left cursor-pointer order-asc" id="distanciaA">Distancia</th>
                            <th className="p-4 text-neutral-50 text-left cursor-default no-ordered" id="rotulo">Gasolinera</th>
                            <th className="p-4 text-neutral-50 text-left cursor-pointer no-ordered" id="gasolina95">Gasolina 95</th>
                            <th className="p-4 text-neutral-50 text-left cursor-pointer no-ordered" id="gasolina98" >Gasolina 98</th>
                            <th className="p-4 text-neutral-50 text-left cursor-pointer no-ordered" id="gasoilA" >Gasoil A</th>
                            <th className="p-4 text-neutral-50 text-left cursor-pointer no-ordered" id="gasoilPremium" >Gasoil +</th>
                            <th className="p-4 text-neutral-50 text-left cursor-pointer no-ordered" id="gnc" >GNC</th>
                            <th className="p-4 text-neutral-50 text-left cursor-pointer no-ordered" id="gnl" >GNL</th>
                            <th className="p-4 text-neutral-50 text-left cursor-pointer no-ordered" id="glp" >GLP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gasFilterSearch == '' ? gasFilter.map((gasolinera) => {
                            let nd = <span className='nd'>N/D</span>
                            return (
                                <tr key={gasolinera.key} >
                                    <td className="p-4">{gasolinera.distanciaA} KM</td>
                                    <td className="p-4"><a className="text-blue-600 hover:text-blue-900 visited:text-blue-600" target="_blank" href={`https://maps.google.com/?ll=${gasolinera.latitud},${gasolinera.longitud}`}>{gasolinera.rotulo}</a></td>
                                    <td className={"p-4 " + (gasolinera.gasolina95 > mediasCombustible.media95 ? 'caro' : 'barato')}>{gasolinera.gasolina95 && gasolinera.gasolina95 != 999 ? gasolinera.gasolina95 + "€" : nd}</td>
                                    <td className={"p-4 " + (gasolinera.gasolina98 > mediasCombustible.media98 ? 'caro' : 'barato')}>{gasolinera.gasolina98 && gasolinera.gasolina98 != 999 ? gasolinera.gasolina98 + "€" : nd}</td>
                                    <td className={"p-4 " + (gasolinera.gasoilA > mediasCombustible.mediaGasA ? 'caro' : 'barato')}>{gasolinera.gasoilA && gasolinera.gasoilA != 999 ? gasolinera.gasoilA + "€" : nd}</td>
                                    <td className={"p-4 " + (gasolinera.gasoilPremium > mediasCombustible.mediaGasP ? 'caro' : 'barato')}>{gasolinera.gasoilPremium && gasolinera.gasoilPremium != 999 ? gasolinera.gasoilPremium + "€" : nd}</td>
                                    <td className={"p-4 " + (gasolinera.gnc > mediasCombustible.mediaGnc ? 'caro' : 'barato')}>{gasolinera.gnc && gasolinera.gnc != 999 ? gasolinera.gnc + "€" : nd}</td>
                                    <td className={"p-4 " + (gasolinera.gnl > mediasCombustible.mediaGnl ? 'caro' : 'barato')}>{gasolinera.gnl && gasolinera.gnl != 999 ? gasolinera.gnl + "€" : nd}</td>
                                    <td className={"p-4 " + (gasolinera.glp > mediasCombustible.mediaGlp ? 'caro' : 'barato')}>{gasolinera.glp && gasolinera.glp != 999 ? gasolinera.glp + "€" : nd}</td>
                                </tr>
                            )
                        }) : gasFilter.map((gasolinera) => {
                            let nd = <span className='nd'>N/D</span>
                            if (gasolinera.rotulo.startsWith(gasFilterSearch.toUpperCase())) {
                                return (
                                    <tr key={gasolinera.key} >
                                        <td className="p-4">{gasolinera.distanciaA} KM</td>
                                        <td className="p-4"><a className="text-blue-600 hover:text-blue-900 visited:text-blue-600" target="_blank" href={`https://maps.google.com/?ll=${gasolinera.latitud},${gasolinera.longitud}`}>{gasolinera.rotulo}</a></td>
                                        <td className={"p-4 " + (gasolinera.gasolina95 > mediasCombustible.media95 ? 'caro' : 'barato')}>{gasolinera.gasolina95 && gasolinera.gasolina95 != 999 ? gasolinera.gasolina95 + "€" : nd}</td>
                                        <td className={"p-4 " + (gasolinera.gasolina98 > mediasCombustible.media98 ? 'caro' : 'barato')}>{gasolinera.gasolina98 && gasolinera.gasolina98 != 999 ? gasolinera.gasolina98 + "€" : nd}</td>
                                        <td className={"p-4 " + (gasolinera.gasoilA > mediasCombustible.mediaGasA ? 'caro' : 'barato')}>{gasolinera.gasoilA && gasolinera.gasoilA != 999 ? gasolinera.gasoilA + "€" : nd}</td>
                                        <td className={"p-4 " + (gasolinera.gasoilPremium > mediasCombustible.mediaGasP ? 'caro' : 'barato')}>{gasolinera.gasoilPremium && gasolinera.gasoilPremium != 999 ? gasolinera.gasoilPremium + "€" : nd}</td>
                                        <td className={"p-4 " + (gasolinera.gnc > mediasCombustible.mediaGnc ? 'caro' : 'barato')}>{gasolinera.gnc && gasolinera.gnc != 999 ? gasolinera.gnc + "€" : nd}</td>
                                        <td className={"p-4 " + (gasolinera.gnl > mediasCombustible.mediaGnl ? 'caro' : 'barato')}>{gasolinera.gnl && gasolinera.gnl != 999 ? gasolinera.gnl + "€" : nd}</td>
                                        <td className={"p-4 " + (gasolinera.glp > mediasCombustible.mediaGlp ? 'caro' : 'barato')}>{gasolinera.glp && gasolinera.glp != 999 ? gasolinera.glp + "€" : nd}</td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </main >
    );
}