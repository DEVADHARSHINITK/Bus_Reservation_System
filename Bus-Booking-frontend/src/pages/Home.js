import React from "react";
import { Link } from "react-router-dom";
import busImage from "../Assets/bus.jpeg";

const Home = () => {
  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">Bus Booking</span>
        <div className="ms-auto">
          <Link className="btn btn-outline-light me-2" to="/">Home</Link>
          <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
          <Link className="btn btn-outline-light" to="/SignUp">Sign Up</Link>
        </div>
      </nav>

      {/* Body (takes full remaining height) */}
      <div
        className="container-fluid d-flex flex-column align-items-center justify-content-center"
        style={{ flex: 1 }}
      >
        <h1 className="display-3 fw-bold text-primary mb-4 text-center">
          Welcome to the Bus Booking System
        </h1>

        <img
          src={busImage}
          alt="Bus"
          style={{
            maxHeight: "500px",
            width: "80%",
            objectFit: "contain",
            borderRadius: "20px",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)"
          }}
        />

        <p className="mt-4 fs-5 text-muted text-center">
          Book your journey with ease and comfort.
        </p>
      </div>
    </div>
  );
};

export default Home;
