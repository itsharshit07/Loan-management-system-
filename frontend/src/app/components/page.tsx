"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomerForm from "./customerForm";
import Sidebar from "../dashboard/sidebar";

export default function Home() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const response = await axios.get("http://localhost:5000/api/customers");
    setCustomers(response.data);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar Section */}
      <Sidebar />
  
      {/* Main Content */}
      <main className="flex-1 h-full overflow-hidden">
        <div className="h-full overflow-y-auto p-6 md:p-10">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Loan Management Dashboard
          </h1>
  
          {/* Customer Form */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              Add Your Details
            </h2>
            <CustomerForm />
          </div>
        </div>
      </main>
    </div>
  );
}
