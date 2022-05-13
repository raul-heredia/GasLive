import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { calcCrow } from '../../assets/functions/calcDistancia'

import "./Lista.css";
export default function Lista() {
    const [gasolineras, setGasolineras] = useState([]);
    const [gasFilter, setGasFilter] = useState([]);
    const [mediasCombustible, setMediasCombustible] = useState({});
    const [ubicacionUsuari, setUbicacionUsuari] = useState({})
    const [clickValue, setClickValue] = useState('');
    useEffect(() => {
        document.body.classList.remove('overflownt');
        document.body.classList.add('overflow');
        let gasTemp = JSON.parse(sessionStorage.getItem('gasolineras'));
        let ubiTemp = JSON.parse(sessionStorage.getItem('ubicacionUsuari'));
        let mediasTemp = {};
        gasTemp.splice(0, 1)
        gasTemp.splice(0, 1)
        let gasFilterTemp = [];
        let media95 = 0, media98 = 0, mediaGasoilA = 0, mediaGasoilP = 0, mediaGnc = 0, mediaGnl = 0, mediaGlp = 0;
        let c95 = 0, c98 = 0, cGasA = 0, cGasP = 0, cGnc = 0, cGnl = 0, cGlp = 0;
        gasTemp.forEach(gasolinera => {
            let distancia = calcCrow(ubiTemp.lat, ubiTemp.lng, gasolinera.latitud, gasolinera.longitud).toFixed(1)
            if (distancia <= 22) {
                if (gasolinera.gasolina95) c95 += 1; media95 += gasolinera.gasolina95.replace(',', '.') * 1;
                if (gasolinera.gasolina98) c98 += 1; media98 += gasolinera.gasolina98.replace(',', '.') * 1;
                if (gasolinera.gasoilA) cGasA += 1; mediaGasoilA += gasolinera.gasoilA.replace(',', '.') * 1;
                if (gasolinera.gasoilPremium) cGasP += 1; mediaGasoilP += gasolinera.gasoilPremium.replace(',', '.') * 1;
                if (gasolinera.gnc) cGnc += 1; mediaGnc += gasolinera.gnc.replace(',', '.') * 1;
                if (gasolinera.gnl) cGnl += 1; mediaGnl += gasolinera.gnl.replace(',', '.') * 1;
                if (gasolinera.glp) cGlp += 1; mediaGlp += gasolinera.glp.replace(',', '.') * 1;
                gasolinera.distanciaA = distancia;
                gasFilterTemp.push(gasolinera);
            }
        })
        media95 = (media95 / c95).toFixed(3); media98 = (media98 / c98).toFixed(3); mediaGasoilA = (mediaGasoilA / cGasA).toFixed(3); mediaGasoilP = (mediaGasoilP / cGasP).toFixed(3); mediaGnc = (mediaGnc / cGnc).toFixed(3); mediaGnl = (mediaGnl / cGnl).toFixed(3); mediaGlp = (mediaGlp / cGlp).toFixed(3);
        mediasTemp.media95 = media95; mediasTemp.media98 = media98; mediasTemp.mediaGasA = mediaGasoilA; mediasTemp.mediaGasP = mediaGasoilP; mediasTemp.mediaGnc = mediaGnc; mediasTemp.mediaGnl = mediaGnl; mediasTemp.mediaGlp = mediaGlp;
        gasFilterTemp.sort((a, b) => {
            return a.distanciaA - b.distanciaA;
        });
        setUbicacionUsuari(ubiTemp);
        setGasolineras(gasTemp);
        setGasFilter(gasFilterTemp);
        setMediasCombustible(mediasTemp);
    })
    function handleClick(e) {
        setClickValue(e.target.id)
    }
    return (
        <main className="container mx-auto mb-2 px-4 pt-20">
            <button value="5" onClick={handleClick}></button>
            <div className="tablaCombustible rounded-lg border shadow-2xl mt-5">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-800" onClick={handleClick}>
                            <th className="p-4 text-neutral-50 text-left" id="distanciaA">Distancia</th>
                            <th className="p-4 text-neutral-50 text-left" id="rotulo">Gasolinera</th>
                            <th className="p-4 text-neutral-50 text-left" id="gasolina95">Gasolina 95</th>
                            <th className="p-4 text-neutral-50 text-left" id="gasolina98" >Gasolina 98</th>
                            <th className="p-4 text-neutral-50 text-left" id="gasoilA" >Gasoil A</th>
                            <th className="p-4 text-neutral-50 text-left" id="gasoilPremium" >Gasoil +</th>
                            <th className="p-4 text-neutral-50 text-left" id="gnc" >GNC</th>
                            <th className="p-4 text-neutral-50 text-left" id="gnl" >GNL</th>
                            <th className="p-4 text-neutral-50 text-left" id="glp" >GLP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gasFilter.sort((a, b) => {
                            return a[clickValue] * 1 - b[clickValue] * 1;
                        }).map((gasolinera) => {
                            let precio95 = gasolinera.gasolina95.replace(',', '.') * 1, precio98 = gasolinera.gasolina98.replace(',', '.') * 1, precioGasA = gasolinera.gasoilA.replace(',', '.') * 1, precioGasPrem = gasolinera.gasoilPremium.replace(',', '.') * 1, precioGnc = gasolinera.gnc.replace(',', '.') * 1, precioGnl = gasolinera.gnl.replace(',', '.') * 1, precioGlp = gasolinera.glp.replace(',', '.') * 1;
                            let nd = <span className='nd'>N/D</span>
                            return (
                                <tr key={gasolinera.key}>
                                    <td className="p-4">{gasolinera.distanciaA} KM</td>
                                    <td className="p-4">{gasolinera.rotulo}</td>
                                    <td className={"p-4 " + (precio95 > mediasCombustible.media95 ? 'caro' : 'barato')}>{gasolinera.gasolina95 ? gasolinera.gasolina95 + "€" : nd}</td>
                                    <td className={"p-4 " + (precio98 > mediasCombustible.media98 ? 'caro' : 'barato')}>{gasolinera.gasolina98 ? gasolinera.gasolina98 + "€" : nd}</td>
                                    <td className={"p-4 " + (precioGasA > mediasCombustible.mediaGasA ? 'caro' : 'barato')}>{gasolinera.gasoilA ? gasolinera.gasoilA + "€" : nd}</td>
                                    <td className={"p-4 " + (precioGasPrem > mediasCombustible.mediaGasP ? 'caro' : 'barato')}>{gasolinera.gasoilPremium ? gasolinera.gasoilPremium + "€" : nd}</td>
                                    <td className={"p-4 " + (precioGnc > mediasCombustible.mediaGnc ? 'caro' : 'barato')}>{gasolinera.gnc ? gasolinera.gnc + "€" : nd}</td>
                                    <td className={"p-4 " + (precioGnl > mediasCombustible.mediaGnl ? 'caro' : 'barato')}>{gasolinera.gnl ? gasolinera.gnl + "€" : nd}</td>
                                    <td className={"p-4 " + (precioGlp > mediasCombustible.mediaGlp ? 'caro' : 'barato')}>{gasolinera.glp ? gasolinera.glp + "€" : nd}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </main >
    );
}