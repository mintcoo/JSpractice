
const loginInput = document.querySelector(".login-form input");
const loginButton = document.querySelector(".login-form button");

const link = document.querySelector("a");

function btnClick() {
  const username = loginInput.value;
  console.log(username);
}

function linkClick() {
  alert("clicked!!!");
}


loginButton.addEventListener("click", btnClick);
link.addEventListener("click", linkClick);