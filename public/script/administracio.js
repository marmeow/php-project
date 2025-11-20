window.onload = function () {
    const main = document.body.querySelector("main");

    main.style.display = "none";

    comprovaAdmin();
}

function comprovaAdmin(){
    const xhr = new XMLHttpRequest();

    //Definim que vull que faci la constant xhr quan enviï les dades en el send()
    xhr.onload = function () {
        console.log("Respuesta del servidor:", xhr.status, xhr.responseText);
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);

            if (response.correcte == false) {
                alert("No ets administrador");
                window.location.replace("../index.html");
            } else {
                main.style.display = "block";
                alert("Ets admin");
            }
        } else {
            alert("Error: " + xhr.status);
        }
    };

    xhr.open("POST", "/php/adminLogin.php", true);
    xhr.send();
}