/**
 * Funció que, al carregar la pàgina, oculta el contingut principal i després crida a
 * una altra funció per comprovar si l'usuari té permisos d'administrador.
 */
window.onload = function () {
    const main = document.body.querySelector("main");

    main.style.display = "none";

    comprovaAdmin();
}

/**
 * Funció que envia una petició al servidor per comprovar si l'usuari és administrador i,
 * segons la resposta, mostra el contingut de la pàgina o redirigeix fora.
 */
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
                let missatge = response.isLoggedIn ? "No ets administrador" : "No tens iniciada la sessió";
                alert(missatge);
                window.location.replace("../index.html");
            }
        } else {
            alert("Error: " + xhr.status);
        }
    };

    xhr.open("POST", "/php/adminLogin.php", true);
    xhr.send();
}