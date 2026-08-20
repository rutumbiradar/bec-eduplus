function login() {

    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (role === "" || username === "" || password === "") {
        alert("Please enter all login details.");
        return;
    }

    alert(
        "Welcome to BEC EduPlus!\n\n" +
        "Selected Role: " + role +
        "\n\nThe real authentication system will be connected later."
    );
}
