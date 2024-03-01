var messages = $('#messages');
var form = $('#form');
var input = $('#input');
var usr = Cookie.get("name");
var msgtt = 0;
var netfn = [];
var lock = 1;
var sumsg;
var lastws;
if (usr.length == 0) {
    usr = [1, 1, 1, 1, 1, 1].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)));
    usr[0] = usr[0].toLocaleUpperCase();
    usr = usr.join("");
    Cookie.set("name", usr, 10);
}
sumsg = function (e) {
    e.preventDefault();
    if (input.value.trim()) {
        net.send(JSON.stringify({ msg: btoa(encodeURIComponent(input.value)), t: Date.now() }))
        input.value = '';
        $("#form>button").style.background = "rgb(51, 54, 57)";
        //back();
        input.focus()
    }
};
form.addEventListener('submit', sumsg);
netfn.push(function (event) {
    if (event.data == "S") {
        document.write("Wrong Talkid!")
    }
    else if (event.data != "t0") {
        var k = JSON.parse(event.data);
        if (k.length) {
            for (var i = 0; i < k.length; i++) {
                if (k[i][2] - msgtt >= 600000 || msgtt == 0) {
                    messages.appendChild($h("p", new Date(Number(k[i][2])).format()))
                    msgtt = k[i][2];
                }
                var gf = $h('div', {
                    class: k[i][1] == usr ? "mess" : "messleft"
                }, [
                    $h("div", { class: "avatar" }, [
                        $h("img", { src: "./avatar.png" })
                    ]),
                    $h("div", { class: "main" }, [
                        $h("p",/*new Date(Number(k[i][2])).format()*/k[i][1]),
                        $h("div", [$h("div", decodeURIComponent(atob(k[i][0]))/*.replaceAll(" ","&nbsp;").replaceAll("<","&lt;").replaceAll(">"," 	&gt;")*/)])
                    ])
                ]
                );
                messages.appendChild(gf);
                messages.scrollTo(0, gf.offsetTop);
            }
        }
    }
});
netfn.push(function () {
    var renet = setInterval(function () {
        console.log("Try", { lock })
        if (!lock) {
            if (lastws && lastws.readyState == 1) {
                lock = 1;
                input.value = "";
                input.onfocus = function () {
                    return true
                }
                clearInterval(renet);
                net = lastws;
                net.onmessage = netfn[0];
                net.onclose = net.onerror = () => {
                    lock = 0;
                    input.onfocus = function () {
                        this.blur();
                    }
                    input.value = "已与服务器断开连接，正在重连......";
                    netfn[1]();
                };
                net.send(JSON.stringify({ renet: true }))
            } else {
                if (lastws) { lastws.close() }
                lastws = new WebSocket(`${address}/?name=${usr}&talkid=${talkid}`);
                console.log(lastws)
            }
        }
    }, 10000);
    console.log("WebSocket is closed now.Begin to reconnect.");
});
const address = "wss://kl5zjv-3000.csb.app";
var talkid_arr = location.search.slice(1).split("=");
var talkid;
if (talkid_arr[0] == "talkid") {
    talkid = talkid_arr[1]
} else {
    talkid = "0";
};
try {
    var net = new WebSocket(`${address}/?name=${usr}&talkid=${talkid}`);
    net.onmessage = netfn[0];
    net.onclose = net.onerror = () => {
        lock = 0;
        input.onfocus = function () {
            this.blur();
        }
        input.value = "已与服务器断开连接，正在重连......";
        netfn[1]();
    };
} catch (err) {
    lock = 0;
    netfn[1]();
}
function animate(el, params, speed) {//speed是以秒为单位的数字
    el.style.transition = 'all ' + speed + 's';
    Object.keys(params).forEach((key) => {
        el.style[key] = params[key];
    });
};
input.oninput = () => {
    if ($("#input").value.trim().length) {
        $("#form>button").style.background = "#ac0dac";
    } else {
        $("#form>button").style.background = "rgb(51, 54, 57)";
    }
}
input.onkeydown = function (event) {
    if (event.keyCode === 13) {
        if (event.ctrlKey) {
            event.preventDefault();
            var text = input.value;
            var cursorPosition = this.selectionStart;
            var newText = text.slice(0, cursorPosition) + "\n" + text.slice(cursorPosition);
            input.value = newText;
            this.selectionStart = cursorPosition + 1;
            this.selectionEnd = cursorPosition + 1;
        } else {
            sumsg(event)
        }
    }
}
setInterval(() => { net.send("timer") }, 40 * 1000)