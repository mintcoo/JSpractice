const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

// 카메라들 얻는 함수
async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
		// 나의 모든 디바이스중 카메라만 가져오고
    const cameras = devices.filter((device) => device.kind === "videoinput");
		// 현재 나의 카메라를 선택하고
		const currentCamera = myStream.getVideoTracks()[0];
		// 카메라 선택할 수 있는 옵션들을 만들어서 넣어줌(value에는 deviceId, text에는 label)
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
			// 근데 현재카메라랑 카메라옵션이랑 같을때 그 옵션을 선택으로 해줌 그래야 제대로된스위치 가능
			if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}


// async 처리해야함, 처음에는 deviceId가 없이했지만 옵션선택을 위해 이제는 받아야함
// 그래서 분기처리해줌 deviceId가 있을때(처음)와 없을때
async function getMedia(deviceId) {
	// 여기는 초기 카메라없을때 모바일 셀카카메라 or 어떤카메라든 가져오는것
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };
	// 여기는 이후에 옵션선택해주었을때 특정 카메라
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstrains
    );
		// console.log(myStream);
    myFace.srcObject = myStream;
		// 디바이스아이디가 없을때만 딱 한번 카메라옵션 구성하는 함수 실행
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}
// 모든걸 시작시키는 함수 잠시 주석처리
// getMedia();

