// src/pages/Dashboard.tsx
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext"; // Adjust the path if needed
import Layout from "../../layouts/layout";

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <Layout>
      <div className="">
        <h1>Dashboard</h1>
        {user ? (
          <>
            <h2>Welcome, {user.name}</h2>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <h2>You are not logged in.</h2>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
