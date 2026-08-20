// ==========================================
// EDUPLUS - LOGIN SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.log("Login form not found.");
        return;
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        // Basic validation
        if (role === "") {
            alert("Please select your role.");
            return;
        }

        if (username === "") {
            alert("Please enter your username.");
            return;
        }

        if (password === "") {
            alert("Please enter your password.");
            return;
        }

        // ==========================================
        // DEMO LOGIN CREDENTIALS
        // ==========================================

        const users = {

            admin: {
                username: "admin",
                password: "admin123",
                page: "admin.html",
                name: "Administrator"
            },

            principal: {
                username: "principal",
                password: "principal123",
                page: "dashboard.html",
                name: "Principal"
            },

            hod: {
                username: "hod",
                password: "hod123",
                page: "dashboard.html",
                name: "HOD"
            },

            faculty: {
                username: "faculty",
                password: "faculty123",
                page: "dashboard.html",
                name: "Faculty"
            },

            student: {
                username: "student",
                password: "student123",
                page: "dashboard.html",
                name: "Student"
            }

        };

        // Check selected role
        const user = users[role];

        if (!user) {
            alert("Invalid role selected.");
            return;
        }

        // Check username and password
        if (
            username === user.username &&
            password === user.password
        ) {

            // Save login information
            localStorage.setItem("eduplusLoggedIn", "true");
            localStorage.setItem("eduplusUsername", username);
            localStorage.setItem("eduplusRole", role);
            localStorage.setItem("eduplusName", user.name);

            // Success message
            alert("Login successful. Welcome to EduPlus!");

            // Redirect
            window.location.href = user.page;

        } else {

            alert(
                "Invalid username or password.\n\n" +
                "Please check your login details and try again."
            );

        }

    });

});