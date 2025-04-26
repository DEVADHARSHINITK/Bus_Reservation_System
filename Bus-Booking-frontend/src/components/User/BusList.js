import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/buses')
      .then((response) => {
        setBuses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bus data:', error);
      });
  }, []);

  const handleBookNow = () => {
    navigate("/BookBus");
  };

  const handleBookingHistory = () => {
    navigate("/BookingHistory");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#111",  // Full dark background
        color: "#ccc",
        minHeight: "100vh",
        overflowY: "auto",
        paddingTop: "70px",  // Adjust for navbar
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{
          backgroundColor: "#000",
          padding: "20px 0",
          zIndex: "9999",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <span className="navbar-brand fs-3">TRIP TREK</span>

          <div className="d-flex align-items-center gap-4">
            <button
              className="btn btn-link nav-link text-white fs-5"
              onClick={handleBookingHistory}
            >
              Booking History
            </button>
            <button
              className="btn btn-link nav-link text-white fs-5"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Bus List Content */}
      <div className="container mt-5">
        <h2 className="text-center mb-4" style={{ color: "#fff" }}>
          Available Buses
        </h2>

        <div className="table-responsive">
          <table
            className="table"
            style={{
              backgroundColor: "#fff",
              border: "2px solid #000",
              borderCollapse: "collapse",
              width: "100%",
              color: "#000",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#fff", color: "#000" }}>
                <th style={{ border: "1px solid #000", padding: "10px" }}>ID</th>
                <th style={{ border: "1px solid #000", padding: "10px" }}>Bus Name</th>
                <th style={{ border: "1px solid #000", padding: "10px" }}>Total Seats</th>
                <th style={{ border: "1px solid #000", padding: "10px" }}>Source</th>
                <th style={{ border: "1px solid #000", padding: "10px" }}>Destination</th>
                <th style={{ border: "1px solid #000", padding: "10px" }}>Cost</th>
                <th style={{ border: "1px solid #000", padding: "10px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {buses.length > 0 ? (
                buses.map((bus) => (
                  <tr key={bus.id} style={{ backgroundColor: "#fff", color: "#000" }}>
                    <td style={{ border: "1px solid #000", padding: "10px" }}>{bus.id}</td>
                    <td style={{ border: "1px solid #000", padding: "10px" }}>{bus.busName}</td>
                    <td style={{ border: "1px solid #000", padding: "10px" }}>{bus.totalSeats}</td>
                    <td style={{ border: "1px solid #000", padding: "10px" }}>{bus.source}</td>
                    <td style={{ border: "1px solid #000", padding: "10px" }}>{bus.destination}</td>
                    <td style={{ border: "1px solid #000", padding: "10px" }}>₹ {bus.cost}</td>
                    <td style={{ border: "1px solid #000", padding: "10px" }}>
                      <button
                        className="btn btn-success"
                        onClick={handleBookNow}
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center"
                    style={{
                      border: "1px solid #000",
                      color: "#000",
                      padding: "10px",
                    }}
                  >
                    No buses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusList;
