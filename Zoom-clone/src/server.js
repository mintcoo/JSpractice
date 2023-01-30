import http from "http";
// import WebSocket from "ws";
import { Server } from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

const httpServer = http.createServer(app);
// 같은 서버에서 http와 webSocket 서버 둘다 작동시키기위해서 뒤에 server를.. 같은포트에서 작동
// const wss = new WebSocket.Server({ server });
// 아래껀 websocket 이용
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    // console.log(socket.rooms);
    done();
    socket.to(roomName).emit("welcome");
  });
  // 접속이 완전히 끊어지기 직전! 도중에! 먼가를 실행하고 떠날수있는거
  socket.on("disconnecting", () => {
    // 내가 접속해있는 모든방들에게 메시지 전달
    socket.rooms.forEach((room) => socket.to(room).emit("bye"));
  });
  // 새로운 메시지 세팅 (인자로 메시지, 룸이름, 함수받아옴)
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", msg);
    done();
  });
});
// 현재 연결되어있는 브라우저들을 담아주는 리스트 with websocket
// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
// 	// console.log(socket);
//   socket["nickname"] = "익명";
// 	console.log("브라우저랑 연결됨 ㅋ");
// 	socket.on("close", () => console.log("Disconnected from the Browser ❌"));
// 	socket.on("message", message => {
// 		// console.log(message.toString("utf8"));
//     // socket.send(message.toString("utf8"));
//     // 왜이렇게 번거롭게 하냐면 세상에는 JS만 쓰는게 아니라 Object로 보내면안댐 그냥 string로만 보내고 백엔드에서 처리
//     const msg = JSON.parse(message);
//     switch (msg.type) {
//       case "new_message":
//         sockets.forEach((soc) => {
//           // 이건 나한테는 메시지 안보이게할때
//           // if (soc != socket) {
//           //   soc.send(message.toString("utf8"));
//           // }
//           soc.send(`${socket.nickname} : ${msg.payload.toString("utf8")}`);
//         })
//         break
//       case "nickname":
//         // 소켓엔 새로운 아이템추가가능 왜냐면 객체라서 위에 익명처리도해주고
//         socket["nickname"] = msg.payload;
//         console.log(msg.payload)
//         break
//     }
// 	});
// 	// socket.send("hello!")
// });

httpServer.listen(3000, handleListen);
