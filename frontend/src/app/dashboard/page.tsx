"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomerForm from "../components/customerForm";

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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Loan Management System</h1>
      <CustomerForm />
      <h2 className="text-xl mt-6 mb-2">Customer List</h2>
      <ul className="border p-4 rounded-lg">
        {customers.map((customer: any) => (
          <li key={customer.C_ID} className="mb-2 border-b pb-2">
            <strong>{customer.name}</strong> - {customer.email} (
            {customer.a_c_type})
          </li>
        ))}
      </ul>
    </div>
  );
}
