"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../lib/firebase"; // adjust path if needed

const auth = getAuth(app);

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    a_c_type: "Active",
  });

  const [customerId, setCustomerId] = useState<number | null>(null);
  const [emailUsed, setEmailUsed] = useState<boolean>(false);

  // Auto-fill email from Firebase
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user && user.email) {
      const email = user.email;
      setFormData((prev) => ({ ...prev, email }));
      checkIfEmailUsed(email);
    } else {
      console.warn("User email is null or undefined.");
    }
  });
  return () => unsubscribe();
}, []);


  // Check if email is already used
  const checkIfEmailUsed = async (email: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/customers/check-email?email=${email}`
      );
      setEmailUsed(response.data.exists);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailUsed) {
      alert("❌ This email has already been used to add a customer.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/customers", formData);
      const newCustomerId = response.data.C_ID;
      setCustomerId(newCustomerId);
      setEmailUsed(true);
      alert(`✅ Customer added! Your Customer ID: ${newCustomerId}`);
      setFormData({
        name: "",
        email: formData.email, // retain email
        dob: "",
        a_c_type: "Active",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Error adding customer.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          New Customer
        </h2>

        {customerId && (
          <div className="mb-4 text-center text-green-700 font-semibold">
            🎉 Your Customer ID: <span className="font-bold">{customerId}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={!!customerId}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 cursor-not-allowed"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={!!customerId}
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Account Type
            </label>
            <select
              name="a_c_type"
              value={formData.a_c_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!!customerId}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          {!emailUsed && (
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Add Customer
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
