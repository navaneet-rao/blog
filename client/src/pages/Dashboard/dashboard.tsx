// src/pages/Dashboard.tsx
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext"; // Adjust the path if needed
import Layout from "../../layouts/layout";
import AddPost from "../../components/Post/AddPost";

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background-1 to-background-2 pt-24">
        <div className="container mx-auto">
          <h1 className="text-5xl text-text-1">Dashboard</h1>
          {user ? (
            <>
              <h2 className="text-text-1">Welcome, {user.name}</h2>
              <div>
                <AddPost/>
              </div>
              <button
                onClick={logout}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-text-inv-1 hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <h2>You are not logged in.</h2>
              <h2>Login Failed. Please try again after some time </h2>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
