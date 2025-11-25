/**
 * Aquesta funció serveix per interceptar el form submit i en comptes de fer un submit normal, poder gestionar-lo i enviar dades alterades
*/
window.addEventListener("DOMContentLoaded", function () {
    const carret = document.body.querySelector("#entra-carret");
    let carretData = JSON.parse(this.localStorage.getItem("productes"));
    afegirTotalAJSON(carretData);

    carret.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Enviant dades al servidor...");
        carretData.username = document.getElementById("username").value;
        carretData.usermail = document.getElementById("usermail").value;
        carretData.usertel = document.getElementById("usertel").value;
        enviaJSONAServer(carretData);
    });

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
            localStorage.removeItem("productes");
            window.location.replace("../index.html");
        } else {
            alert("Error: " + xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Error de xarxa");
        alert("Error de connexió amb el servidor");
    };

    xhr.open("POST", "/php/confirm.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tiquet));
}

function mostraTiquet() {
    let carretData = JSON.parse(localStorage.getItem("productes"));
    let tiquetDiv = document.body.querySelector(".tiquet-final");

    if (!carretData || !carretData.productes || carretData.productes.length === 0) {
        tiquetDiv.innerHTML = "<p>El carret està buit.</p>";
        return;
    }


    let html = "<h2>Resum de la comanda</h2><ul>";
    carretData.productes.forEach(item => {
        html += `<li>${item.nom} - Quantitat: ${item.quantitat} - Preu unitari: ${item.preu.toFixed(2)}€ - Total: ${(item.preu * item.quantitat).toFixed(2)}€</li>`;
    });
    html += `</ul>`;
    html += `<h3>Total a pagar: ${carretData.total.toFixed(2)}€</h3>`;

    tiquetDiv.innerHTML = html;
}

function afegirTotalAJSON(carretData) {
    if (!carretData || !carretData.productes || carretData.productes.length === 0) {
        return;
    }
    
    let total = 0;
    carretData.productes.forEach(item => {
        total += item.preu * item.quantitat;
    });
    carretData.total = total;
    localStorage.setItem("productes", JSON.stringify(carretData));
}