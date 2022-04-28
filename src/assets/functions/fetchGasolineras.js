export async function fetchGasolineras() {
    const response = await fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/');
    const data = await response.json();
    return data;
}