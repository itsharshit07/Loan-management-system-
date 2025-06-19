'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Sidebar from '../dashboard/sidebar';
import { FaUserPlus, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    C_ID: '',
    type: '',
    status: 'Active',
    opening_date: '',
    balance: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/accounts', formData);
      setSuccessMessage('✅ Account created successfully! A_ID: ' + res.data.A_ID);
      setError('');
    } catch (err: any) {
      setError(err.response?.data || '❌ Error creating account');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      {/* Sidebar stays fixed height */}
      <Sidebar />

      {/* Right panel: scrolls if content overflows */}
      <div className="flex-1 flex justify-center items-start overflow-y-auto py-10 px-4 sm:px-8">
        <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-600 flex justify-center items-center gap-2">
              <FaUserPlus className="text-green-700" />
              Create New Account
            </h2>
            <p className="text-gray-500 text-sm mt-2">Fill in the details to create an account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer ID */}
            <div>
              <label className="block mb-1 font-medium">Customer ID (C_ID)</label>
              <input
                type="number"
                name="C_ID"
                placeholder="Enter customer ID"
                value={formData.C_ID}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Account Type */}
            <div>
              <label className="block mb-1 font-medium">Account Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select account type</option>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 font-medium">Account Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Opening Date */}
            <div>
              <label className="block mb-1 font-medium flex items-center gap-1">
                <FaCalendarAlt className="text-green-500" />
                Opening Date
              </label>
              <input
                type="date"
                name="opening_date"
                value={formData.opening_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Balance */}
            <div>
              <label className="block mb-1 font-medium flex items-center gap-1">
                <FaMoneyBillWave className="text-green-500" />
                Initial Balance
              </label>
              <input
                type="number"
                name="balance"
                placeholder="Enter initial balance"
                value={formData.balance}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition duration-200"
            >
              Create Account
            </button>
          </form>

          {/* Messages */}
          {successMessage && (
            <div className="mt-6 text-green-700 font-medium text-center flex items-center justify-center gap-2">
              <FaCheckCircle /> {successMessage}
            </div>
          )}
          {error && (
            <div className="mt-6 text-red-600 font-medium text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
