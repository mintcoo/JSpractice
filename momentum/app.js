// let a  = 10;
// const b  = 5;

// const myName = "Han";

// console.log("hello " + myName);

// console.log(a + b);
// console.log(a * b);
// console.log(a / b);
// console.log(a - b);

// const amIFat = false;

// const amI = null;
// console.log(amIFat);
// console.log(amI);

// const array = ['mon', 'tue'];

// console.log(array[1]);

// array.push('wed');
// console.log(array);

// const player = {
//   name: "Han",
//   points: 100,
//   fat: true,
// };


// player.points += 10;
// console.log(player.name);
// console.log(player);


// const test = {
//   sayHello: function(name) {
//       console.log("hello", name);
//   },
// };

// test.sayHello('Hansss');

// const calculator = {
//   add: function(a, b) {
//     console.log('@@@@', a + b);
//   },
//   div: function(a, b) {
//     console.log(a / b);
//   },

// };

// calculator.add(5, 10);
// calculator.div(10, 2);

// let age = parseInt(prompt("몇살이냐?"));

// if (isNaN(age)) {
//   console.log("숫자를 입력바람");
  
// } else if (age < 18) {
//   console.log("술 못마심");
// } else if (18 <= age && age < 50) {
//   console.log("술 매우매우매우 잘마심");
// } else {
//   console.log("그만마시셈");
// }

// const title = document.getElementById("title");

// console.dir(title)

// title.innerText = "Got you!";

// const hellos = document.getElementsByClassName("mint");

// console.log(hellos);

const title_all = document.querySelectorAll(".mint h1");
console.log(title_all);


const h1 = document.querySelector(".mint h1");
console.dir(h1);

const h2 = document.querySelector(".mint h2")

function handleTitleClick() {
  console.log("h1 was clicked!");
}

function handleMouseEnter() {
  h1.innerText = "Mouse is hhhere!!";
}

function handleMouseLeave() {
  h1.innerText = "Mouse is gone!!";
}

function handleWindowResize() {
  document.body.style.backgroundColor = "tomato";
}

function handleWindowCopy() {
  alert("copier!!");
}

function handleWindowOffline() {
  alert("SOS no WIFI");
}

function handleMouseMove() {
  h2.innerText = "Wifi on";
}


h1.style.color = "skyblue";
h1.addEventListener("click", handleTitleClick);
h1.addEventListener("mouseenter", handleMouseEnter);
h1.addEventListener("mouseleave", handleMouseLeave);


window.addEventListener("resize", handleWindowResize);
window.addEventListener("copy", handleWindowCopy);
window.addEventListener("offline", handleWindowOffline);
window.addEventListener("mousemove", handleMouseMove);
// window.addEventListener("mousestop", handleMouseMove);