const socket = io();


const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg) {
  console.log(`The backend says: `, msg);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
	// 내가 원하는 무슨 이벤트든지 이름정하고 emit으로 보내주면된다 그리고 함수도 보내줄수있다.
	// 그러면 백엔드에서 함수실행하면 프론트에서 뜬다 !! 그런데 이 함수는 꼭 마지막인자로 넣어야한다
	// 백엔드에서 바로 먼가 함수실행하는건 위험하니까 프론트를 통해 실행시키는것
	socket.emit("enter_room", input.value, backendDone);
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

// 그냥 webSocket으로만 쓰는 코드
// const messageList = document.querySelector("ul");
// const messageForm = document.querySelector("#message");
// const nickForm = document.querySelector("#nick");
// const socket = new WebSocket(`ws://${window.location.host}`);

// const makeMessage = (type, payload) => {
// 	const msg = { type, payload };
// 	return JSON.stringify(msg);
// };

// socket.addEventListener("open", () => {
// 	console.log("서버연결됨 ㅋ");
// });

// socket.addEventListener("message", message => {
// 	// console.log("New message: ", message.data);
// 	const li = document.createElement("li");
// 	li.innerText = message.data;
// 	messageList.append(li);
// });

// socket.addEventListener("close", () => {
// 	console.log("Disconnected from Server ❌");
// });

// // setTimeout(() => {
// //   socket.send("hello from the browser!");
// // }, 3000);

// function handleSubmit(event) {
// 	event.preventDefault();
// 	const input = messageForm.querySelector("input");
// 	socket.send(makeMessage("new_message", input.value));
// 	input.value = "";
// }

// function handleNickSubmit(event) {
// 	event.preventDefault();
// 	const input = nickForm.querySelector("input");
// 	socket.send(makeMessage("nickname", input.value));
//   input.value = "";
// }

// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);
