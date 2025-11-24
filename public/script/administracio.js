window.onload = function () {
    const main = document.body.querySelector("main");
    main.style.display = "none";

    comprovaAdmin();
    mostraTiquets();
}


function comprovaAdmin() {
    const xhr = new XMLHttpRequest();

    //Definim que vull que faci la constant xhr quan enviï les dades en el send()
    xhr.onload = function () {
        console.log("Respuesta del servidor:", xhr.status, xhr.responseText);
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);

            if (response.correcte) {
                document.body.querySelector("main").style.display = "block";
                alert("Ets admin");
            } else {
                alert("No ets administrador");
                window.location.replace("../index.html");
            }
        } else {
            alert("Error: " + xhr.status);
        }
    };

    xhr.open("POST", "../../php/adminLogin.php", true);
    xhr.send();
}

function mostraTiquets() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        console.log("Respuesta del servidor:", xhr.status, xhr.responseText);
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);

            if (response.success) {
                let tiquets = response["tickets"];
                // TODO: mostra tots els tiquets
                let titol = document.createElement('h2');
                titol.textContent = "Tiquets dels usuaris";
                titol.classList.add("admin-titol");
                let contenidor = document.createElement('div');
                contenidor.id = "tiquet-div";
                tiquets.forEach(element => {
                    let tiquet = document.createElement('card');
                    tiquet.classList.add("tiquet-card");
                    let product = '';
                    product += `<h3>Tiquet ID: ${element.id}</h3>`;
                    product += `<p>Nom: ${element.data.username}</p>`;
                    product += `<p>Adreça: ${element.data.usermail}</p>`;
                    product += `<p>Telèfon: ${element.data.usertel}</p>`;
                    element.data.productes.forEach(item => {
                        product += `<p>${item.nom} - Quantitat: ${item.quantitat} - Preu unitari: ${item.preu.toFixed(2)}€ - Total: ${(item.preu * item.quantitat).toFixed(2)}€</p>`;
                    })
                    tiquet.innerHTML = product;
                    contenidor.appendChild(tiquet);
                });
                contenidor.classList.add("tiquet-container");
                document.body.querySelector("main").innerHTML = '';
                document.body.querySelector("main").appendChild(titol);
                document.body.querySelector("main").appendChild(contenidor);
            } else {
                alert("No ha funcionat.")
            }
        } else {
            alert("Error: " + xhr.status);
        }
    };

    xhr.open("POST", "../../php/enviaTiquets.php", true);
    xhr.send();
}