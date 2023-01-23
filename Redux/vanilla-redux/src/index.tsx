// import React from 'react';
import { legacy_createStore } from 'redux'

const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const number = document.querySelector("span") as HTMLSpanElement;

// type Modifier = (state: number, action: any) => number;
const PLUS = "plus"
const MINUS = "minus"

const countModifier = (count: number = 0, action: any) => {
  switch (action.type) {
    case PLUS:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
}

const countStore = legacy_createStore(countModifier);

const onChange = () => {
  number.innerText = String(countStore.getState());
}

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: PLUS });
}

plus?.addEventListener("click", handleAdd );
minus?.addEventListener("click", () => countStore.dispatch({ type: MINUS }));

console.log(countStore.getState())

// 두가지 방법 가능 위에처럼 as로써 단언해주거나 주석처리한 if문 처리
// if (number) {
//   number.innerText = String(count);
// }
// number.innerText = String(count);

// const updateText = () => {
//   number.innerText = String(count);
// }

// const handleAdd = () => {
//   console.log("add")
//   count = count + 1;
//   console.log(count)
//   updateText();
// }
// const handleMinus = () => {
//   console.log("minus")
//   count = count - 1;
//   updateText()
// }


// plus?.addEventListener("click", handleAdd);
// minus?.addEventListener("click", handleMinus);