// 소리 끄는 함수
function handleMuteClick() {
	// console.log(myStream.getAudioTracks());
	myStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
// 카메라 끄는 함수
function handleCameraClick() {
	myStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

// 카메라 바꿀때 옵션 변경했으니 getMedia 다시실행해준다(이제는 특정카메라id도 담아서 실행)
async function handleCameraChange() {
  await getMedia(camerasSelect.value);
	// 카메라 옵션 변경시 업데이트 코드
	if (myPeerConnection) {
		// 밑의 videoTrack코드는 왜냐면 위에 await getMedia로 내 비디오트랙을 업데이트 해줬기떄문에 
		// 가져오면 새로 바뀐 비디오트랙임
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack);
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// --- welcome Form 관련 코드 (방에 들어가는거 join a room) ---
const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

// 그냥 프로미스 연습 
// const test = () => {
// 	const promiseTest = new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve("DONJE!!");
// 		}, 5000)
// 	})
// 	return promiseTest;

// }

// 방에 입장하면서 화상을 모든걸 시작하는 코드
// 여기 이 함수는 방이 비어있든 아니든 둘다 항상 실행이된다
async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
	// const ttest = await test();
	// console.log(ttest);
  await getMedia();
	makeConnection();
}

// 방에 입장하는 함수 백엔드로 방의 이름을 보내줌
async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
	// initCall을 여기서 해주는이유는 안그러면 makeConnection이 일어나기전에 모든코드가 실행되어서 에러남
	await initCall();
  socket.emit("join_room", input.value);
	// 우선 룸네임을 따로 변수로 저장해둔다 나중에 쓸려고
  roomName = input.value;
  input.value = "";
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);



// --- webRTC Socket 코드부분 ---

// 누군가가 방에 들어올때 처리하는 이벤트함수 => 그래서 peer A만 실행하는 코드가 된다(메시지받는쪽)
socket.on("welcome", async () => {
	console.log("someone enter the room!")
	// offer란걸 만듬 (모식도를 잘 따라가자)
  const offer = await myPeerConnection.createOffer();

	// 만든 offer로 setLocalDescription 만듬
  myPeerConnection.setLocalDescription(offer);

	// 그리고 만든 offer를 방의 다른사람에게 보내야함(우선 서버로 보냄)
	console.log("sent the offer");
  socket.emit("offer", offer, roomName);
});

// 이건 peer B가 실행하게 되는 offer이벤트 함수 (A가 보낸 offer를 받아 setRemoteDescription함)
socket.on("offer", async (offer) => {
	console.log("received the offer");
  myPeerConnection.setRemoteDescription(offer);
	// 그리고 createAnswer 함수 실행
  const answer = await myPeerConnection.createAnswer();
	// 그리고 이 answer로 peer B의 setLocalDescription 해줘야함 
	// 헷갈리지 말자!! 위의 welcome 과는 실행주체가 다르다
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
	console.log("sent the answer");
});

// 이건 또 peer B가 다시보낸 answer를 peer A가 실행하는 함수임 
// 그리고 이제 둘다 setLocalDes~와 setRemoteDes~를 가지게 됨!
socket.on("answer", (answer) => {
	console.log("received the answer");
  myPeerConnection.setRemoteDescription(answer);
});

// icecandidate를 서로 주고받는 과정
socket.on("ice", (ice) => {
  console.log("received candidate");
  myPeerConnection.addIceCandidate(ice);
});

// --- RTC Code 부분 ---

// 연결을 만드는 부분 처음, 방에 입장하자마자 실행됨, peer A 든 B든 둘다 실행됨(initCall()안에 있는 함수라)
function makeConnection() {
	myPeerConnection = new RTCPeerConnection({
		// 구글의 무료 stun서버 : 내가 프로젝트할때는 내꺼 만드는게 좋다
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
	// icecandidate 이벤트를 듣는다.
	myPeerConnection.addEventListener("icecandidate", handleIce);
	// 마지막 addstream 이벤트를 듣는다
	myPeerConnection.addEventListener("addstream", handleAddStream);
	// 오디오트랙과 비디오트랙 2개가 나타나고 그걸 각각 myPeerConnection에 연결해줌
	// console.log(myStream.getTracks());
	myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));
}

// icecandidate 이벤트시 실행 함수
function handleIce(data) {
  console.log("sent candidate");
	// icecandidate를 만들면 이걸 또 서버로 보내줌
  socket.emit("ice", data.candidate, roomName);
}

// addStream 이벤트시 실행 함수
function handleAddStream(data) {
	console.log('data.stream@@@@@@@@@@@', data.stream);
  const peerFace = document.getElementById("peerFace");
  peerFace.srcObject = data.stream;
}

// // ------------- 여기 밑으로는 채팅관련 ----------------
// const welcome = document.getElementById("welcome");
// const form = welcome.querySelector("form");
// const room = document.getElementById("room");

// // 채팅방 숨기고
// room.hidden = true;

// let roomName;

// // 메시지를 채팅창에 띄워주는 함수
// function addMessage(message, nickName) {
// 	const ul = room.querySelector("ul");
// 	const li = document.createElement("li");
// 	li.innerText = `${nickName} : ${message}`;
// 	ul.appendChild(li);
// }

// // 메시지 제출하면 실행되는 함수
// function handleMessageSubmit(event) {
//   event.preventDefault();
//   const input = room.querySelector("input");
//   const value = input.value;
//   // 백엔드로 이벤트이름과 메시지내용, 함수를 보내주는데 그 함수를 백엔드에서 실행시킴
//   // 이렇게 한단계 거쳐가는 이유는 백엔드에서 모두에게 메시지를 뿌려주어야 전부 보이기때문
//   socket.emit("new_message", input.value, roomName, () => {
//     addMessage(`You: ${value}`);
//   });
//   input.value = "";
// }

// // 들어가면 입장 숨기고  채팅방 보이기
// function showRoom() {
// 	welcome.hidden = true;
// 	room.hidden = false;
// 	const h3 = room.querySelector("h3");
// 	h3.innerText = `Room ${roomName}`;
//   // 메시지를 입력해서 제출하면
//   const form = room.querySelector("form");
//   form.addEventListener("submit", handleMessageSubmit);
// }

// // function backendDone(msg) {
// //   console.log(`The backend says: `, msg);
// // }

// function handleRoomSubmit(event) {
// 	event.preventDefault();
// 	const input = form.querySelector("input");
// 	// 내가 원하는 무슨 이벤트든지 이름정하고 emit으로 보내주면된다 그리고 함수도 보내줄수있다.
// 	// 그러면 백엔드에서 함수실행하면 프론트에서 뜬다 !! 그런데 이 함수는 꼭 마지막인자로 넣어야한다
// 	// 백엔드에서 바로 먼가 함수실행하는건 위험하니까 프론트를 통해 실행시키는것
// 	socket.emit("enter_room", input.value, showRoom);
// 	roomName = input.value;
// 	input.value = "";
// }


// form.addEventListener("submit", handleRoomSubmit);



// socket.on("welcome", () => {
// 	addMessage(` 들어옴!!`);
// });

// socket.on("bye", () => {
// 	addMessage("슬프게도 떠나감!!");
// });

// socket.on("new_message", (msg) => {addMessage(msg)});


// ----------- 그냥 webSocket으로만 쓰는 코드 -----------
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
