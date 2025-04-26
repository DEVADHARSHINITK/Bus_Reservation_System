import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/api";
import { FaSignInAlt, FaHome } from "react-icons/fa";

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
          <span className="navbar-brand fs-3">TRIP TREK</span>

          <div className="d-flex align-items-center gap-4">
            <Link to="/login" className="nav-link text-white fs-4" title="Login">
              <FaSignInAlt />
            </Link>
            <Link to="/" className="nav-link text-white fs-4" title="Home">
              <FaHome />
            </Link>
          </div>
        </div>
      </nav>

      {/* SignUp Form */}
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          paddingTop: "100px",
          paddingBottom: "50px",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#fff" }}>
            Sign Up
          </h2>

          {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label style={{ color: "#fff" }}>Name</label>
              <input
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "1px solid #fff",
                }}
              />
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label style={{ color: "#fff" }}>Gender</label>
              <div className="d-flex gap-3">
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={form.gender === "MALE"}
                    onChange={handleChange}
                    style={{ accentColor: "white" }}
                  />
                  <label className="ms-2" style={{ color: "#fff" }}>Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={form.gender === "FEMALE"}
                    onChange={handleChange}
                    style={{ accentColor: "white" }}
                  />
                  <label className="ms-2" style={{ color: "#fff" }}>Female</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="OTHER"
                    checked={form.gender === "OTHER"}
                    onChange={handleChange}
                    style={{ accentColor: "white" }}
                  />
                  <label className="ms-2" style={{ color: "#fff" }}>Other</label>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-3">
              <label style={{ color: "#fff" }}>Contact</label>
              <input
                name="contact"
                className="form-control"
                value={form.contact}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "1px solid #fff",
                }}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label style={{ color: "#fff" }}>Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "1px solid #fff",
                }}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label style={{ color: "#fff" }}>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "1px solid #fff",
                }}
              />
            </div>

            {/* Role */}
            <div className="mb-3">
              <label style={{ color: "#fff" }}>Role</label>
              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "1px solid #fff",
                }}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-3" style={{ color: "#fff" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#fff", textDecoration: "underline" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
