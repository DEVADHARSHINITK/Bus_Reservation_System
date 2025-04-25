import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", form);
      const user = res.data;
  
      // Store user info in localStorage
      localStorage.setItem("userEmail", user.email); // Save only the email here
      localStorage.setItem("user", JSON.stringify(user)); // You can also save the entire user object if needed
  
      console.log(user);  // Check if user data is correct
  
      // ✅ Redirect based on role
      if (user.role === "ADMIN") {
        navigate("/Dashboard");
      } else if (user.role === "USER") {
        navigate("/BusList");
      } else {
        setError("Unknown role. Please contact admin.");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">Bus Booking</span>
        <div className="ms-auto">
          <Link className="btn btn-outline-light me-2" to="/">Home</Link>
          <Link className="btn btn-outline-light" to="/SignUp">Sign Up</Link>
        </div>
      </nav>

      {/* Login Form Container */}
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="card shadow p-4" style={{ maxWidth: "700px", width: "100%" }}>
          <h2 className="text-center mb-4">Login</h2>

          {error && (
            <div className="alert alert-danger py-2 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
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
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <p className="text-center mt-3">
            Don’t have an account? <Link to="/SignUp">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
