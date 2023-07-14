var hotBlogsURL = "";
var xhr = new XMLHttpRequest();
var res;
xhr.open('post', '/hotBlogs', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        res = xhr.responseText;
    }
}
xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
xhr.send(body);										
