window.addEventListener("DOMContentLoaded", function () {
    // fer aixo amb el submit del formulari login 
    const enviarLogin = document.body.querySelector("#loginForm");
    let dadesLogin = {};

    enviarLogin.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Enviant dades al servidor...");

        dadesLogin.userName = document.getElementById("userName").value;
        dadesLogin.password = document.getElementById("password").value;

        enviaJSONAServer(dadesLogin);
    });

})

function enviaJSONAServer(dadesLogin) {
    console.log(dadesLogin);

    const xhr = new XMLHttpRequest();

    //Definim que vull que faci la constant xhr quan enviï les dades en el send()
    xhr.onload = function () {
        console.log("Respuesta del servidor:", xhr.status, xhr.responseText);
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);

            if (response.correcte == true) {
                window.location.replace("../index.html");
            } else {
                alert("incorrecte");
            }
        } else {
            alert("Error: " + xhr.status);
        }
    };

    xhr.open("POST", "../../php/login.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(dadesLogin));
}