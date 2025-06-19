'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../dashboard/sidebar';

type Transaction = {
  T_ID: number;
  A_ID: number;
  C_ID: number;
  customerName: string;
  Type: 'Deposit' | 'Withdrawal';
  Date: string;
  Amount: number;
  Status: 'Successful' | 'Failed';
};

export default function TransactionsPage() {
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get<Transaction[]>('http://localhost:5000/api/transactions')
      .then((res) => setTxns(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load transactions.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8 text-center">Loading transactions…</p>;
  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 px-6 pt-24 pb-10">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-6">
            Transaction History
          </h1>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-100 text-green-900 text-sm uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {txns.map((t) => (
                  <tr
                    key={t.T_ID}
                    className="border-b hover:bg-green-50 transition-all"
                  >
                    <td className="px-4 py-3 font-medium">{t.customerName || '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          t.Type === 'Deposit'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {t.Type}
                      </span>
                    </td>
                    <td className="px-4 py-3">{new Date(t.Date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right font-semibold">
                      ₹{t.Amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          t.Status === 'Successful'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {t.Status}
                      </span>
                    </td>
                  </tr>
                ))}

                {txns.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-500">
                      No transactions found.
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
