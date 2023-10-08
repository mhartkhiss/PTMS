document.addEventListener("DOMContentLoaded", function () {
    const addTaskButton = document.getElementById("addTaskButton");
    const addTaskPopup = document.getElementById("addTaskPopup");
    const closePopup = document.getElementById("closePopup");

    addTaskButton.addEventListener("click", () => {
        addTaskPopup.style.display = "block";
    });

    closePopup.addEventListener("click", () => {
        addTaskPopup.style.display = "none";
    });

    const taskForm = document.getElementById("taskForm");

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(taskForm);

        fetch("/add_task/", {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
            },
        })
        .then((response) => {
            if (response.ok) {
                addTaskPopup.style.display = "none"; // Hide the pop-up after successfully adding a task
                location.reload(); // Reload the user profile page
            } else {
                throw new Error('Task not added');
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== "") {
                const cookies = document.cookie.split(";");
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.startsWith(name + "=")) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        

        
        function logout() {
            const confirmation = confirm("Are you sure you want to logout?");
            if (confirmation) {
                window.location.href = "login.html";
            }
        }

        const logoutButton = document.getElementById("logoutButton");
        if (logoutButton) {
            logoutButton.addEventListener("click", logout);
        }

        document.getElementById("addTaskModal").style.display = "none";
    });