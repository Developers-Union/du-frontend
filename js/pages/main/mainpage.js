window.onload = function () {
    checkLogin()
}

window.onkeydown = function () {
    const oEvent = window.Event;
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

        $('#button-login').classList.remove('original-button')
        $('#button-login').classList.add('original-button-already-login')

        $('#button-signup').classList.remove('original-button')
        $('#button-signup').classList.add('original-button-already-login')

        $('#username').classList.remove('nav-name-not-login')
        $('#username').classList.add('nav-name')
    } else {

        $('#hider').classList.remove('main-right-hidden')
        $('#hider').classList.add('main-right')

        $('#main-right').classList.remove('main-right')
        $('#main-right').classList.add('main-right-hidden')

        $('#button-login').classList.remove('original-button-already-login')
        $('#button-login').classList.add('original-button')

        $('#button-signup').classList.remove('original-button-already-login')
        $('#button-signup').classList.add('original-button')

        $('#username').classList.remove('nav-name')
        $('#username').classList.add('nav-name-not-login')
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

const $$$ = x => document.createElement(x)
const blogs_root = $('#blogs-root')

function addBlog(author, title, description) {
    let ele = $$$("li");
    ele.classList.add("blog");

    let eba = $$$('div');
    eba.classList.add('blog-author');
    let ebta = $$$('div');
    ebta.classList.add('blog-title-avatar');
    eba.appendChild(ebta);
    let eban = $$$('a');
    eban.classList.add('blog-author-name');
    eban.innerText = author;
    eba.appendChild(eban);
    ele.appendChild(eba);

    let ebt = $$$("a");
    ebt.classList.add('blog-title');
    ebt.innerText = title;

    let ebd = $$$("p");
    ebd.classList.add('blog-description');
    ebd.innerText = description;

    ele.appendChild(ebt);
    ele.appendChild(ebd);

    blogs_root.appendChild(ele);
}