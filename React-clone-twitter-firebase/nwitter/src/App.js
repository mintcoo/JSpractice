import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { authService } from "./firebase"
import Home from "./routes/Home";
import Auth from "./routes/Auth";

function App() {
	console.log('23123',authService.currentUser);
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
	console.log(setIsLoggedIn);

	return (
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
      <footer>&copy; { new Date().getFullYear() } Ntwitter</footer>
		</Router>
	);
}

export default App;
