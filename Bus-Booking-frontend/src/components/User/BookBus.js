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
      redirectTo: null,
      bookingDetails: null,
    };
  }

  handleSeatChange = (e) => {
    const seats = parseInt(e.target.value);
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
          redirectTo: '/ConfirmationPage',
        });
      })
      .catch((error) => {
        console.error('Error booking bus:', error);
      });
  };

  navigateTo = (path) => {
    this.setState({ redirectTo: path });
  };

  render() {
    if (this.state.redirectTo) {
      return <Navigate to={this.state.redirectTo} state={{ bookingDetails: this.state.bookingDetails }} />;
    }

    return (
      <div className="container">
        {/* Navbar */}
        <div className="navbar">
          <button className="nav-button" onClick={() => this.navigateTo('/BusList')}>Bus List</button>
          <button className="nav-button" onClick={() => this.navigateTo('/BookingHistory')}>Booking History</button>
          <button className="nav-button" onClick={() => this.navigateTo('/')}>Logout</button>
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

            {/* Passenger Details */}
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

        {/* Styles */}
        <style jsx="true">{`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #222;
            color: white;
          }

          .container {
            min-height: 100vh;
            background-color: #222;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 70px; /* for navbar space */
          }

          .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background-color: black;
            padding: 10px 20px;
            display: flex;
            justify-content: flex-end;
            z-index: 1000;
          }

          .nav-button {
            padding: 10px 20px;
            background-color: #333;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            margin-left: 10px;
            cursor: pointer;
          }

          .nav-button:hover {
            background-color: #555;
          }

          .booking-form-container {
            width: 100%;
            max-width: 800px;
            margin-top: 30px;
            padding: 20px;
            background-color: transparent;
            border-radius: 10px;
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
          }

          .booking-form {
            display: flex;
            flex-direction: column;
          }

          .form-group {
            margin-bottom: 15px;
          }

          .input-field {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            background-color: transparent;
            color: white;
            border: 1px solid white;
            border-radius: 5px;
          }

           select.input-field {
    background-color: transparent;
    color: white;
    appearance: none; /* optional: remove default browser style */
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  option {
    background-color: #333;
    color: white;
  }

          .submit-btn {
            margin-top: 20px;
            padding: 12px;
            font-size: 18px;
            background-color: #28a745;
            border: none;
            border-radius: 5px;
            color: white;
            cursor: pointer;
          }

          .submit-btn:hover {
            background-color: #218838;
          }

          .passenger-group {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #444;
            border-radius: 8px;
          }
        `}</style>
      </div>
    );
  }
}

export default BusBookingForm;
