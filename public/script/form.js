//Aquesta funció maneja el formulari del carreto de confirm.html
window.addEventListener("DOMContentLoaded", function () {
    if (document.body.querySelector("#entra-carret")) {
        const carret = document.body.querySelector("#entra-carret");
        carret.addEventListener("submit", function (e) {
            e.preventDefault;
            const productes = JSON.parse(localStorage.getItem("productes"))

        })
    }
})