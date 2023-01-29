import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

const server = http.createServer(app);
// 같은 서버에서 http와 webSocket 서버 둘다 작동시키기위해서 뒤에 server를.. 같은포트에서 작동
const wss = new WebSocket.Server({ server });

// 현재 연결되어있는 브라우저들을 담아주는 리스트
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
	// console.log(socket);
  socket["nickname"] = "익명";
	console.log("브라우저랑 연결됨 ㅋ");
	socket.on("close", () => console.log("Disconnected from the Browser ❌"));
	socket.on("message", message => {
		// console.log(message.toString("utf8"));
    // socket.send(message.toString("utf8"));
    // 왜이렇게 번거롭게 하냐면 세상에는 JS만 쓰는게 아니라 Object로 보내면안댐 그냥 string로만 보내고 백엔드에서 처리
    const msg = JSON.parse(message);
    switch (msg.type) {
      case "new_message":
        sockets.forEach((soc) => {
          // 이건 나한테는 메시지 안보이게할때
          // if (soc != socket) {
          //   soc.send(message.toString("utf8"));
          // }
          soc.send(`${socket.nickname} : ${msg.payload.toString("utf8")}`);
        })
        break
      case "nickname":
        // 소켓엔 새로운 아이템추가가능 왜냐면 객체라서 위에 익명처리도해주고
        socket["nickname"] = msg.payload;
        console.log(msg.payload)
        break
    }
	});
	// socket.send("hello!")
});

server.listen(3000, handleListen);
