import React from "react";
import { Link } from "react-router-dom";

const Navagation = ({ userObj }) => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
          <img src="https://w.namu.la/s/77b4dfff7b85940f74c12198cecc6f33af228417cfeea99ad1da0b19e9a4ce43259056a2fdc3fe0e3508e1da46d2fc80259e04afed8f6c301b99c48045f28cc6117135e7681f1c246535dbc1785e66e0fe898d4c514c818ceadd0f0b548126583a4238de0f5fc85f2a52e347f3550372" width="25px" height="25px" alt="userImage" />
					<Link to="profile">{userObj.displayName}의 프로필</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navagation;
