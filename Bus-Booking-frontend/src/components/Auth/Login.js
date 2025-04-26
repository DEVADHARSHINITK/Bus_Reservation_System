import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus, FaHome } from "react-icons/fa";

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
  
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("user", JSON.stringify(user));
  
      console.log(user);
  
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
          <Link to="/" className="navbar-brand fs-3" style={{ color: "#fff" }}>
          🚌 TRIP TREK
          </Link>

          <div className="d-flex align-items-center gap-4">
            <Link to="/SignUp" className="nav-link text-white fs-4" title="Signup">
              <FaUserPlus />
            </Link>
            <Link to="/" className="nav-link text-white fs-4" title="Home">
              <FaHome />
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form Container */}
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
            maxWidth: "600px", // 🛠 Form made bigger
            width: "100%",
            backgroundColor: "transparent",
            borderRadius: "10px",
            padding: "40px", // 🛠 More padding
            color: "#fff",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#fff", fontSize: "2.5rem" }}>
            Login
          </h2>

          {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label style={{ color: "#fff", marginBottom: "10px", display: "block" }}>Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="" // 🛠 Removed placeholder
                style={{
                  backgroundColor: "transparent", // 🛠 Transparent input
                  color: "#fff",
                  border: "1px solid #ccc", // 🛠 Only outline
                  borderRadius: "5px",
                  padding: "12px",
                }}
              />
            </div>

            <div className="mb-4">
              <label style={{ color: "#fff", marginBottom: "10px", display: "block" }}>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="" // 🛠 Removed placeholder
                style={{
                  backgroundColor: "transparent", // 🛠 Transparent input
                  color: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "12px",
                }}
              />
            </div>

            <button type="submit" className="btn btn-success w-100 mt-4" style={{ padding: "12px", fontSize: "1.2rem" }}>
              Login
            </button>
          </form>

          <p className="text-center mt-4" style={{ color: "#fff", fontSize: "1rem" }}>
            Don’t have an account? <Link to="/signup" style={{ color: "#f45d48" }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
