import React, { useState } from 'react';

const BookingHistoryPage = () => {
  const [email, setEmail] = useState('');
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
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
    <div className="booking-history-page">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-left">
          <span className="brand-name">TRIP TREK</span>
        </div>
        <div className="nav-right">
          <button className="nav-button" onClick={() => window.location.href = '/BusList'}>
            Bus List
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        {!isEmailSubmitted ? (
          <div className="email-section">
            <h2>Enter Your Email</h2>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">View History</button>
            </form>
          </div>
        ) : (
          <div className="history-section">
            <h2>Your Booking History</h2>
            {bookingHistory.length > 0 ? (
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
                          <div key={index}>
                            {passenger.name} ({passenger.gender})
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No bookings found for this email.</p>
            )}
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .booking-history-page {
          min-height: 100vh;
          width: 100%;
          background-color: black;
          color: white;
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
        }

        .navbar {
          background-color: black;
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #333;
        }

        .nav-left .brand-name {
          font-size: 24px;
          font-weight: bold;
          color: white;
        }

        .nav-right {
          display: flex;
          align-items: center;
        }

        .nav-button {
          padding: 10px 20px;
          background-color: transparent;
          color: white;
          border: 2px solid white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s, color 0.3s;
        }

        .nav-button:hover {
          background-color: white;
          color: black;
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
        }

        .email-section, .history-section {
          width: 100%;
          max-width: 1000px;
          text-align: center;
        }

        .email-section h2, .history-section h2 {
          margin-bottom: 20px;
          font-size: 28px;
        }

        form {
          margin-top: 20px;
        }

        input[type="email"] {
          padding: 12px;
          width: 300px;
          border-radius: 8px;
          border: none;
          margin-right: 10px;
          font-size: 16px;
        }

        button[type="submit"] {
          padding: 12px 24px;
          background-color: #00b894;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button[type="submit"]:hover {
          background-color: #019875;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
        }

        th, td {
          border: 1px solid #444;
          padding: 12px 15px;
          text-align: center;
        }

        th {
          background-color: #222;
        }

        td {
          background-color: #111;
        }

        p {
          margin-top: 20px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default BookingHistoryPage;
