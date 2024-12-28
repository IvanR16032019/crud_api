import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../hojas-de-estilo/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  const API_URL = "https://jsonplaceholder.typicode.com/users";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch users", "error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveUser = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.website) {
      Swal.fire("Error", "All fields must be filled", "error");
      return;
    }

    if (editingUserId) {
      try {
        const response = await axios.put(`${API_URL}/${editingUserId}`, formData);
        setUsers(
          users.map((user) =>
            user.id === editingUserId ? { ...user, ...response.data } : user
          )
        );
        setEditingUserId(null);
        setFormData({ name: "", email: "", phone: "", website: "" });
        Swal.fire("Success", "User updated successfully", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to update user", "error");
      }
    } else {
      try {
        const response = await axios.post(API_URL, formData);
        setUsers([...users, response.data]);
        setFormData({ name: "", email: "", phone: "", website: "" });
        Swal.fire("Success", "User added successfully", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to add user", "error");
      }
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Deleted", "User deleted successfully", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  const editUser = (user) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
  };

  const handleClear = () => {
    setFormData({ name: "", email: "", phone: "", website: "" });
    setEditingUserId(null);  // Ensure that when clearing, the form resets to "Add User"
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Users Management</h1>
      <div className="card p-4 mb-4 shadow">
        <h4 className="mb-3">{editingUserId ? "Edit User" : "Add User"}</h4>
        <div className="form-group mb-3 d-flex">
          <div className="input-field me-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-field me-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group mb-3 d-flex">
          <div className="input-field me-3">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              name="website"
              id="website"
              className="form-control"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={saveUser}>
            {editingUserId ? "Update User" : "Add User"}
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            Empty
          </button>
        </div>
      </div>
      <h4 className="mt-4">Users List</h4>
      <table className="table table-hover table-striped shadow">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => deleteUser(user.id)}
                >
                  🗑️
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => editUser(user)}
                >
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
