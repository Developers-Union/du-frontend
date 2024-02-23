
const server = "http://127.0.0.1:3000";
let verifyCode;
const wrong = $("#wrong");
let uuid = "";
let uuid_promise = [];



function onVerifyInput(num) {
    const d = $$('.verify-code-digit')[num];
    const digit = d.getElementsByTagName('p')[0];

    let next;
    if (num < 5) {
        next = $$('.verify-code-digit')[num + 1].getElementsByTagName("p")[0];
    }
    if (digit.innerText.length === 1) {
        if (num < 5) {
            next.focus()
        }
    } else {
        digit.innerText = digit.innerText.slice(0, 1)
    }
}


$$('.verify-code-digit').forEach(function (element, index, _) {
    element.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if (keyName === 'Backspace') {
            deleteDigit(index)
        }
    })
})

function deleteDigit(index) {
    let before;
    if (index > 0) {
        const digit = $$('.verify-code-digit')[index].getElementsByTagName("p")[0];
        if (digit.innerText.length === 1) {
            digit.innerText = '';
        } else {
            before = $$('.verify-code-digit')[index - 1].getElementsByTagName("p")[0];
            before.innerText = '';
            before.focus()
        }
    }
}

function getVerifyCode() {
    const digits = $$('.verify-code-digit');
    let str = "";
    for (let i = 0; i < 6; i++) {
        str += digits[i].getElementsByTagName("p")[0].innerText;
    }
    return str;
}

function illegalChar(c) {
    if (c > '0' && c < '9' || c > 'a' && c < 'z' || c > 'A' && c < 'Z' || c == '_')
        return false;
    return true;
}

function illegalPasswordChar(c) {
    if (c > '0' && c < '9' || c > 'a' && c < 'z' || c > 'A' && c < 'Z')
        return false;
    return true;
}
function usernameIllegal() {
    let username_element = $('#username');
    let error_content = $('#username-error');
    const username = $('#username').value;
    if (username.length < 6 || username.length > 15) {
        if (username.length < 6) error_content.innerText = "username too short";
        else error_content.innerText = "username too long";
        error_content.classList.add('content-error');
        username_element.classList.add('content-error-length');
        username_element.classList.remove('content-error-char');
        error_content.classList.add('content-error-length');
        error_content.classList.remove('content-error-char');
        error_content.classList.add('content-error');
        error_content.classList.remove('content-error-hidden');
        return true;
    }
    username_element.classList.remove('content-error-length');
    error_content.classList.add('content-error-length');
    for (let i = 0; i < username.length; i++) {
        if (illegalChar(username[i])) {
            error_content.innerText = "illegal character"
            error_content.classList.add('content-error');
            username_element.classList.add('content-error-char');
            error_content.classList.add('content-error-char');
            error_content.classList.add('content-error');
            error_content.classList.remove('content-error-hidden');
            return true;
        }
    }
    username_element.classList.remove('content-error-char');
    error_content.classList.add('content-error-char');

    error_content.classList.remove('content-error');
    error_content.classList.add('content-error-hidden');
    return false;
}

function passwordIllegal() {
    let password_element = $('#password');
    let error_content = $('#password-error');
    const password = $('#password').value;
    if (password.length < 8 || password.length > 15) {
        if (password.length < 8) error_content.innerText = "password too short";
        else error_content.innerText = "password too long";
        error_content.classList.add('content-error');
        password_element.classList.add('content-error-length');
        password_element.classList.remove('content-error-char');
        error_content.classList.add('content-error-length');
        error_content.classList.remove('content-error-char');
        error_content.classList.add('content-error');
        error_content.classList.remove('content-error-hidden');
        return true;
    }
    password_element.classList.remove('content-error-length');
    error_content.classList.add('content-error-length');
    for (let i = 0; i < password.length; i++) {
        if (illegalPasswordChar(password[i])) {
            error_content.innerText = "illegal character"
            error_content.classList.add('content-error');
            password_element.classList.add('content-error-char');
            error_content.classList.add('content-error-char');
            error_content.classList.add('content-error');
            error_content.classList.remove('content-error-hidden');
            return true;
        }
    }
    password_element.classList.remove('content-error-char');
    error_content.classList.add('content-error-char');

    error_content.classList.remove('content-error');
    error_content.classList.add('content-error-hidden');
    return false;
}
function emailIllegal() {
    let email_element = $('#email');
    const email = $('#email').value;
    let error_content = $('#email-error');
    let regex = /^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/
    if (!regex.test(email)) {
        email_element.classList.add('content-error-format');
        error_content.classList.add('content-error');
        error_content.classList.add('content-error-format');
        error_content.classList.remove('content-error-hidden');
        return true;
    }
    email_element.classList.remove('content-error-format');
    error_content.classList.remove('content-error');
    error_content.classList.remove('content-error-format');
    error_content.classList.add('content-error-hidden');
    return false;
}

function passwordNotSame() {
    let error_content = $('#password2-error');
    if ($('#password').value !== $('#password2').value) {
        $('#password2').classList.add('content-error-repeat');
        error_content.classList.add('content-error');
        error_content.classList.add('content-error-repeat');
        error_content.classList.remove('content-error-hidden');
        return true;
    }
    $('#password2').classList.remove('content-error-repeat');
    error_content.classList.remove('content-error');
    error_content.classList.remove('content-error-repeat');
    error_content.classList.add('content-error-hidden');
    return false;
}

function contentIllegal() {
    let illegal = false;
    illegal |= usernameIllegal();
    illegal |= passwordIllegal();
    illegal |= emailIllegal();
    illegal |= passwordNotSame();

    return illegal;
}

function submit() {
    if (contentIllegal()) { return; }
    if (uuid.length) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        verifyCode = getVerifyCode();
        alert(verifyCode)
        let username = $("#username").value;
        let password = $("#password").value;
        let email = $('#email').value;
        const requestOptions = {
            h: myHeaders,
            b: {
                "username": username,
                "password": password,
                "email": email,
                "avatar": "xxx",
                "sex": 3,
                "verifyCode": verifyCode,
                "uuid": uuid.slice(1, -1)
            },
            redirect: 'follow'
        };

        fedu("http://127.0.0.1:3000/register/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    } else {
        // alert("验证码未验证，请稍后重试")
    }
}

document.getElementById("login-button").onclick = submit;

let second = 0;

function sendVerifyCode() { //把这个返回值传入uuid 一会我去测逝一下
    const EmailServerURL = server + "/email";
    const email = document.getElementById("email").value;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        h: myHeaders,
        b: {
            "email": email
        },
        redirect: 'follow'
    };
    fedu(EmailServerURL, requestOptions)
        .then(response => response.text())
        .then(t => {
            uuid = t;
            console.log(t)
        })
        .catch(error => console.log('error', error))
    second = 60;
}

function minusTime() {
    if (second > 0) {
        second--;
        $('#verify').innerText = second.toString() + "s"
    }
    if (second === 0) {
        $('#verify').innerText = "Send Code";
    }
}

setInterval(minusTime, 1000)

function sendVCWrapper() {
    if (second === 0) {
        sendVerifyCode()
    }
}

document.getElementById("verify").onclick = sendVCWrapper;