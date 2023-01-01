import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Hello() {
	useEffect(() => {console.log("created")}, [])
	// 이 useEffect는 Hello컴포넌트가 생성(showing === true 일때)될때마다 한번씩 실행되는거다
	return <h1>hello</h1>
}

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

	// Cleanup 부분 코드
	const [showing, setShowing] = useState(false);
	const onClick2 = () => setShowing(current => !current);
	return (
		<div>
			{showing ? <Hello /> : null}
			
			<button onClick={onClick2}>{showing ? "hide" : "show"}</button>
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
