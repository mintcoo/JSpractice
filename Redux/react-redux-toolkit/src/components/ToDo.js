import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { connect } from "react-redux";
import { remove } from "../store";
import { Link } from "react-router-dom";

function ToDo({ text, id }) {
	const dispatch = useDispatch();
	const data = useSelector(state => state);

	const onClick = () => {
    dispatch(remove(id));
    console.log(data)
	};

	return (
		<li>
			<Link to={`/${id}`}>{text}</Link>
			<button onClick={onClick}>DEL</button>
		</li>
	);
}

// function mapDispatchToProps(dispatch, ownProps) {
//   return {
//     onBtnClick: () => dispatch(remove(ownProps.id))
//   };
// }

export default ToDo;
