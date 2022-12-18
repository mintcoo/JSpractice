document.addEventListener("DOMContentLoaded", () => {
	const root = document.querySelector("#root");
	const title = <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>Hello Im a titoe</h3>
	// const h3 = React.createElement(
	// 	"h3",
	// 	{
	// 		onMouseEnter: () => console.log("이것도 되냐??"),
	// 	},
	// 	"Hello I'm Span"
	// );
	const btn = <button onClick={() => console.log("버튼클릭")}>Click Me!!</button>
	// const button = React.createElement(
	// 	"button",
	// 	{ onClick: () => console.log("눌렀따") },
	// 	"click me"
	// );
	const container = React.createElement("div", null, [title, btn]);
	ReactDOM.render(container, root);
});
