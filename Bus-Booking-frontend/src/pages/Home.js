import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import illustration from "../Assets/bus.jpeg"; // Correct image path

const Home = () => {
  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "100vh",
        overflowY: "auto",
        padding: "0 20px",
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
          {/* Left side: Brand */}
          <span className="navbar-brand fs-3"> 🚌 TRIP TREK</span>

          {/* Right side: Links + Icons */}
          <div className="d-flex align-items-center gap-4">
            <a href="#home" className="nav-link text-white">HOME</a>
            <a href="#about" className="nav-link text-white">ABOUT</a>
            <a href="#features" className="nav-link text-white">FEATURES</a>
            <a href="#contact" className="nav-link text-white">CONTACT</a>

            {/* Icons */}
            <Link to="/Login" className="nav-link text-white fs-4" title="Login">
              <FaSignInAlt />
            </Link>
            <Link to="/SignUp" className="nav-link text-white fs-4" title="Sign Up">
              <FaUserPlus />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="d-flex flex-column flex-lg-row align-items-center justify-content-between px-5 py-5"
        style={{
          minHeight: "100vh",
          paddingTop: "70px",
          marginRight: "20px",
        }}
      >
        <div style={{ maxWidth: "50%" }}>
          <h1 className="display-4 fw-bold text-white">
            Book Your Bus <span style={{ color: "#f45d48" }}>Tickets</span> with Ease
          </h1>
          <p className="lead mt-4 mb-4">
            Travel smarter with our seamless online bus booking platform—convenient, quick, and reliable.
          </p>
          <div>
            <a
              href="#features"
              className="btn me-3 px-4 py-2"
              style={{
                backgroundColor: "#f45d48",
                borderRadius: "25px",
                color: "#fff",
              }}
            >
              Explore Features
            </a>
            <Link
              to="/Login"
              className="btn btn-outline-light px-4 py-2"
              style={{ borderRadius: "25px" }}
            >
              Start Booking
            </Link>
          </div>
        </div>

        <div>
          <img
            src={illustration}
            alt="Bus Booking Illustration"
            style={{
              height: "60vh",
              width: "auto",
              borderRadius: "20px",
              boxShadow: "0 0 40px rgba(0, 87, 146, 0.3)",
              marginTop: "50px",
            }}
          />
        </div>
      </section>

      {/* About Section */}
      <section
  id="about"
  className="py-5 text-center"
  style={{
    backgroundColor: "#1a1a1a",
    color: "#fff",
    margin: "60px 0",
    paddingLeft: "20px",
    paddingRight: "20px",
  }}
>
  <h2 className="mb-4" style={{ color: "#f45d48" }}>About Our System</h2>
  <div
    className="fs-5 text-center"
    style={{
      maxWidth: "800px", // Adjust the width to prevent the text from stretching too wide
      margin: "0 auto", // Center the content horizontally
      lineHeight: "1.9",
    }}
  >
    <ul className="list-unstyled">
      <li>🌍 Find and book intercity buses with real-time availability.</li>
      <li>📱 User-friendly interface for travelers to book tickets easily.</li>
      <li>👥 Multi-passenger booking with individual passenger details.</li>
      <li>🛣️ Smart scheduling to ensure timely bus departures.</li>
      <li>📲 Digital ticketing for a paperless, eco-friendly experience.</li>
      <li>🚦 Admin dashboard for bus, booking, and user management.</li>
      <li>📊 Automated seat tracking and revenue calculation.</li>
      <li>📅 View past and upcoming bookings at your convenience.</li>
    </ul>
  </div>
</section>


      {/* Features Section (Improved with boxes) */}
      <section
  id="features"
  className="py-5 px-5"
  style={{
    backgroundColor: "#2d2d2d",
    color: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  }}
>
  <h2 className="mb-5 text-center" style={{ color: "#f45d48" }}>Key Features</h2>
  <div className="row g-5">
    {/* Feature Cards */}
    {[
      "🔎 Search and book buses by route and date",
      "👥 Multi-passenger booking with individual details",
      "📄 Instant e-ticket confirmation",
      "📊 Admin dashboard for managing bookings, buses, users",
      "💰 Live revenue calculation and booking statistics",
      "📆 View past and upcoming booking history",
    ].map((feature, index) => (
      <div className="col-md-4" key={index}>
        <div
          className="p-5 d-flex align-items-center justify-content-center text-center"
          style={{
            backgroundColor: "#3a3a3a",
            borderRadius: "15px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
            height: "250px",
            fontSize: "1.3rem",
            fontWeight: "500",
          }}
        >
          {feature}
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Contact Section */}
      <section
  id="contact"
  className="py-5 px-5 text-center"
  style={{
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    margin: "60px auto",
    maxWidth: "700px",
  }}
>
  <h2 className="mb-4" style={{ color: "#f45d48" }}>Contact Us</h2>
  <p className="fs-5">
    If you have any questions or need support, feel free to contact us at:<br />
    <a
  href="mailto:support@busbooking.com"
  className="text-decoration-none"
  style={{ color: "#f45d48" }}
>
  support@triptrek.com
</a>
  </p>
</section>


      {/* Footer */}
      <footer
        className="text-center py-4"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          marginTop: "50px",
        }}
      >
        <p className="mb-0">&copy; 2025 TripTrek. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;  