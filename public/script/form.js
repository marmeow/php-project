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

    //creaProductesProva(); // TODO: Eliminar aquesta línia en producció
    mostraTiquet();
})

/**
 * Envia les dades del carret en format JSON al servidor
 * @param {*} productes L'array de productes a enviar en format JSON
 */

function enviaJSONAServer(tiquet) {
    const xhr = new XMLHttpRequest();

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

    xhr.open("POST", "/php-project/php/confirm.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tiquet));
}

function mostraTiquet() {
    let carretData = JSON.parse(localStorage.getItem("productes"));
    let tiquetDiv = document.body.querySelector(".tiquet-final");

    if (!carretData.productes || carretData.productes.length === 0) {
        tiquetDiv.innerHTML = "<p>El carret està buit.</p>";
        return;
    }


    let html = "<h2>Resum de la comanda</h2><ul>";
    carretData.productes.forEach(item => {
        html += `<li>${item.nom} - Quantitat: ${item.quantitat} - Preu unitari: ${item.preu.toFixed(2)}€ - Total: ${(item.preu * item.quantitat).toFixed(2)}€</li>`;
    });
    html += `</ul>`;

    tiquetDiv.innerHTML = html;
}

function creaProductesProva() { //TODO: Eliminar aquesta funció en producció
    let productesProva = {
        productes: [
            { nom: "Producte A", preu: 10, quantitat: 2 },
            { nom: "Producte B", preu: 15, quantitat: 1 },
            { nom: "Producte C", preu: 7.25, quantitat: 3 },
            { nom: "Producte D", preu: 5.5, quantitat: 0 },
        ],
    };
    localStorage.setItem("productes", JSON.stringify(productesProva));
}