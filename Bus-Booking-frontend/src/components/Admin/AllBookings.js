import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const AllBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/all");
      setBookings(res.data);
    } catch (err) {
      setError("Failed to fetch bookings.");
      console.error("Error fetching bookings:", err);
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
          <button style={buttonStyle} onClick={() => navigate("/BusList")}>Bus List</button>
          <button style={buttonStyle} onClick={() => navigate("/ManageBuses")}>Manage Buses</button>
          <button style={buttonStyle} onClick={() => navigate("/Dashboard")}>DashBoard</button>
          <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#ccc" }}>All Bookings</h2>

          {error && (
            <div style={{ backgroundColor: "#ff4d4d", color: "#000", padding: "10px", borderRadius: "8px", textAlign: "center", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  {["Booking ID", "User Email", "Bus Name", "Source", "Destination", "Cost", "Travel Date", "Seats", "Passengers"].map((header) => (
                    <th key={header} style={cellStyle}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.bookingId}>
                      <td style={cellStyle}>{booking.bookingId}</td>
                      <td style={cellStyle}>{booking.userEmail}</td>
                      <td style={cellStyle}>{booking.busName}</td>
                      <td style={cellStyle}>{booking.source}</td>
                      <td style={cellStyle}>{booking.destination}</td>
                      <td style={cellStyle}>{booking.cost}</td>
                      <td style={cellStyle}>{booking.travelDate}</td>
                      <td style={cellStyle}>{booking.numberOfSeats}</td>
                      <td style={cellStyle}>
                        <ul className="list-disc pl-4">
                          {booking.passengers.map((p, index) => (
                            <li key={index}>{p.name} ({p.gender})</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ ...cellStyle, textAlign: "center", padding: "20px" }}>
                      No bookings found
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
  maxWidth: "1400px", // Increased table width
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

export default AllBookingsPage;
