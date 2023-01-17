import React from "react";
import { Link } from "react-router-dom";

const Navagation = ({ userObj }) => {
	return (
		<nav>
			<ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
				<li>
					<Link to="/" style={{ marginRight: 10 }}>
						Home
					</Link>
				</li>
				<li>
					<img
						src="https://w.namu.la/s/77b4dfff7b85940f74c12198cecc6f33af228417cfeea99ad1da0b19e9a4ce43259056a2fdc3fe0e3508e1da46d2fc80259e04afed8f6c301b99c48045f28cc6117135e7681f1c246535dbc1785e66e0fe898d4c514c818ceadd0f0b548126583a4238de0f5fc85f2a52e347f3550372"
						width="25px"
						height="25px"
						alt="userImage"
					/>
					<Link
						to="profile"
						style={{
							marginLeft: 10,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							fontSize: 12,
						}}>
						<span style={{ marginTop: 10 }}>
							{userObj.displayName
								? `${userObj.displayName}의 Profile`
								: "Profile"}
						</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navagation;
