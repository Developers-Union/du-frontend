var _obj = (x) => Object.prototype.toString.call(x).slice(8, 14) == "Object";
function h() {
    var main = document.createElement(arguments[0]);
    child = [];
    if (arguments[1]) {
        if (_obj(arguments[1])) {
            for (var i in arguments[1]) {
                if (Object.hasOwn(HTMLElement.prototype, i)) {
                    if (_obj(arguments[1][i])) {
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
        child = child.flat();
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
export { h as $h };