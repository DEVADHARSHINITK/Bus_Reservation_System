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
    // Perform logout actions (e.g., clearing tokens or session)
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Bus Booking</a>
          <div className="navbar-nav ms-auto">
            <button className="nav-link btn btn-link text-white" onClick={handleBookingHistory}>Booking History</button>
            <button className="nav-link btn btn-link text-white" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      {/* Bus List Content */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Available Buses</h2>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Bus Name</th>
              <th>Total Seats</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.id}</td>
                <td>{bus.busName}</td>
                <td>{bus.totalSeats}</td>
                <td>{bus.source}</td>
                <td>{bus.destination}</td>
                <td>₹ {bus.cost}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
                </td>
              </tr>
            ))}
            {buses.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">No buses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusList;
