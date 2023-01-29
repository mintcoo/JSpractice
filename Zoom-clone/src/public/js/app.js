const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => {
	const msg = { type, payload };
	return JSON.stringify(msg);
};

socket.addEventListener("open", () => {
	console.log("서버연결됨 ㅋ");
});

socket.addEventListener("message", message => {
	// console.log("New message: ", message.data);
	const li = document.createElement("li");
	li.innerText = message.data;
	messageList.append(li);
});

socket.addEventListener("close", () => {
	console.log("Disconnected from Server ❌");
});

// setTimeout(() => {
//   socket.send("hello from the browser!");
// }, 3000);

function handleSubmit(event) {
	event.preventDefault();
	const input = messageForm.querySelector("input");
	socket.send(makeMessage("new_message", input.value));
	input.value = "";
}

function handleNickSubmit(event) {
	event.preventDefault();
	const input = nickForm.querySelector("input");
	socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
