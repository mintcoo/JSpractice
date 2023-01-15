import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navigation from "./components/Navigation";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import Auth from "./routes/Auth";

function App() {
	// console.log('23123',authService.currentUser);
	const [init, setInit] = useState(false);
	// userObj로 로그인여부를 대신해서 줄임
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);
	
	useEffect(() => {
		onAuthStateChanged(authService, user => {
			if (user) {
				// setIsLoggedIn(true);
				setUserObj(user);
				// const uid = user.uid;
			} else {
				setUserObj(null);
			}
			setInit(true);
		});
	}, []);
	return (
		<>
			{init ? (
				<Router>
					{userObj && <Navigation />}
					<Routes>
						{userObj ? (
							<>
								<Route path="/" element={<Home userObj={userObj}/>} />
								<Route path="/profile" element={<Profile />} />
							</>
						) : (
							<Route path="/" element={<Auth />} />
						)}
					</Routes>
					{/* <footer>&copy; {new Date().getFullYear()} Ntwitter</footer> */}
				</Router>
			) : (
				"Initializing......"
			)}
		</>
	);
}

export default App;
