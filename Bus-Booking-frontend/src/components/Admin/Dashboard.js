import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <style>{`
        .navbar {
          background-color: #343a40;
          padding: 10px 20px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar h2 {
          margin: 0;
        }

        .navbar-links button {
          background-color: white;
          color: #343a40;
          border: none;
          margin-left: 10px;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <h2>Admin Dashboard</h2>
        <div className="navbar-links">
          <button onClick={() => navigate("/UsersList")}>Users List</button>
          <button onClick={() => navigate("/ManageBuses")}>Manage Buses</button>
          <button onClick={() => navigate("/AllBookings")}>All Bookings</button>
          <button onClick={() => {
            // Add your logout logic here
            navigate("/Login"); // Redirect to login page after logout
          }}>Logout</button>
        </div>
      </nav>

      {/* Body of the dashboard (empty as per your request) */}
      <div className="dashboard-body">
        {/* Content will be here in the future */}
      </div>
    </div>
  );
};

export default Dashboard;
