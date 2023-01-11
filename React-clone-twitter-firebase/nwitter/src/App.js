import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./routes/Home";
import Auth from "./routes/Auth";

function App() {
	// console.log('23123',authService.currentUser);
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
	useEffect(() => {
		onAuthStateChanged(authService, user => {
			if (user) {
				setIsLoggedIn(true);
				// const uid = user.uid;
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{ init ? 
				<Router>
					<Routes>
						{isLoggedIn ? (
							<>
								<Route path="/" element={<Home />} />
							</>
						) : (
							<Route path="/" element={<Auth />} />
						)}
					</Routes>
					<footer>&copy; {new Date().getFullYear()} Ntwitter</footer>
				</Router>
				: "Initializing......"
			}
		</>
	);
}

export default App;
