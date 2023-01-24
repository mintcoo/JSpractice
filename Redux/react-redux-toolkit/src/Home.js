import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToDo from "./components/ToDo"
import { add } from "./store"

const Home = () => {
	const [text, setText] = useState("");
	const toDos = useSelector(state => state);
  const dispatch = useDispatch();

  // console.log('12',toDos[0]);

	function onChange(event) {
		setText(event.target.value);
	}
	function onSubmit(event) {
		event.preventDefault();
		console.log(text);
    dispatch(add(text))
    setText("");
	}
	return (
		<>
			<h1>To Do</h1>
			<form onSubmit={onSubmit}>
				<input type="text" value={text} onChange={onChange} />
				<button>Add</button>
			</form>
			<ul>
				{toDos.map(toDo => (
					<ToDo {...toDo} key={toDo.id} />
				))}
			</ul>
		</>
	);
};
// function mapStateToProps(state) {
// 	return { toDos: state };
// }

// function mapDispatchToProps(dispatch) {
// 	return {
// 		addToDo: text => dispatch(add(text)),
// 	};
// }

export default Home;
