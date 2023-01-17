import { React, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	// signInWithPopup,
	// sendEmailVerification
} from "firebase/auth";
import { authService } from "../firebase";

const AuthForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const onChange = event => {
		console.log(event.target.name);
		const { name, value } = event.target;

		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const onSubmit = async event => {
		event.preventDefault();
		try {
			let data;
			if (newAccount) {
				// create newAccount
				data = await createUserWithEmailAndPassword(
					authService,
					email,
					password
				);
				// sendEmail();
			} else {
				// Log in
				data = await signInWithEmailAndPassword(authService, email, password);
			}
			console.log("test", data);
		} catch (error) {
			setError(error.message.replace("Firebase: ", ""));
		}
	};

	const toggleAccount = () => {
		setNewAccount(prev => !prev);
	};
	return (
		<>
			<form onSubmit={onSubmit} className="container">
				<input
					name="email"
					type="text"
					placeholder="Email"
					required
					value={email}
					onChange={onChange}
          className="authInput"
				/>
				<input
					name="password"
					type="password"
					placeholder="password"
					required
					value={password}
					onChange={onChange}
					autoComplete="off"
          className="authInput"
				/>
				<input type="submit" value={newAccount ? "Create Account" : "Log In"} className="authInput authSubmit" />
				{error && <span className="authError">{error}</span>}
			</form>
			<span onClick={toggleAccount} className="authSwitch">
				{newAccount ? "Log in" : "Create Account"}
			</span>
		</>
	);
};

export default AuthForm;
