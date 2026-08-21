// ==========================================
// BEC ERP LOGIN SYSTEM – Updated
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const loginButton = document.getElementById("loginButton");

    if (!loginButton) {
        console.log("BEC ERP: Login button not found.");
        return;
    }

    loginButton.addEventListener("click", function () {

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

        if (role === "") {
            alert("Please select your role.");
            return;
        }

        if (username === "" || password === "") {
            alert("Please enter your username and password.");
            return;
        }

        // ==========================================
        // BEC ERP DEMO USERS – Role‑Specific Pages
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
                page: "faculty_dashboard.html",  // ← Faculty goes to faculty dashboard
                name: "Faculty"
            },
            student: {
                username: "student",
                password: "student123",
                page: "student_dashboard.html",  // ← Student goes to student dashboard
                name: "Student"
            }
        };

        const user = users[role];

        if (!user) {
            alert("Invalid role selected.");
            return;
        }

        // ─── Check credentials ──────────────────────────────────
        if (username === user.username && password === user.password) {

            // Save login info
            localStorage.setItem("eduplusLoggedIn", "true");
            localStorage.setItem("eduplusUsername", username);
            localStorage.setItem("eduplusRole", role);
            localStorage.setItem("eduplusName", user.name);

            alert("Login successful! Welcome " + user.name + ".");

            // ─── Redirect to role‑specific page ────────────────
            window.location.href = user.page;

        } else {
            alert("Invalid username or password.");
        }

    });

});
