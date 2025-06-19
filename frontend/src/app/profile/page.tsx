'use client';

import { useState } from 'react';
import Sidebar from '../dashboard/sidebar';
import { FaSearch, FaUserEdit } from 'react-icons/fa';
import { FiMail, FiCalendar, FiUserCheck } from 'react-icons/fi';

const UpdateCustomer = () => {
  const [cID, setCID] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    DOB: '',
    A_C_Type: '',
  });
  const [isFound, setIsFound] = useState(false);
  const [message, setMessage] = useState('');

  const handleFetch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/customer/${cID}`);
      if (!res.ok) throw new Error('Customer not found');
      const data = await res.json();
      setFormData({
        Name: data.Name,
        Email: data.Email,
        DOB: data.DOB.slice(0, 10),
        A_C_Type: data.A_C_Type,
      });
      setIsFound(true);
      setMessage('');
    } catch (err) {
      setMessage('❌ Customer not found');
      setIsFound(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/customer/${cID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(`✅ ${data.message}`);
    } catch (err) {
      setMessage('❌ Error updating customer');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <FaUserEdit className="text-3xl text-green-600" />
            <h2 className="text-3xl font-bold text-green-700">
              Update Your Customer Details
            </h2>
          </div>

          {/* Customer ID Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">
              Enter Your Customer ID (C_ID)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={cID}
                onChange={(e) => setCID(e.target.value)}
                placeholder="e.g. 101"
                className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              <button
                onClick={handleFetch}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition shadow-md"
              >
                <FaSearch />
                Fetch
              </button>
            </div>
          </div>

          {/* Update Form */}
          {isFound && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-gray-200 pt-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
                  <FiUserCheck /> Full Name
                </label>
                <input
                  type="text"
                  value={formData.Name}
                  onChange={(e) =>
                    setFormData({ ...formData, Name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
                  <FiMail /> Email
                </label>
                <input
                  type="email"
                  value={formData.Email}
                  onChange={(e) =>
                    setFormData({ ...formData, Email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
                  <FiCalendar /> Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.DOB}
                  onChange={(e) =>
                    setFormData({ ...formData, DOB: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
                  Account Type
                </label>
                <select
                  value={formData.A_C_Type}
                  onChange={(e) =>
                    setFormData({ ...formData, A_C_Type: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="md:col-span-2 text-center mt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded shadow-md transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Message Section */}
          {message && (
            <div
              className={`mt-6 p-4 rounded text-center font-semibold transition ${
                message.startsWith('✅')
                  ? 'text-green-800 bg-green-100 border border-green-400'
                  : 'text-red-800 bg-red-100 border border-red-400'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
