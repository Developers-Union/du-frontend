import "./lib";
var username = $('#username').value;
var password = $('#password').value;
var loginUrl = "/login";

function checkUn(username) {
    if (username.value.length > 15 || username.value.length < 3) {
        return 0; // 过长或过短
    } else if (username.value.indexOf("@") == -1) {
        return 1; // 包含"@"
    }
}

fedu(loginUrl, {b:{username, password}, h:{'Content-Type':'application/json'}},fail).then(r=>r.json()).then(y=>{
    console.log(y);
    Cookie.set("token", y.data.token, 100);
});
function fail(){
    console.log("操作过于频繁，请重试");
}