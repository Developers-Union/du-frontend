//import {md5_$} from "./md5";
const fedu = (function () {
    function fedu0() {
        if (!arguments[0]) {
            throw "None Args!";
        }
        var arr = [arguments[0]];
        if (arguments[1]) {
            var obj = {};
            var bodyr = 1;
            for (var k in arguments[1]) {
                if (k === "h") {
                    obj.headers = arguments[1].h;
                } else if (k === "m" || k === "method") {
                    if (arguments[1][k].toUpperCase() === "POST") {
                        obj.method = "POST";
                        bodyr = 0;
                    }
                } else if (k === "body" || k === "b" && bodyr) {
                    obj.body = JSON.stringify(arguments[1][k]);
                    obj.method = "POST";
                    bodyr = 0;
                } else if (k === "q" || k === "query") {
                    arr[0] += "?";
                    for (var t in arguments[1][k]) {
                        arr[0] += encodeURIComponent(t) + "=" + encodeURIComponent(arguments[1][k][t]) + "&";
                    }
                    arr[0] = arr[0].slice(0, -1)
                }
            }
            if (bodyr) {
                obj.method = "GET";
            }
            arr.push(obj);
        }
        return fetch.apply(null, arr);
    }

    function throttle(fn, delay = 1000) {//节流函数
        let last = 0;
        return function (...args) {
            let now = new Date().getTime();
            if (now - last > delay) {
                last = now;
                return fn.apply(this, args);
            } else {
                var n = args.slice(-1)[0];
                if (Object.prototype.toString.call(n).slice(8, -1) === "Function") {
                    n();
                    return new Promise(() => "Error");
                }
            }
        };
    }

    return throttle(fedu0);
})();
const $ = x => document.querySelector(x);
const $$ = x => Array.from(document.querySelectorAll(x));
const Cookie = {};
Cookie.set = function setCookie(c_name, value, expire_days) {
    let exDate = new Date();
    exDate.setDate(exDate.getDate() + expire_days);
    document.cookie =
        c_name +
        '=' +
        encodeURIComponent(value) +
        ';expires=' +
        exDate.toUTCString() +
        ';path=/';
}
Cookie.get = function getCookie(c_name) {
    let c_start = null;
    let c_end = null;
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + '=');
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(';', c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return decodeURIComponent(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}
Cookie.clear = function clearCookie(name) {
    setCookie(name, '', -1);
}
Cookie.check = function checkCookie(c_name) {
    let username = getCookie(c_name);
    return username !== null && username !== '';
}

const $h_obj = (x) => Object.prototype.toString.call(x).slice(8, 14) === "Object";

function $h() {
    let i;
    const main = document.createElement(arguments[0]);
    let child = [];
    if (arguments[1]) {
        if ($h_obj(arguments[1])) {
            for (i in arguments[1]) {
                if (i in HTMLElement.prototype) {
                    if ($h_obj(arguments[1][i])) {
                        for (var k in arguments[1][i]) {
                            main[i][k] = arguments[1][i][k]
                        }
                    } else {
                        main[i] = arguments[1][i]
                    }
                } else {
                    main.setAttribute(i, arguments[1][i])
                }
            }
        } else {
            child.push(arguments[1])
        }
        if (arguments[2]) {
            child.push(arguments[2])
        }
    }
    if (child.length) {
        child = $h_flat(child);
        for (i in child) {
            if (Object.prototype.toString.call(child[i].__proto__.__proto__.__proto__).slice(8, 15) === "Element") {
                main.append(child[i])
            } else {
                main.innerText = child[i]
            }
        }
    }
    return main;
}

function $h_flat(arr) {
    var t = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Array) {
            t = t.concat($h_flat(arr[i]))
        } else {
            t.push(arr[i])
        }
    }
    return t
}

/*
try{
    module.exports={fedu, $, $$, Cookie, $h, md5_$};
}catch(err){console.log("Environment:Not Nodejs")}
export default {fedu, $, $$, Cookie, $h, md5_$};*/