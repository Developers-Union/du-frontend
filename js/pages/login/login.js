function submit() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const LoginServerURL = "http://127.0.0.1:3000/login";
    fetch(LoginServerURL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username.value,
            "password": password.value
        })
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
        })
}
// var button = document.getElementById("login-button");
// button.onclick = submit;