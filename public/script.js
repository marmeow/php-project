document.addEventListener("DOMContentLoaded", function () {
    initSidebar();
});

function initSidebar() {

    //https://www.w3schools.com/howto/howto_js_off-canvas.asp
    const openBtn = document.querySelector(".burgerbtn");
    const closeBtn = document.querySelector(".closebtn");
    const sidebar = document.querySelector(".header-nav");
    const overlay = document.getElementById("overlay");


    openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.innerWidth < 768) {
            sidebar.style.width = "250px";
            overlay.style.display = "block"; // Show overlay
            closeBtn.style.display = "block"; // Show overlay
        }
    });

    closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.innerWidth <= 768) {
            sidebar.style.width = "0";
            overlay.style.display = "none";
            closeBtn.style.display = "none";
        }
    });

    overlay.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
            sidebar.style.width = "0";
            overlay.style.display = "none";
            closeBtn.style.display = "none";
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            sidebar.style.width = "";
            overlay.style.display = "none";
            closeBtn.style.display = "none";
        }
    });
}