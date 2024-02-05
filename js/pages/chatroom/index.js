const WebSocket = require("ws");
const dutalk = require("./data");
var clients = {}; // 与客户端建立的连接池

const wss = new WebSocket.Server({ port: 3000 }); // 创建一个websocket服务
wss.on("connection", function connection(ws, request, client) {
  var options = request.url.slice(request.url.indexOf("?") + 1).split("&");
  var name = options[0].split("=")[1];
  var talkid = options[1].split("=")[1];
  if (!dutalk.has(talkid)) {
    ws.send("S");
    ws.close();
    console.log(`${name} connect error!`);
  } else {
    console.log(request.url, name, talkid);
    if (name.length) {
      if (clients[talkid]) {
        clients[talkid].push({ name, ws: ws });
      } else {
        clients[talkid] = [{ name, ws: ws }];
      }
    }
    console.log(`${name} connect ${talkid} successful!`);
    ws.send(JSON.stringify(dutalk.read(talkid)));
    ws.on("message", function message(data, isBinary) {
      if (data != "t") {
        try {
          let objMessage = JSON.parse(`${data}`);
          if (objMessage.renet) {
            console.log(`${name} has reconnected.`);
            ws.send(JSON.stringify(dutalk.read(talkid)));
          } else {
            let msg = objMessage.msg;
            let t = objMessage.t;
            dutalk.talk(name, msg, t, talkid);
            clients[talkid].forEach((e) => {
              /*if (e['userId'] === userId) {
              count++;*/
              e["ws"].send(JSON.stringify([[msg, name, t]]));
            });
          }
        } catch (err) {
          ws.send(JSON.stringify({ error: err.message }));
        }
      } else {
        ws.send("t0");
      }
    });
    ws.on("close", function close(event) {
      for (var i = 0; i < clients[talkid].length; i++) {
        if (clients[talkid][i]["name"] == name) {
          clients[talkid].splice(i, 1);
        }
      }
      console.log(`${name} has out of net.`);
    });
  }
});
