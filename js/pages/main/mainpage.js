window.onload = function () {
    checkLogin()
}

window.onkeydown = function () {
    var oEvent = window.Event;
    if (123 === oEvent.keyCode) {
        alert("Don't F12!")
    } else if (oEvent.keyCode === 68 && oEvent.keyCode === 76) {
        window.location = "../../../pages/credit/credit.html";
    }
}

let alreadyLogin = true;

function checkLogin() {
    if (alreadyLogin) {
        $('#hider').classList.remove('main-right')
        $('#hider').classList.add('main-right-hidden')

        $('#main-right').classList.remove('main-right-hidden')
        $('#main-right').classList.add('main-right')

        $('#nav-right-logged-in').classList.remove('nav-right-hidden');
        $('#nav-right-logged-in').classList.add('nav-right');

        $('#nav-right-not-logged-in').classList.remove('nav-right');
        $('#nav-right-not-logged-in').classList.add('nav-right-hidden');
    } else {

        $('#hider').classList.remove('main-right-hidden')
        $('#hider').classList.add('main-right')

        $('#main-right').classList.remove('main-right')
        $('#main-right').classList.add('main-right-hidden')

        $('#nav-right-logged-in').classList.remove('nav-right');
        $('#nav-right-logged-in').classList.add('nav-right-hidden');

        $('#nav-right-not-logged-in').classList.remove('nav-right-hidden');
        $('#nav-right-not-logged-in').classList.add('nav-right');
    }
}

function changeStarStatus(e) {
    const e1 = e.getElementsByTagName('div')[0]
    const e2 = e.getElementsByTagName('div')[1]

    if (e1.classList.contains("star-display")) {
        e1.classList.remove('star-display')
        e1.classList.add('star-hidden')
        e2.classList.remove('star-hidden')
        e2.classList.add('star-display')
        e.parentNode.getElementsByTagName('p')[0].innerText = Number(e.parentNode.getElementsByTagName('p')[0].innerText) + 1
    } else {
        e2.classList.remove('star-display')
        e2.classList.add('star-hidden')
        e1.classList.remove('star-hidden')
        e1.classList.add('star-display')
        e.parentNode.getElementsByTagName('p')[0].innerText = Number(e.parentNode.getElementsByTagName('p')[0].innerText) - 1
    }

}