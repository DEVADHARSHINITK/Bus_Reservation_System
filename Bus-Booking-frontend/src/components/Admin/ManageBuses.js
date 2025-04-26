import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({
    busName: "",
    totalSeats: "",
    source: "",
    destination: "",
    cost: "",
  });
  const [editBusId, setEditBusId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    busName: "",
    totalSeats: "",
    source: "",
    destination: "",
    cost: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/buses");
      setBuses(res.data);
    } catch (err) {
      console.error("Error fetching buses:", err);
    }
  };

  const handleEdit = (bus) => {
    setEditBusId(bus.id);
    setEditFormData({
      busName: bus.busName,
      totalSeats: bus.totalSeats,
      source: bus.source,
      destination: bus.destination,
      cost: bus.cost,
    });
  };

  const handleCancelEdit = () => {
    setEditBusId(null);
    setEditFormData({
      busName: "",
      totalSeats: "",
      source: "",
      destination: "",
      cost: "",
    });
  };

  const handleUpdateBus = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/buses/admin/${editBusId}`, editFormData);
      fetchBuses();
      handleCancelEdit();
    } catch (err) {
      console.error("Error updating bus:", err);
    }
  };

  const handleDelete = async (busId) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await axios.delete(`http://localhost:8080/api/buses/admin/${busId}`);
        fetchBuses();
      } catch (err) {
        console.error("Error deleting bus:", err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editBusId !== null) {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    } else {
      setNewBus({
        ...newBus,
        [name]: value,
      });
    }
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/buses/admin", newBus);
      fetchBuses();
      setNewBus({ busName: "", totalSeats: "", source: "", destination: "", cost: "" });
    } catch (err) {
      console.error("Error adding bus:", err);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <style>{`
        .admin-navbar {
          background-color: #212121;
          padding: 20px 30px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }

        .admin-navbar h2 {
          margin: 0;
        }

        .admin-links button {
          background-color: transparent;
          color: white;
          border: 1px solid #fff;
          margin-left: 15px;
          padding: 10px 18px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .admin-links button:hover {
          background-color: #444;
        }

        .table-container {
          padding: 30px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          border: 1px solid #ccc;
          text-align: center;
        }

        th {
          background-color: #f8f8f8;
        }

        .action-btns button {
          margin: 0 5px;
          padding: 6px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .edit-btn {
          background-color: #ffc107;
          color: black;
        }

        .delete-btn {
          background-color: #dc3545;
          color: white;
        }

        .form-container {
          margin-bottom: 30px;
        }

        .form-container input {
          padding: 8px;
          margin: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 200px;
          background-color: transparent;
          color: white;
        }

        .form-container button {
          padding: 8px 12px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Navbar height and style */
        .admin-navbar {
          min-height: 80px;
        }

        /* Add a small margin for the page content */
        .table-container {
          margin-top: 20px;
        }
      `}</style>

      {/* Navbar */}
      <nav className="admin-navbar">
        <h2>Trip Trek</h2>
        <div className="admin-links">
          <button onClick={() => navigate("/Dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/UsersList")}>UsersList</button>
          <button onClick={() => navigate("/AllBookings")}>All Bookings</button>
          <button onClick={() => navigate("/")}>Logout</button>
        </div>
      </nav>

      {/* New Bus Form */}
      <div className="form-container">
        <h3>Add New Bus</h3>
        <form onSubmit={handleAddBus}>
          <input type="text" name="busName" value={newBus.busName} onChange={handleInputChange} placeholder="Bus Name" required />
          <input type="number" name="totalSeats" value={newBus.totalSeats} onChange={handleInputChange} placeholder="Total Seats" required />
          <input type="text" name="source" value={newBus.source} onChange={handleInputChange} placeholder="Source" required />
          <input type="text" name="destination" value={newBus.destination} onChange={handleInputChange} placeholder="Destination" required />
          <input type="number" name="cost" value={newBus.cost} onChange={handleInputChange} placeholder="Cost" required />
          <button type="submit">Add Bus</button>
        </form>
      </div>

      {/* Bus Table */}
      <div className="table-container">
        <h3 className="mb-3">All Buses</h3>
        <table>
          <thead>
            <tr>
              <th>Bus Name</th>
              <th>Total Seats</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                {editBusId === bus.id ? (
                  <>
                    <td><input name="busName" value={editFormData.busName} onChange={handleInputChange} /></td>
                    <td><input name="totalSeats" type="number" value={editFormData.totalSeats} onChange={handleInputChange} /></td>
                    <td><input name="source" value={editFormData.source} onChange={handleInputChange} /></td>
                    <td><input name="destination" value={editFormData.destination} onChange={handleInputChange} /></td>
                    <td><input name="cost" type="number" value={editFormData.cost} onChange={handleInputChange} /></td>
                    <td>
                      <button onClick={handleUpdateBus}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{bus.busName}</td>
                    <td>{bus.totalSeats}</td>
                    <td>{bus.source}</td>
                    <td>{bus.destination}</td>
                    <td>₹{bus.cost}</td>
                    <td className="action-btns">
                      <button className="edit-btn" onClick={() => handleEdit(bus)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(bus.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBuses;
