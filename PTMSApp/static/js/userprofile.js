document.addEventListener("DOMContentLoaded", function () {
    const addTaskButton = document.getElementById("addTaskButton");
    const addTaskPopup = document.getElementById("addTaskPopup");
    const closePopup = document.getElementById("closePopup");
    
    const userProfilePopup = document.getElementById("userProfilePopup");
    const headerLink = document.querySelector(".header-link");

    addTaskButton.addEventListener("click", () => {
        addTaskPopup.style.display = "block";
    });

    closePopup.addEventListener("click", () => {
        addTaskPopup.style.display = "none";
    });

    headerLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior

        // Get the position of the "header" element
        const headerPosition = headerLink.getBoundingClientRect();

        // Position the popup below the "header" element
        if (userProfilePopup.style.display === "block") {
            userProfilePopup.style.display = "none"; // Close the user profile popup
        } else {
            userProfilePopup.style.display = "block"; // Open the user profile popup
        }
        userProfilePopup.style.top = headerPosition.bottom + window.scrollY + "px"; // Position below
        userProfilePopup.style.left = headerPosition.left + window.scrollX + "px"; // Align with left edge
    });

    // Close the popup when clicking outside of it
    window.addEventListener("click", function (event) {
        if (event.target === userProfilePopup) {
            userProfilePopup.style.display = "none"; // Hide the user profile popup
        }
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
        
        
    });

