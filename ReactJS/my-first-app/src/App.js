// import Button from "./Button";
// import styles from "./App.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState([]);
	const onChange = (event => console.log(event.target.value));
	// useEffect(() => {console.log()}, [onChange])
	// useEffect(() => {
	// 	fetch("https://api.coinpaprika.com/v1/tickers")
	// 		.then(response => response.json())
	// 		.then(json => {
	// 			setCoins(json);
	// 			setLoading(false);
	// 		});
	// }, []);
	useEffect(() => {
		axios({
			url: "https://api.coinpaprika.com/v1/tickers",
		})
		.then(res => {
			console.log(res.data)
			setCoins(res.data);
			setLoading(false);
		});
	}, []);
	return (
		<div>
			<h1>the Coins!!{coins.length}</h1>
			{loading ? (
				<strong>Loading...</strong>
			) : (
				<select onChange={onChange}>
					{coins.map(coin => (
						<option key={coin.id}>
							{coin.name} : ({coin.symbol}) ${coin.quotes.USD.price}
						</option>
					))}
				</select>
			)}
		</div>
	);
}

// ---------- 이 아래로는 To Do List 연습 ----------- //
// function App() {
// 	const [toDo, setToDo] = useState("");
// 	const [toDos, setToDos] = useState([]);
// 	const onChange = event => setToDo(event.target.value);
// 	const onSubmit = event => {
// 		event.preventDefault();
// 		// console.log(toDo);
// 		if (toDo === "") {
// 			return;
// 		}
// 		setToDo("");
// 		setToDos(currentArray => [...currentArray, toDo]);
// 	};
// 	useEffect(() => {
// 		console.log(toDos);
// 	}, [toDos]);
// 	return (
// 		<div>
// 			<h1>My To Dos {toDos.length}</h1>
// 			<form onSubmit={onSubmit}>
// 				<input
// 					onChange={onChange}
// 					value={toDo}
// 					type="text"
// 					placeholder="write todo"></input>
// 				<button>Add to Do</button>
// 			</form>
// 			<hr />
// 			<ul>
// 				{toDos.map((item, index) => (
// 					<li key={index}>{item}</li>
// 				))}
// 			</ul>
// 			<hr />
// 			{/* 아래를 위에 map으로 한거다 */}
// 			<ul>
// 				{[<li key={1}>{toDos[0]}</li>, <li key={2}>{toDos[1]}</li>]}
// 			</ul>
// 		</div>
// 	);
// }

export default App;
