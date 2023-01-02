// import Button from "./Button";
// import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
	const [toDo, setToDo] = useState("");
	const [toDos, setToDos] = useState([]);
	const onChange = event => setToDo(event.target.value);
	const onSubmit = event => {
		event.preventDefault();
		// console.log(toDo);
		if (toDo === "") {
			return;
		}
		setToDo("");
		setToDos(currentArray => [...currentArray, toDo]);
	};
	useEffect(() => {
		console.log(toDos);
	}, [toDos]);
	return (
		<div>
			<h1>My To Dos {toDos.length}</h1>
			<form onSubmit={onSubmit}>
				<input
					onChange={onChange}
					value={toDo}
					type="text"
					placeholder="write todo"></input>
				<button>Add to Do</button>
			</form>
			<hr />
			<ul>
				{toDos.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
			<hr />
			{/* 아래를 위에 map으로 한거다 */}
			<ul>
				{[<li key={1}>{toDos[0]}</li>, <li key={2}>{toDos[1]}</li>]}
			</ul>
			{/* <ul> 이게 안되는 이유는 return이 아니기때문
				{toDos.forEach((item, index) => {
					<li key={index}>{item}</li>
				}
				)}
			</ul> */}
		</div>
	);
}

export default App;
