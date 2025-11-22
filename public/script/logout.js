window.addEventListener("DOMContentLoaded", function () {
    // Call the updateUI function when the page loads
    updateUI();

})

// Funció que comprova si l'usuari esta logejat
async function isLoggedIn() {
    try {
        const response = await fetch("/php/isLoggedIn.php", { method: "POST" });
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        return data.correcte; // true o false
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

// Funció que actualitza la UI basat en l'estat del login
async function updateUI() {
    const loggedIn = await isLoggedIn();

    if (loggedIn) {
        console.log("dins del loggedIn");
        const loginForm = document.querySelector("#loginForm");

        document.querySelector(".envia").style.display = "none";

        const logoutBoto = document.createElement('button');
        logoutBoto.type = 'submit';
        logoutBoto.className = 'logout envia';
        logoutBoto.id = 'logout';
        logoutBoto.innerHTML = 'Tancar sessió';

        logoutBoto.onclick = logout;

        loginForm.insertAdjacentElement("beforeend", logoutBoto);
        // User is logged in, so show the logout button container
        /* botoLogin.textContent = "Tanca la sessió"*/

    } else {
        console.log("No es logged in");
    }
}

// Rest of your code, including the logout function
async function logout() {
    try {
        const response = await fetch("/php/logout.php", { method: "POST" });
        //const data = await response.json(); // aquí esperas la respuesta en JSON
        window.location.reload();
    } catch (error) {
        console.error("Error:", error);
        return false;
    }


}
