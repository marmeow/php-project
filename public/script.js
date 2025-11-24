document.addEventListener("DOMContentLoaded", () => {
    setupMenu();
});



function setupMenu() {
    const openBtn = document.querySelector(".burgerbtn");
    const closeBtn = document.querySelector(".closebtn");
    const sidebar = document.querySelector("#header-bottom nav");
    const overlay = document.getElementById("overlay");

    openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (window.innerWidth < 768) {
            sidebar.style.width = "250px";
            overlay.style.display = "block";
            closeBtn.style.display = "block";
        }
    });

    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (window.innerWidth <= 768) {
            sidebar.style.width = "0";
            overlay.style.display = "none";
            closeBtn.style.display = "none";
        }
    });

    overlay.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            sidebar.style.width = "0";
            overlay.style.display = "none";
            closeBtn.style.display = "none";
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            sidebar.style.width = "";
            overlay.style.display = "none";
            closeBtn.style.display = "none";
        }
    });
}



