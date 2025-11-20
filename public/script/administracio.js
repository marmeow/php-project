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
                main.style.display = "block";
                alert("Ets admin");
            } else {
                alert("No ets administrador");
                window.location.replace("../index.html");
            }
        } else {
            alert("Error: " + xhr.status);
        }
    };

    xhr.open("POST", "/php/adminLogin.php", true);
    xhr.send();
}

function mostraTiquets() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        console.log("Respuesta del servidor:", xhr.status, xhr.responseText);
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);

            if (response.succes) {
                let tiquets = response["tiquets"];
                // TODO: mostra tots els tiquets
                let titol = "<h2>Tiquets dels usuaris</h2>";
                let contenidor = document.createElement('div');
                contenidor.id = "tiquet-div";
                tiquets.forEach(element => {
                    let tiquet = document.createElement('card');
                    let product;
                    tiquet.productes.forEach(producte => {
                        product += `<p>${item.nom} - Quantitat: ${item.quantitat} - Preu unitari: ${item.preu.toFixed(2)}€ - Total: ${(item.preu * item.quantitat).toFixed(2)}€</p>`;
                    })
                    tiquet.innerHTML = product;
                    contenidor.appendChild(tiquet);
                });
                
            } else {
                alert("No ha funcionat.")
            }
        } else {
            alert("Error: " + xhr.status);
        }
    };

    xhr.open("POST", "/php/enviaTiquets.php", true);
    xhr.send();
}