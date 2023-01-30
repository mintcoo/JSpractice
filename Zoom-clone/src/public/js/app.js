const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

// 채팅방 숨기고
room.hidden = true;

let roomName;

// 메시지를 채팅창에 띄워주는 함수
function addMessage(message) {
	const ul = room.querySelector("ul");
	const li = document.createElement("li");
	li.innerText = message;
	ul.appendChild(li);
}

// 메시지 제출하면 실행되는 함수
function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  // 백엔드로 이벤트이름과 메시지내용, 함수를 보내주는데 그 함수를 백엔드에서 실행시킴
  // 이렇게 한단계 거쳐가는 이유는 백엔드에서 모두에게 메시지를 뿌려주어야 전부 보이기때문
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

// 들어가면 입장 숨기고  채팅방 보이기
function showRoom() {
	welcome.hidden = true;
	room.hidden = false;
	const h3 = room.querySelector("h3");
	h3.innerText = `Room ${roomName}`;
  // 메시지를 입력해서 제출하면
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
}

// function backendDone(msg) {
//   console.log(`The backend says: `, msg);
// }

function handleRoomSubmit(event) {
	event.preventDefault();
	const input = form.querySelector("input");
	// 내가 원하는 무슨 이벤트든지 이름정하고 emit으로 보내주면된다 그리고 함수도 보내줄수있다.
	// 그러면 백엔드에서 함수실행하면 프론트에서 뜬다 !! 그런데 이 함수는 꼭 마지막인자로 넣어야한다
	// 백엔드에서 바로 먼가 함수실행하는건 위험하니까 프론트를 통해 실행시키는것
	socket.emit("enter_room", input.value, showRoom);
	roomName = input.value;
	input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);



socket.on("welcome", () => {
	addMessage("누군가 들어옴!!");
});

socket.on("bye", () => {
	addMessage("슬프게도 떠나감!!");
});

socket.on("new_message", (msg) => {addMessage(msg)});


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
