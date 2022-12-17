document.addEventListener("DOMContentLoaded", () => {
	const root = document.querySelector("#root");
	const h3 = React.createElement(
		"h3",
		{
			onMouseEnter: () => console.log("이것도 되냐??"),
		},
		"Hello I'm Span"
	);
	const button = React.createElement(
		"button",
		{ onClick: () => console.log("눌렀따") },
		"click me"
	);
	const container = React.createElement("div", null, [h3, button]);
	ReactDOM.render(container, root);
});
