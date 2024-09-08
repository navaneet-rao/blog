// App.tsx
//
//  this file contains basic react router dom functions
//

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/dashboard";
import Signup from "./pages/SignUp/signUp";
import Login from "./pages/LogIn/logIn";
import Landing from "./pages/Landing/landing";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
