export function resetClasses() {
    document.getElementById("distanciaA").classList.remove('order-asc', 'order-desc');
    document.getElementById("rotulo").classList.remove('order-asc', 'order-desc')
    document.getElementById("gasolina95").classList.remove('order-asc', 'order-desc');
    document.getElementById("gasolina98").classList.remove('order-asc', 'order-desc');
    document.getElementById("gasoilA").classList.remove('order-asc', 'order-desc');
    document.getElementById("gasoilPremium").classList.remove('order-asc', 'order-desc');
    document.getElementById("gnc").classList.remove('order-asc', 'order-desc');
    document.getElementById("gnl").classList.remove('order-asc', 'order-desc');
    document.getElementById("glp").classList.remove('order-asc', 'order-desc');
    document.getElementById("distanciaA").classList.add('no-ordered');
    document.getElementById("rotulo").classList.add('no-ordered');
    document.getElementById("gasolina95").classList.add('no-ordered');
    document.getElementById("gasolina98").classList.add('no-ordered');
    document.getElementById("gasoilA").classList.add('no-ordered');
    document.getElementById("gasoilPremium").classList.add('no-ordered');
    document.getElementById("gnc").classList.add('no-ordered');
    document.getElementById("gnl").classList.add('no-ordered');
    document.getElementById("glp").classList.add('no-ordered');
}
export function addClass(id, order) {
    document.getElementById(id).classList.add(order)
    document.getElementById(id).classList.remove("no-ordered")
}

export function switchClasses(order) {
    let id;
    if (document.getElementById("distanciaA").classList.contains('order-asc') || document.getElementById("distanciaA").classList.contains('order-desc')) id = "distanciaA";
    if (document.getElementById("rotulo").classList.contains('order-asc') || document.getElementById("rotulo").classList.contains('order-desc')) id = "rotulo";
    if (document.getElementById("gasolina95").classList.contains('order-asc') || document.getElementById("gasolina95").classList.contains('order-desc')) id = "gasolina95";
    if (document.getElementById("gasolina98").classList.contains('order-asc') || document.getElementById("gasolina98").classList.contains('order-desc')) id = "gasolina98";
    if (document.getElementById("gasoilA").classList.contains('order-asc') || document.getElementById("gasoilA").classList.contains('order-desc')) id = "gasoilA";
    if (document.getElementById("gasoilPremium").classList.contains('order-asc') || document.getElementById("gasoilPremium").classList.contains('order-desc')) id = "gasoilPremium";
    if (document.getElementById("gnc").classList.contains('order-asc') || document.getElementById("gnc").classList.contains('order-desc')) id = "gnc";
    if (document.getElementById("gnl").classList.contains('order-asc') || document.getElementById("gnl").classList.contains('order-desc')) id = "gnl";
    if (document.getElementById("glp").classList.contains('order-asc') || document.getElementById("glp").classList.contains('order-desc')) id = "glp";
    resetClasses();
    addClass(id, order ? 'order-asc' : 'order-desc')
}