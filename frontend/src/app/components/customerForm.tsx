"use client";
import { useState } from "react";
import axios from "axios";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    a_c_type: "Active",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/customers", formData);
      alert("Customer added successfully!");
    } catch (error) {
      alert("Error adding customer.");
    }
  };

  return (
    <form className="p-4 border rounded-lg" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />
      <select
        name="a_c_type"
        value={formData.a_c_type}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md"
      >
        Add Customer
      </button>
    </form>
  );
};

export default CustomerForm;
