import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react"
import Home from "./routes/Home";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(setIsLoggedIn)

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <div>로그인안됨</div>} />
        
      </Routes>
    </Router>
  );
}

export default App;
