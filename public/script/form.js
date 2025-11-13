/**
 * Aquesta funció serveix per interceptar el form submit i en comptes de fer un submit normal, poder gestionar-lo i enviar dades alterades
*/
window.addEventListener("DOMContentLoaded", function () {
    const carret = document.body.querySelector("#entra-carret");
    let carretData = JSON.parse(this.localStorage.getItem("productes"));
    carret.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Enviant dades al servidor...");
        carretData.nom = document.getElementById("username").value;
        carretData.adreca = document.getElementById("usermail").value;
        carretData.telefon = document.getElementById("usertel").value;
        enviaJSONAServer(carretData);
    });
})

/**
 * Envia les dades del carret en format JSON al servidor
 * @param {*} productes L'array de productes a enviar en format JSON
 */

function enviaJSONAServer(tiquet) {
    const xhr = new XMLHttpRequest();

    // Handlers para ver qué pasa
    xhr.onload = function () {
        console.log("Respuesta del servidor:", xhr.status, xhr.responseText);
        if (xhr.status === 200) {
            alert("Dades enviades correctament!");
        } else {
            alert("Error: " + xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Error de xarxa");
        alert("Error de connexió amb el servidor");
    };

    // Usa la ruta desde la raíz del proyecto en htdocs
    xhr.open("POST", "/php-project/php/confirm.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tiquet));
}