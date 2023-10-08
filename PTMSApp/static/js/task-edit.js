document.addEventListener("DOMContentLoaded", function () {
    const taskTable = document.getElementById("taskTable");
    const editTaskPopup = document.getElementById("editTaskPopup");
    const closeEditPopup = document.getElementById("closeEditPopup");
    const editTaskForm = document.getElementById("editTaskForm");
    const deleteTaskButton = document.getElementById("deleteTaskButton");
    const statusDropdowns = document.querySelectorAll(".status-dropdown");

    // Use event delegation for the task rows
    taskTable.addEventListener('click', function (e) {
        if (e.target.closest('td:nth-child(3)')) {
            return; // Do nothing and exit the function
        }
        const target = e.target.closest('.task-row');
        if (target) {
            // Retrieve task details from data attributes of the clicked row
            console.log('Retrieved task details:', target.dataset);
            
            const taskId = target.getAttribute('data-task-id');
            const taskTitle = target.getAttribute('data-task-title');
            const taskDescription = target.getAttribute('data-task-description');
            const taskStatus = target.getAttribute('data-task-status');
            const taskPriority = target.getAttribute('data-task-priority');
            const taskDueDate = target.getAttribute('data-task-due-date');
            const taskCategory = target.getAttribute('data-task-category');
			const formattedDueDate = formatDate(taskDueDate);
            function formatDate(inputDate) {
                const date = new Date(inputDate);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }	
            
            

            // Set default values for the form fields in the editTaskPopup
            document.getElementById("taskId").value = taskId;
            document.getElementById("etaskTitle").value = taskTitle;
            document.getElementById("etaskDescription").value = taskDescription;
            document.getElementById("etaskStatus").value = taskStatus;
            document.getElementById("etaskPriority").value = taskPriority;
            document.getElementById("etaskCategory").value = taskCategory;
            document.getElementById("etaskDueDate").value = formattedDueDate;

            // Display the editTaskPopup
            editTaskPopup.style.display = "block";
        }
    });

    closeEditPopup.addEventListener("click", () => {
        editTaskPopup.style.display = "none";
    });
    
    
    
    deleteTaskButton.addEventListener("click", function() {
        const taskId = document.getElementById("taskId").value;
    
        // Send an AJAX request to delete the task
        fetch(`/delete_task/${taskId}/`, {
            method: "DELETE", // Use DELETE HTTP method
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
            },
        })
        .then((response) => {
            if (response.ok) {
                // Task deleted successfully, you can handle this as needed
                console.log("Task deleted successfully");
                editTaskPopup.style.display = "none";
                location.reload();
            } else {
                throw new Error('Task not deleted');
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });
    

    statusDropdowns.forEach((dropdown) => {
        dropdown.addEventListener("change", function () {
            const taskId = this.getAttribute("data-task-id");
            const newStatus = this.value;
            console.log(newStatus);
            // Send an AJAX request to update the status
            
            fetch(`/update_task_status/${taskId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: JSON.stringify({ newStatus }),
            })
            .then((response) => {
                if (response.ok) {
                    // Status updated successfully, you can handle this as needed
                    console.log("Status updated successfully");
                } else {
                    throw new Error('Status not updated');
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        });
    });
    // Handle form submission here
    editTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        // Collect the updated task data from the form fields
        const updatedTask = {
            id: document.getElementById('taskId').value,
            title: document.getElementById("etaskTitle").value,
            description: document.getElementById("etaskDescription").value,
            status: document.getElementById("etaskStatus").value,
            priority: document.getElementById("etaskPriority").value,
            due_date: document.getElementById("etaskDueDate").value,
            category: document.getElementById("etaskCategory").value,
        };
        
    
        // Make an AJAX request to update the task in the database
        fetch(`/update_task/${updatedTask.id}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", // Adjust as needed
                "X-CSRFToken": getCookie("csrftoken"), // Add your CSRF token logic
            },
            body: new URLSearchParams(updatedTask).toString(),
        })
        .then((response) => {
            if (response.ok) {
                // Task updated successfully, you can handle this as needed
                console.log("Task updated successfully");
                // Close the editTaskPopup or perform any other actions
                editTaskPopup.style.display = "none";
                location.reload(); // Reload the user profile page
            } else {
                throw new Error('Task not updated');
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
