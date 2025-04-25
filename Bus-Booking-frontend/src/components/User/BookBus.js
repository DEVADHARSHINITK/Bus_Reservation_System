import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class BusBookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busId: '',
      travelDate: '',
      numberOfSeats: 1,
      userEmail: '',
      passengers: [{ name: '', gender: '' }],
      redirectToConfirmation: false,
      bookingDetails: null,
    };
  }

  handleSeatChange = (e) => {
    const seats = e.target.value;
    this.setState({
      numberOfSeats: seats,
      passengers: Array.from({ length: seats }, () => ({ name: '', gender: '' })),
    });
  };

  handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...this.state.passengers];
    updatedPassengers[index][field] = value;
    this.setState({ passengers: updatedPassengers });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const bookingRequest = {
      busId: this.state.busId,
      travelDate: this.state.travelDate,
      numberOfSeats: this.state.numberOfSeats,
      userEmail: this.state.userEmail,
      passengers: this.state.passengers,
    };

    fetch('http://localhost:8080/api/bookings/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingRequest),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          bookingDetails: data,
          redirectToConfirmation: true,
        });
      })
      .catch((error) => {
        console.error('Error booking bus:', error);
      });
  };

  handleLogout = () => {
    this.setState({ redirectToConfirmation: true });
  };

  render() {
    if (this.state.redirectToConfirmation) {
      return <Navigate to="/ConfirmationPage" state={{ bookingDetails: this.state.bookingDetails }} />;
    }

    return (
      <div>
        {/* Navbar with black background and right-aligned items */}
        <div className="navbar">
          <button className="nav-button" onClick={() => this.props.history.push('/BusList')}>Bus List</button>
          <button className="nav-button" onClick={() => this.props.history.push('/BookingHistory')}>Booking History</button>
          <button className="nav-button" onClick={this.handleLogout}>Logout</button>
        </div>

        {/* Main Booking Form */}
        <div className="booking-form-container">
          <h2>Book Your Bus</h2>
          <form onSubmit={this.handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="busId">Bus ID:</label>
              <input
                type="number"
                id="busId"
                value={this.state.busId}
                onChange={(e) => this.setState({ busId: e.target.value })}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="travelDate">Travel Date:</label>
              <input
                type="date"
                id="travelDate"
                value={this.state.travelDate}
                onChange={(e) => this.setState({ travelDate: e.target.value })}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfSeats">Number of Seats:</label>
              <input
                type="number"
                id="numberOfSeats"
                value={this.state.numberOfSeats}
                onChange={this.handleSeatChange}
                min={1}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">Your Email:</label>
              <input
                type="email"
                id="userEmail"
                value={this.state.userEmail}
                onChange={(e) => this.setState({ userEmail: e.target.value })}
                required
                className="input-field"
              />
            </div>

            {/* Dynamically display passenger fields */}
            {this.state.passengers.map((passenger, index) => (
              <div key={index} className="passenger-group">
                <h3>Passenger {index + 1}</h3>
                <div className="form-group">
                  <label htmlFor={`passengerName-${index}`}>Name:</label>
                  <input
                    type="text"
                    id={`passengerName-${index}`}
                    value={passenger.name}
                    onChange={(e) => this.handlePassengerChange(index, 'name', e.target.value)}
                    required
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`passengerGender-${index}`}>Gender:</label>
                  <select
                    id={`passengerGender-${index}`}
                    value={passenger.gender}
                    onChange={(e) => this.handlePassengerChange(index, 'gender', e.target.value)}
                    required
                    className="input-field"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            ))}
            <button type="submit" className="submit-btn">Book Now</button>
          </form>
        </div>

        <style jsx>{`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }

          .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background-color: black;
            padding: 10px 20px;
            z-index: 1000;
            display: flex;
            justify-content: flex-end; /* Align items to the right */
          }

          .navbar button {
            padding: 10px 20px;
            background-color: #333;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-left: 10px; /* Add spacing between buttons */
          }

          .navbar button:hover {
            background-color: #555;
          }

          .booking-form-container {
            margin-top: 80px; /* To avoid overlap with navbar */
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h2 {
            text-align: center;
            color: #333;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          .form-group {
            margin-bottom: 15px;
          }

          .label {
            font-weight: bold;
          }

          .input-field {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
            box-sizing: border-box;
          }

          input[type="number"], input[type="email"], input[type="date"], select {
            font-size: 16px;
          }

          button.submit-btn {
            padding: 12px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            cursor: pointer;
            margin-top: 20px;
          }

          button.submit-btn:hover {
            background-color: #218838;
          }

          .passenger-group {
            margin-bottom: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 5px;
          }
        `}</style>
      </div>
    );
  }
}

export default BusBookingForm;
