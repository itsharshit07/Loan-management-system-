'use client';

import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../dashboard/sidebar';

export default function ApplyLoanPage() {
  const [form, setForm] = useState({
    C_ID: '',
    Loan_Type: '',
    Amount: '',
    Interest_Rate: '',
    Term_Years: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [totalRepayment, setTotalRepayment] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setTotalRepayment(null);

    try {
      await axios.post('http://localhost:5000/api/loans/apply', form);
      setSuccess('Loan application submitted successfully!');

      // Simple Interest Calculation
      const P = parseFloat(form.Amount);
      const R = parseFloat(form.Interest_Rate);
      const T = parseFloat(form.Term_Years);

      const total = P + (P * R * T) / 100;
      setTotalRepayment(total);

      setForm({
        C_ID: '',
        Loan_Type: '',
        Amount: '',
        Interest_Rate: '',
        Term_Years: ''
      });
    } catch (err) {
      console.error(err);
      setError('Failed to submit loan application.');
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 px-6 pt-24 pb-10">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
            Apply for a Loan
          </h1>

          {success && <p className="text-green-600 text-center mb-4">{success}</p>}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              name="C_ID"
              placeholder="Customer ID"
              value={form.C_ID}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />

            <select
              name="Loan_Type"
              value={form.Loan_Type}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Loan Type</option>
              <option value="Home">Home</option>
              <option value="Car">Car</option>
              <option value="Education">Education</option>
              <option value="Personal">Personal</option>
            </select>

            <input
              type="number"
              name="Amount"
              placeholder="Amount"
              value={form.Amount}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="number"
              step="0.01"
              name="Interest_Rate"
              placeholder="Interest Rate (%)"
              value={form.Interest_Rate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="number"
              name="Term_Years"
              placeholder="Loan Term (Years)"
              value={form.Term_Years}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />

            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Submit Application
            </button>
          </form>

          {totalRepayment !== null && (
            <p className="mt-4 text-center text-lg text-green-700 font-semibold">
              Total repayment : ₹{totalRepayment.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
