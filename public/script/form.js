//Aquesta funció maneja el formulari del carreto de confirm.html
window.addEventListener("DOMContentLoaded", function () {
    const carret = document.body.querySelector("#envia-form");
    carret.addEventListener("submit", function (e) {
        e.preventDefault;
        const productes = JSON.parse(localStorage.getItem("productes"))
        productes.push({
            nom: document.body.querySelector("#username").value,
            email: document.body.querySelector("#usermail").value,
            telefon: document.body.querySelector("#usertel").value
        });
        enviaJSONAServer();
    });
})

function enviaJSONAServer(productes) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5500/php/confirm.php", true);
    xhr.send(JSON.stringify(productes));
}