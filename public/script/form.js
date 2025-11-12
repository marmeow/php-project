/**
 * Aquesta funció serveix per interceptar el form submit i en comptes de fer un submit normal, poder gestionar-lo i enviar dades alterades
*/
window.addEventListener("DOMContentLoaded", function () {
    const carret = document.body.querySelector("#envia-form");
    carret.addEventListener("submit", function (e) {
        e.preventDefault();
        const productes = JSON.parse(localStorage.getItem("productes"))
        productes.push({
            nom: document.body.querySelector("#username").value,
            email: document.body.querySelector("#usermail").value,
            telefon: document.body.querySelector("#usertel").value
        });
        enviaJSONAServer(productes);
    });
})

/**
 * Envia les dades del carret en format JSON al servidor
 * @param {*} productes L'array de productes a enviar en format JSON
 */

function enviaJSONAServer(productes) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/php/confirm.php", true);
    xhr.send(JSON.stringify(productes));
}