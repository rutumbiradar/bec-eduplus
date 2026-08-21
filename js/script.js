// ==========================================
// EDUPLUS LOGIN SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const loginButton = document.getElementById("loginButton");

    if (!loginButton) {
        console.log("EduPlus: Login button not found.");
        return;
    }

    loginButton.addEventListener("click", function () {

        // Get values from the login page
        const usernameElement = document.getElementById("username");
        const passwordElement = document.getElementById("password");
        const roleElement = document.getElementById("role");

        if (!usernameElement || !passwordElement || !roleElement) {
            alert("Login form fields could not be found.");
            return;
        }

        const username = usernameElement.value.trim();
        const password = passwordElement.value.trim();
        const role = roleElement.value;

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
        // EDUPLUS DEMO USERS
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

        // Find selected role
        const user = users[role];

        if (!user) {
            alert("Invalid role selected.");
            return;
        }

        // ==========================================
        // CHECK LOGIN
        // ==========================================

        if (
            username === user.username &&
            password === user.password
        ) {

            // Save login information
            localStorage.setItem("eduplusLoggedIn", "true");
            localStorage.setItem("eduplusUsername", username);
            localStorage.setItem("eduplusRole", role);
            localStorage.setItem("eduplusName", user.name);

            alert("Login successful! Welcome to EduPlus.");

            // Open correct page
            window.location.href = user.page;

        } else {

            alert("Invalid username or password.");

        }

    });

});