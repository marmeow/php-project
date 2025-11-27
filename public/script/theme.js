// Light/Dark Change
const themeSwitch = document.getElementById('darkLight')

themeSwitch.addEventListener("click", () => {
    document.querySelector("html").classList.toggle("darkmode");
})