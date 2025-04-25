import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/api";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    contact: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form);
      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">Bus Booking</span>
        <div className="ms-auto">
          <Link className="btn btn-outline-light me-2" to="/">Home</Link>
          <Link className="btn btn-outline-light" to="/login">Login</Link>
        </div>
      </nav>

      {/* SignUp Form Container */}
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="card shadow p-4" style={{ maxWidth: "700px", width: "100%" }}>
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-3">
              <label>Gender</label>
              <select
                name="gender"
                className="form-select"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Contact</label>
              <input
                name="contact"
                className="form-control"
                value={form.contact}
                onChange={handleChange}
                required
                placeholder="Enter contact number"
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
              />
            </div>

            <div className="mb-3">
              <label>Enter Role</label>
              <input
                name="role"
                type="text"
                className="form-control"
                value={form.role}
                onChange={handleChange}
                required
                placeholder="Enter USER or ADMIN"
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
