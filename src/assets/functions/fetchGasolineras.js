/**
 * It fetches the data from the API and returns it as a JSON object
 * @returns An array of objects.
 */
export async function fetchGasolineras() {
    const response = await fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/');
    const data = await response.json();
    return data;
}