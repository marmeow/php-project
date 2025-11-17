function initTaskModal() {
    // TASK MODAL 
    const modal = document.querySelector(".myModal");
    const btn = document.querySelector(".closeTask");
    const deadlineCheck = document.getElementById("deadlineCheck");
    const deadlineInput = document.getElementById("deadline");
    const lbl = document.querySelector(".deadlinelbl");
    const time = document.getElementById("appointment");
    const reminder = document.getElementById("reminder");

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("user-icon") ||
            e.target.closest(".btnuser-icon")) {
            modal.style.display = "block";
            deadlineCheck.checked = true;
            deadlineInput.style.backgroundColor = "var(--color-bg-light)";
            time.style.backgroundColor = "var(--color-bg-light)";
            reminder.value = "hour";
            lbl.style.color = "var(--color-accent)";
        }
    });

    if (btn) {
        btn.onclick = function () {
            modal.style.display = "none";
        };
    }

    deadlineCheck.addEventListener("change", function () {
        if (deadlineCheck.checked) {
            lbl.style.color = "var(--color-accent)";
            deadlineInput.style.backgroundColor = "var(--color-bg-light)";
            time.style.backgroundColor = "var(--color-bg-light)";
            reminder.value = "hour";

        } else {
            lbl.style.color = "#909191";
            deadlineInput.style.backgroundColor = "#90919132";
            time.style.backgroundColor = "#90919132";
            reminder.value = "none";
        }
    });


    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function initAddTaskButton() {
    const addTaskBtn = document.getElementById("user-icon");
    const form = document.getElementById("taskForm");

    if (addTaskBtn) {
        // Elimina listeners previos
        const newBtn = addTaskBtn.cloneNode(true);
        addTaskBtn.parentNode.replaceChild(newBtn, addTaskBtn);

        // Listener único
        newBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Resetear formulario
            document.getElementById("task").value = "";
            document.getElementById("tag").value = "personal";
            document.getElementById("appointment").value = "";
            document.getElementById("deadline").value = "";
            document.getElementById("deadlineCheck").checked = false;

            // Mostrar modal
            document.querySelector(".myModal").style.display = "block";
        });
    }
}

initTaskModal();
initAddTaskButton();
