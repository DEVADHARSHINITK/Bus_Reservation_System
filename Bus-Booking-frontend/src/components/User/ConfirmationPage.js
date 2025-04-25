import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }

  const handleLogout = () => {
    // Clear any user session data or tokens if needed
    // For example: localStorage.removeItem('user'); or sessionStorage.removeItem('user');
    navigate('/');  // Redirect to the BusList page (or home page)
  };

  return (
    <div>
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
          <p><strong>Travel Date:</strong> {bookingDetails.travelDate}</p>
          <p><strong>Number of Seats:</strong> {bookingDetails.numberOfSeats}</p>
          <p><strong>User Email:</strong> {bookingDetails.userEmail}</p>
          
          <h3>Passenger Details:</h3>
          {bookingDetails.passengers.map((passenger, index) => (
            <div key={index}>
              <p><strong>Passenger {index + 1}:</strong></p>
              <p>Name: {passenger.name}</p>
              <p>Gender: {passenger.gender}</p>
            </div>
          ))}
        </div>

        <h2>Happy Journey!</h2>
      </div>

      {/* Styles */}
      <style>
        {`
          .navbar {
            display: flex;
            justify-content: space-between;
            background-color: #4CAF50;
            padding: 10px 20px;
            color: white;
            font-size: 18px;
          }

          .nav-button {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
          }

          .nav-button:hover {
            color: #ddd;
          }

          .confirmation-page {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
          }

          .confirmation-details {
            text-align: left;
            margin: 20px 0;
          }

          h2 {
            font-size: 24px;
            color: #4CAF50;
          }

          p {
            font-size: 16px;
            color: #333;
          }

          .confirmation-details p {
            margin: 5px 0;
          }

          h3 {
            font-size: 20px;
            margin-top: 20px;
            color: #4CAF50;
          }
        `}
      </style>
    </div>
  );
};

export default ConfirmationPage;
