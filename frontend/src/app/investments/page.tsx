'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../dashboard/sidebar';

type Investment = {
  I_ID: number;
  C_ID: number;
  customerName: string;
  Type: string;
  Purchase_Price: number;
  Current_Market_Value: number;
};

export default function InvestmentPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get<Investment[]>('http://localhost:5000/api/investments')
      .then((res) => setInvestments(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load investments.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8 text-center">Loading investments…</p>;
  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;

  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar Section */}
    <Sidebar />
      <div className="flex-1 px-6 pt-24 pb-10">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-6">
            Investment Portfolio
          </h1>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-100 text-green-900 text-sm uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Investment Type</th>
                  <th className="px-4 py-3 text-right">Purchase Price</th>
                  <th className="px-4 py-3 text-right">Current Value</th>
                  <th className="px-4 py-3 text-right">Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv) => {
                  const gain = inv.Current_Market_Value - inv.Purchase_Price;
                  const isGain = gain >= 0;

                  return (
                    <tr
                      key={inv.I_ID}
                      className="border-b hover:bg-green-50 transition-all"
                    >
                      <td className="px-4 py-3 font-medium">{inv.customerName || '—'}</td>
                      <td className="px-4 py-3">{inv.Type}</td>
                      <td className="px-4 py-3 text-right">₹{inv.Purchase_Price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">₹{inv.Current_Market_Value.toLocaleString()}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${isGain ? 'text-green-600' : 'text-red-600'}`}>
                        {isGain ? '+' : '-'}₹{Math.abs(gain).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}

                {investments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No investments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
