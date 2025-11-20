window.addEventListener("DOMContentLoaded", function () {
    // Call the updateUI function when the page loads
    updateUI();

})

// Function to retrieve the JWT token from localStorage
function getToken() {
    return localStorage.getItem("jwtToken");
}

// Funció que comprova si l'usuari esta logejat
function isLoggedIn() {
    const token = localStorage.getItem("jwtToken");
    return !!token; // Return true if a token exists, false otherwise
}

// Funció que actualitza la UI basat en l'estat del login
function updateUI(botoLogin) {
    const botoLogin = document.body.querySelector("#loginForm");

    if (botoLogin) {
        if (isLoggedIn()) {
            // User is logged in, so show the logout button container
            botoLogin.textContent = "Tanca la sessió"
            botoLogin.onclick = logout;
        } else {
            sessionButton.textContent = "Iniciar sessió";
            sessionButton.onclick = () => window.location.href = '../pages/login.html';
        }
    }

}


// Rest of your code, including the logout function
function logout() {
    // Remove the JWT token from local storage
    localStorage.removeItem("jwtToken");

    // Call the updateUI function when the page loads
    updateUI();

    // Redirect the user to the login page
    window.location.href = '/Frontend/login.html';
}
