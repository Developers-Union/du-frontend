var username = document.getElementById('username');
var password = document.getElementById('password');
var loginUrl = "127.0.0.1:3000/login";

function checkUn(username) {
    if (username.value.length > 15 || username.value.length < 3) {
        return 0; // 过长或过短
    } else if (username.value.indexOf("@") == -1) {
        return 1; // 包含"@"
    }
}




var xhr = new XMLHttpRequest()
var obj = {
    username: username,
    password: password
}
xhr.open('post', loginUrl, true);
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(JSON.stringify(obj))
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var res = JSON.parse(xhr.responseText)
        console.log(res);
        sessionStorage.setItem('token', res.data.token)
        Cookie.set("username.com", username, 100);
        Cookie.set("password.com", password, 100);
    }
}