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
	},[toDos])
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
			<ul></ul>
			{toDos.map((item) => <li>{item}</li>)}
		</div>
	);
}

export default App;
