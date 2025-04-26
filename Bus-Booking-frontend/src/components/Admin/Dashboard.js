import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    buses: 0,
    bookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, busRes, bookingRes, revenueRes] = await Promise.all([
          axios.get("http://localhost:8080/api/users/count"),
          axios.get("http://localhost:8080/api/buses/count"),
          axios.get("http://localhost:8080/api/bookings/count"),
          axios.get("http://localhost:8080/api/bookings/revenue"),
        ]);

        setStats({
          users: userRes.data,
          buses: busRes.data,
          bookings: bookingRes.data,
          revenue: revenueRes.data,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "white" }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: "#111",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #333"
      }}>
        <h2 style={{ margin: 0, color: "#fff", fontWeight: "bold" }}>Admin Dashboard</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          <button style={buttonStyle} onClick={() => navigate("/UsersList")}>Users List</button>
          <button style={buttonStyle} onClick={() => navigate("/ManageBuses")}>Manage Buses</button>
          <button style={buttonStyle} onClick={() => navigate("/BusList")}>Bus List</button>
          <button style={buttonStyle} onClick={() => navigate("/AllBookings")}>All Bookings</button>
          <button style={buttonStyle} onClick={() => navigate("/Login")}>Logout</button>
        </div>
      </nav>

      {/* Dashboard Body */}
      <div style={{ padding: "40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px"
        }}>
          <StatCard title="Total Users" value={stats.users} />
          <StatCard title="Total Buses" value={stats.buses} />
          <StatCard title="Total Bookings" value={stats.bookings} />
          <StatCard title="Total Revenue" value={`₹ ${stats.revenue}`} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div style={{
    backgroundColor: "#1a1a1a",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(255, 255, 255, 0.1)"
  }}>
    <h3 style={{ marginBottom: "15px", color: "#ccc" }}>{title}</h3>
    <p style={{ fontSize: "32px", fontWeight: "bold", color: "#fff" }}>{value}</p>
  </div>
);

const buttonStyle = {
  backgroundColor: "white",
  color: "#111",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
};

export default Dashboard;
