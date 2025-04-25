import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api"; // Import your API handling

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users"); // Replace with the actual endpoint for users
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await API.delete(`/users/${userId}`); // Adjust endpoint for delete user
        fetchUsers(); // Refresh the list after deletion
      } catch (err) {
        setError("Failed to delete user.");
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleLogout = () => {
    // Clear local storage and navigate to the login page
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">Bus Booking</span>
        <div className="ms-auto">
          <button className="btn btn-outline-light me-2" onClick={() => navigate("/ManageBuses")}>Manage Buses</button>
          <button className="btn btn-outline-light me-2" onClick={() => navigate("/AllBookings")}>All Bookings</button>
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Users Table */}
      <div className="container my-4">
        <h2 className="text-center mb-4">Users List</h2>
        
        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.gender}</td>
                  <td>{user.contact}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
