import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
	const [counter, setValue] = useState(0);
	const [keyword, setKeyword] = useState("");
	const onChange = event => setKeyword(event.target.value);
	const onClick = () => setValue(prev => prev + 1);
	// console.log("alltime");
	const iRunOneTime = () => {
		console.log("only oneTime");
	};
	useEffect(iRunOneTime, []);
	useEffect(() => {
		if (keyword !== "") {
			console.log("searching changed keyword", keyword);
		}
	}, [keyword]);
		useEffect(() => {
		if (counter !== "") {
			console.log("searching changed counter", counter);
		}
	}, [counter]);
	return (
		<div>
			<h1>{keyword}</h1>
			<input
				value={keyword}
				onChange={onChange}
				type="text"
				placeholder="searchBar"></input>
			<h1 className={styles.title}>{counter}</h1>
			<button onClick={onClick}>Click me!!</button>
			<Button text={"Continue"} />
		</div>
	);
}

export default App;
