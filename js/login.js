var username = document.getElementById('username');
var password = document.getElementById('password');
var email = document.getElementById('email');
var loginUrl = "";

function checkUn(username) {
    if (username.value.length > 15 || username.value.length < 3) {
        return 0; // 过长或过短
    } else if (username.value.indexOf("@") == -1) {
        return 1; // 包含"@"
    }
}


var Cookie = {
    set: function (key, value, exdays) {
        let exdate = new Date()
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
        window.document.cookie = key + '=' + value + ';path=/;expires=' + exdate.toGMTString()
    },

    get: function (key) {
        if (document.cookie.length > 0) {
            var arr = document.cookie.split('; ')
            for (let i = 0; i < arr.length; i++) {
                let arr2 = arr[i].split('=')
                if (arr2[0] === key) {
                    return arr2[1]
                }
            }
        }
    },

    remove: function (key) {
        set(key, '', -1);
    }
};


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