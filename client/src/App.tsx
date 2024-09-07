// App.tsx
//
//  this file contains basic react router dom functions
//
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/SignUp/signUp";
import Login from "./pages/LogIn/logIn";
import Landing from "./pages/Landing/landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
