// function submit() {
//     const username = document.getElementById("username");
//     const password = document.getElementById("password");
//     const LoginServerURL = "http://127.0.0.1:3000/login";
//     fetch(LoginServerURL, {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//             'mode':'no-cors'
//         },
//         body: JSON.stringify({
//             "username": username.value,
//             "password": password.value
//         })
//     })
//         .then((response) => response.json())
//         .then((response) => {
//             console.log(response)
//         })
// }
// var button = document.getElementById("login-button");
// button.onclick = submit;

if (!Cookie) {
    var Cookie = {};
}

function submit() {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": username.value,
        "password": password.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:3000/login?username=&password=", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result));
            if (JSON.parse(result).code == 0) {
                //存cookie() //testing
                Cookie.set("username", username.value, 30);
                console.log(Cookie.get("username")); //{loc: Array(1), msg: 'value is not a valid dict', type: 'type_error.dict'}？？？？这里不可能有这个报错
                console.log("success")

            }
        })
        .catch(error => console.log('error', error));
}
