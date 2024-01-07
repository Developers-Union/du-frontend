import "./lib";
var res=fedu("/hotBlogs",{m:"POST",h:{'content-Type': 'application/x-www-form-urlencoded'}},fail);

function fail(){
    console.log("操作过于频繁，请重试");
}