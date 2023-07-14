var cookie = {};
cookie.set = function setCookie(c_name, value, expire_days) {
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
cookie.get = function getCookie(c_name) {
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
cookie.clear = function clearCookie(name) {
    setCookie(name, '', -1);
}
cookie.check = function checkCookie(c_name) {
    let username = getCookie(c_name);
    return username !== null && username !== '' ? true : false;
}//检查是否有指定名字的cookie且有值
export { cookie }