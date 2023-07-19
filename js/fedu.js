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
                }else if(k == "method" && arguments[1]["method"].toUpperCase() == "POST"){
                    obj.method = "POST";
                    bodyr = 0;
                }else if(k == "body" && bodyr){
                    obj.body = JSON.stringify(arguments[1].body);
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
                return n();
            }
        }
        };
    }
    return throttle(fedu0);
})()