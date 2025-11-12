function recuperarDadesTiquet() { }

function enviaJSONAServer() { }

function passaProducteCarret() { }

window.addEventListener("DOMContentLoaded", function () {
    const botons = document.querySelectorAll(".afegeix-carret");
    botons.forEach(function (boton) {
        boton.addEventListener("click", function (e) {
            passaProducteCarret(boton);
        });
    });
});

function passaProducteCarret(boton) {
    const producte = {
        id: boton.dataset.id,
        nom: boton.dataset.nom,
        preu: boton.dataset.preu
    };
    passaProductesLocal(producte);
}

function passaProductesLocal(element) {
    const carretActual = JSON.parse(localStorage.getItem("productes"))
    let productes = carretActual["productes"]
    const producte =
        productes.push()
    localStorage.setItem("productes", JSON.stringify(productes))
}