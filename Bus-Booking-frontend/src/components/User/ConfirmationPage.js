import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }

  // Debugging - Log bookingDetails to check the structure
  console.log(bookingDetails); // <-- Add this for debugging

  const handleLogout = () => {
    navigate('/');  // Redirect to Home
  };

  return (
    <div className="confirmation-page-container">
      {/* Navbar */}
      <div className="navbar">
        <button className="nav-button" onClick={() => navigate('/BusList')}>Bus List</button>
        <button className="nav-button" onClick={handleLogout}>Logout</button>
      </div>

      {/* Booking Confirmation Details */}
      <div className="confirmation-page">
        <h2>Booking Confirmation</h2>
        <p>Thank you for your booking! Here are your booking details:</p>

        <div className="confirmation-details">
          <h3>Bus Details:</h3>
          <p><strong>Bus ID:</strong> {bookingDetails.busId}</p>
          <p><strong>Bus Name:</strong> {bookingDetails.busName}</p> 
          <p><strong>Source:</strong> {bookingDetails.source}</p> 
          <p><strong>Destination:</strong> {bookingDetails.destination}</p> 
          <p><strong>Travel Date:</strong> {bookingDetails.travelDate}</p>
          <p><strong>Number of Seats:</strong> {bookingDetails.numberOfSeats}</p>
          <p><strong>User Email:</strong> {bookingDetails.userEmail}</p>
          <p><strong>Total Cost:</strong> ₹{bookingDetails.cost}</p>

          <h3>Passenger Details:</h3>
          {bookingDetails.passengers.map((passenger, index) => (
            <div key={index}>
              <p><strong>Passenger {index + 1}:</strong></p>
              <p>Name: {passenger.name}</p>
              <p>Gender: {passenger.gender}</p>
            </div>
          ))}
        </div>

        <h2>🎉 Happy Journey! 🎉</h2>
      </div>

      {/* Styles */}
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
          }

          .confirmation-page-container {
            background-color: black;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background-color: #111;
            padding: 10px 20px;
            display: flex;
            justify-content: flex-end;
            z-index: 1000;
          }

          .nav-button {
            background: none;
            border: 1px solid white;
            color: white;
            font-size: 16px;
            margin-left: 10px;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
          }

          .nav-button:hover {
            background-color: #333;
          }

          .confirmation-page {
            background-color: #222;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px #444;
            max-width: 600px;
            width: 90%;
            margin-top: 80px; /* to avoid navbar overlap */
            text-align: center;
          }

          h2 {
            font-size: 28px;
            margin-bottom: 20px;
          }

          .confirmation-details {
            text-align: left;
            margin-top: 20px;
          }

          .confirmation-details p {
            font-size: 16px;
            margin: 5px 0;
          }

          h3 {
            font-size: 22px;
            margin-top: 20px;
            color: #00ffcc;
          }
        `}
      </style>
    </div>
  );
};

export default ConfirmationPage;
