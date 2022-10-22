const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");
const userId = document.querySelector("#greeting");

const link = document.querySelector("a");

const HIDDEN_CLASSNAME = "hidden";

function loginBtnClick(event) {
  event.preventDefault()
  const username = loginInput.value
  loginForm.classList.add(HIDDEN_CLASSNAME)
  userId.innerText = `hello!!! ${username}`
  userId.classList.remove(HIDDEN_CLASSNAME)
  
}

function linkClick(event) {
  event.preventDefault()
  alert("clicked!!!");
}


loginButton.addEventListener("click", loginBtnClick);
link.addEventListener("click", linkClick);