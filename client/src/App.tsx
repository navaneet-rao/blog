import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Loading from "./pages/Loading/Loading"; // Import your Loading component

// Lazy load components
const Dashboard = lazy(() => import("./pages/Dashboard/dashboard"));
const Signup = lazy(() => import("./pages/SignUp/signUp"));
const Login = lazy(() => import("./pages/LogIn/logIn"));
const Landing = lazy(() => import("./pages/Landing/landing"));
const NewFeed = lazy(() => import("./pages/Blog/NewFeed/NewFeed"));
const PostView = lazy(() => import("./pages/Blog/ViewPost/ViewPost"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

function App() {
  return (
    <Router>
      <UserProvider>
        <Suspense fallback={<Loading />}>
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
            <Route path="/newfeed" element={<NewFeed />} />
            <Route path="/post/:postId" element={<PostView />} />
          </Routes>
        </Suspense>
      </UserProvider>
    </Router>
  );
}

export default App;
