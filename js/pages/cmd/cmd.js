oldhis = [];
a = 1;
textcolor = "white";
backcolor = "black";
function spi(str, needstr, num) {
    spistr = "";
    spiArry = [];
    var cou = -1;
    str.split(needstr).map((exp) => {
        cou += 1;
        if (cou - num > 0) {
            spistr += needstr + exp;
        }
        else if (cou - num == 0) {
            spistr += exp;
        }
        else {
            spiArry.push(exp);
        }
    });
    spiArry.push(spistr);
    return spiArry;
}
function shc() {
    if (event.ctrlKey && event.keyCode == 76) {//Ctrl+L 清屏
        document.getElementById("all").innerHTML = "<span>Developers Union Shell(version: 1.14)<br>Developers Union keeps all the rights.</span><br><span style=\"display:flex\" id=\"line1\"><span>cmd></span><input type=\"text\" id=\"inpot\" onkeydown=\"get()\"></span>";
        document.querySelectorAll('span')[0].style.color = textcolor;
        document.querySelectorAll('span')[0].style.backgroundColor = backcolor;
        document.querySelectorAll('span')[1].style.color = textcolor;
        document.querySelectorAll('span')[1].style.backgroundColor = backcolor;
        document.querySelectorAll('span')[2].style.color = textcolor;
        document.querySelectorAll('span')[2].style.backgroundColor = backcolor;
        document.getElementById("inpot").style.color = textcolor;
        document.getElementById("inpot").style.backgroundColor = backcolor;
        a = 1;
        oldhis = [];
        event.preventDefault();
        document.getElementById("inpot").focus();
        return false;
    } else if (event.ctrlKey && event.keyCode == 88) {//Ctrl+X 对焦
        event.preventDefault();
        document.getElementById("inpot").focus();
        return false;
    }
}
function get() {
    if (event.keyCode == 13) {
        Commad = document.getElementById('inpot').value;
        oldhis.push(Commad);
        document.getElementById('line' + String(a)).removeChild(document.getElementById("inpot"));
        //document.getElementById('line'+String(a)).innerHTML+='<span style="padding-left: 10px;">'+Commad+'</span>';
        var d = document.createElement("span"); d.style.color = textcolor; d.style.backgroundColor = backcolor;
        d.style.paddingLeft = "10px";
        d.innerText = Commad;
        document.getElementById('line' + String(a)).appendChild(d);
        if (Commad != '') {
            var f = document.createElement("span");
            f.innerHTML = amazing(Commad);
            f.color = textcolor;
            f.backgroundColor = backcolor;
            document.getElementById('all').appendChild(f);
        };
        a = a + 1;
        numspan = document.querySelectorAll('span').length;
        numinput = document.querySelectorAll('input').length;
        document.getElementById("all").innerHTML += '<span style="display:flex;" id=line' + String(a) + '><span>cmd></span><input type="text" id="inpot" onkeydown="get()"></span>';
        document.querySelectorAll('span')[numspan].style.color = textcolor;
        document.querySelectorAll('span')[numspan + 1].style.color = textcolor;
        document.querySelectorAll('span')[numspan].style.backgroundColor = backcolor;
        document.querySelectorAll('span')[numspan + 1].style.backgroundColor = backcolor;
        document.querySelectorAll('input')[numinput].style.color = textcolor;
        document.querySelectorAll('input')[numinput].style.backgroundColor = backcolor;
        document.getElementById("inpot").focus();
    };
};
/*
    Command{
 
        echo:{
            r:true/false//是否有返回值
            f:function(args)//输入参数，例如echo 1，会调用echo的f(1)//参数值不会被完全分开，只会剥离第一个空格
            env:{}//环境对象，不用每次运行函数时重新初始化
        }
    }
 
*/
function color2(a, b) {
    window.textcolor = a;
    window.backcolor = b;
    var c = document.querySelectorAll('span');
    var d = document.querySelectorAll('input');
    console.log(c);
    for (var i = 0; i < c.length; i++) {
        console.log(c[i])
        c[i].style.color = a;
        c[i].style.backgroundColor = b;
    };
    for (var i = 0; i < d.length; i++) {
        d[i].style.color = a;
        d[i].style.backgroundColor = b;
    };
    document.getElementById('all').style.backgroundColor = b;
}
function amazing(str) {
    var n = spi(str, " ", 1);
    let command = n[0].toLowerCase();
    if (command == "title") {
        document.title = n[1];
        return (1);
    } else if (command == "search" || command == 'sh') {
        var O = {
            baidu: "https://www.baidu.com/s?wd=",
            baidudev: "https://kaifa.baidu.com/searchPage?wd=",
            bilibili: "https://search.bilibili.com/all?keyword=",
            music: "https://music.163.com/#/search/m/?s=",
            bing: "https://global.bing.com/search?q=",
            zhihu: "https://www.zhihu.com/search?q=",
            github: "https://github.com/search?q=",
        };
        if (O[spi(n[1], " ", 1)[0]]) {
            window.open(O[spi(n[1], " ", 1)[0]] + spi(n[1], " ", 1)[1]);
        } else if (spi(n[1], " ", 1)[0].toLowerCase() == 'diy') {//自定义搜索  search DIY 数据源 搜索内容
            window.open(spi(n[1], " ", 2)[1] + spi(n[1], " ", 2)[2]);
        } else {
            return ("<span class=\"jing\" style='color:red;'>error: Insufficient parameters</span>");
        };
        return (1);
    } else if (command == 'color') {
        var colors = ['black', 'blue', 'lightgreen', 'aqua', 'red', 'purple', 'yellow', 'white', 'gray', 'lightblue'];
        if (n[1].length == 1) {
            if (Number(n[1]) > 0 && Number(n[1]) < 10) {
                alert("yes")
                var obs = colors[Number(n[1])]
                color2(obs, 'black')
            } else {
                return "<span class=\"jing\" style='color:red;'>error: Sub-parameters OutOfRange: 0-9 valid</span>";
            }
        } else if (n[1].length == 2 && n[1][0] != n[1][1]) {
            if (Number(n[1][0]) > 0 && Number(n[1][0]) < 10 && Number(n[1][1]) > 0 && Number(n[1][1]) < 10) {
                var obc = colors[Number(n[1][0])];
                var obs = colors[Number(n[1][1])];
                color2(obs, obc);
            } else {
                return "<span class=\"jing\" style='color:red;'>error: Sub-parameters OutOfRange: 0-9 valid</span>";
            }
        } else if ((!n[1]) || n[1].length == 0) {
            color2("white", "black");
        } else if (n[1].length == 2 && n[1][0] == n[1][1]) {
            return ("<span class=\"jing\" style='color:yellow !important;background-color:" + backcolor + ";'>error: Two Sub-parameters cannot be the same</span>");
        } else {
            return ("<span class=\"jing\" style='color:red;'>error: Insufficient parameters</span>");
        };
        return "";
    } else if (command == 'history') {
        var r = oldhis.filter(function (s) {
            return s && s.trim();
        });
        return (r.join("<br>"));
    } else if (command == 'date') {
        d = new Date();
        return (d.toUTCString());
    } else if (command == 'clear') {
        document.getElementById("all").innerHTML = "<span>Developers Union Shell(version: 1.14)<br>Developers Union keeps all the rights.</span><br>";
        document.querySelectorAll('span')[0].style.color = textcolor;
        document.querySelectorAll('span')[0].style.backgroundColor = backcolor;
        a = 1;
        oldhis = [];
        event.preventDefault();
        return "";
    } else if (n[0].toLowerCase() == 'open') {
        window.open(n[1]);
        return (n[1] + " was opened");
    } else if (command == 'unicode') {
        return escape(n[1]).replace(/%/g, "\\").toLowerCase();
    } else if (command == 'ununicode') {
        return unescape(n[1].replace(/\\/g, "%"));
    } else if (command == 'url') {
        return encodeURI(n[1]);
    } else if (command == 'unurl') {
        return decodeURI(n[1]);
    } else if (command == 'javascript' || command == 'js') {
        try { return eval(n[1]) } catch (err) { return '<span style="color:red;">' + err + "</span>" }
    } else if (command == 'quit' || command == 'home' || command == 'exit') {
        window.location.href = window.location.href + "/../../../index.html";
        return "";
    } else if (command == 'blog') {
        window.location.href = window.location.href + "/../../blog/showblog.html?id=" + n[1];
        return "";
    } else if (command == 'user') {
        window.location.href = window.location.href + "/../../person/person.html?id=" + n[1];
        return "";
    } else if (command == 'writeblog') {
        if (1)
            return ("<span class=\"jing\" style='color:red;'>error: You are not logged in</span>");
        window.location.href = window.location.href + "/../../blog/writeblog.html";
        return "";
    } else if (command == 'editpf') {
        if (1)
            return ("<span class=\"jing\" style='color:red;'>error: You are not logged in</span>");
        window.location.href = window.location.href + "/../../person/editprofile.html";
        return "";
    } else if (command == 'credit') {
        window.location.href = window.location.href + "/../../credit/credit.html";
        return "";
    } else if (command == 'help') {
        return ("<span>View the SOURCE to get the list of available commands.</span>")
    }
    else {
        return ("<span style=\"color:red;\">error: The instruction does not exist</span>");
    };
};