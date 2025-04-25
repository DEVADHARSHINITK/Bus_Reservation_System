import React, { useState } from 'react';

const BookingHistoryPage = () => {
  const [email, setEmail] = useState('');
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    // Fetch booking history based on the user's email
    fetch(`http://localhost:8080/api/bookings/history?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setBookingHistory(data);
        setIsEmailSubmitted(true);
      })
      .catch((error) => {
        console.error('Error fetching booking history:', error);
      });
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <button className="nav-button">Bus List</button>
        <button className="nav-button">Logout</button>
      </div>

      {/* Body content */}
      <div className="booking-history-container">
        {!isEmailSubmitted ? (
          <div className="email-input">
            <h2>Enter your email to view booking history</h2>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div className="booking-history-table">
            <h2>Your Booking History</h2>
            <table>
              <thead>
                <tr>
                  <th>Bus Name</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Cost</th>
                  <th>Travel Date</th>
                  <th>Seats</th>
                  <th>Passengers</th>
                </tr>
              </thead>
              <tbody>
                {bookingHistory.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.busName}</td>
                    <td>{booking.source}</td>
                    <td>{booking.destination}</td>
                    <td>{booking.cost}</td>
                    <td>{booking.travelDate}</td>
                    <td>{booking.numberOfSeats}</td>
                    <td>
                      {booking.passengers.map((passenger, index) => (
                        <div key={index}>{passenger.name} ({passenger.gender})</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
        }

        .navbar {
          background-color: black;
          color: white;
          padding: 10px 20px;
          display: flex;
          justify-content: flex-end;
        }

        .nav-button {
          margin-left: 20px;
          padding: 10px;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .nav-button:hover {
          background-color: #555;
        }

        .booking-history-container {
          margin-top: 80px;
          padding: 20px;
          max-width: 800px;
          margin: 50px auto;
        }

        .email-input {
          text-align: center;
        }

        .email-input input {
          padding: 10px;
          font-size: 16px;
          margin-right: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .email-input button {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .email-input button:hover {
          background-color: #218838;
        }

        .booking-history-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .booking-history-table table th,
        .booking-history-table table td {
          padding: 12px;
          text-align: left;
          border: 1px solid #ddd;
        }

        .booking-history-table table th {
          background-color: #f4f4f4;
        }
      `}</style>
    </div>
  );
};

export default BookingHistoryPage;
