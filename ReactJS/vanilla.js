document.addEventListener('DOMContentLoaded', () => {
  const clickBtn = document.querySelector('button');
  const textNumber = document.querySelector('div');
  let number = 0;
  clickBtn.addEventListener('click', () => {
    number += 1;
    textNumber.innerText = `click = ${number}`;
  })
})