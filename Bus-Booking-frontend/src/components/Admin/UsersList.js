import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await API.delete(`/users/${userId}`);
        fetchUsers();
      } catch (err) {
        setError("Failed to delete user.");
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: "#111",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #333"
      }}>
        <span style={{ fontWeight: "bold", fontSize: "24px", color: "#fff" }}>Trip Trek</span>
        <div style={{ display: "flex", gap: "15px" }}>
        <button style={buttonStyle} onClick={() => navigate("/Dashboard")}>Dash Board</button>
          <button style={buttonStyle} onClick={() => navigate("/ManageBuses")}>Manage Buses</button>
          <button style={buttonStyle} onClick={() => navigate("/BusList")}>Bus List</button>
          <button style={buttonStyle} onClick={() => navigate("/AllBookings")}>All Bookings</button>
          <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%" }}> {/* Reduced width */}
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#ccc" }}>Users List</h2>

          {error && (
            <div style={{ backgroundColor: "#ff4d4d", color: "#000", padding: "10px", borderRadius: "8px", textAlign: "center", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  {["ID", "Name", "Gender", "Contact", "Email", "Role", "Actions"].map((header) => (
                    <th key={header} style={cellStyle}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td style={cellStyle}>{user.id}</td>
                      <td style={cellStyle}>{user.name}</td>
                      <td style={cellStyle}>{user.gender}</td>
                      <td style={cellStyle}>{user.contact}</td>
                      <td style={cellStyle}>{user.email}</td>
                      <td style={cellStyle}>{user.role}</td>
                      <td style={cellStyle}>
                        <button
                          style={deleteButtonStyle}
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ ...cellStyle, textAlign: "center", padding: "20px" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

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

const tableStyle = {
  width: "100%",
  maxWidth: "1200px", // restrict table width
  margin: "0 auto",
  borderCollapse: "collapse",
  backgroundColor: "#1a1a1a",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid white", // outer border
};

const cellStyle = {
  border: "1px solid white",
  padding: "12px",
  textAlign: "center",
  color: "white",
};

const deleteButtonStyle = {
  backgroundColor: "#ff4d4d",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default UsersList;
