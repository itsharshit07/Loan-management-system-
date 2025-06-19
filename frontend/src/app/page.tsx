"use client";
import { useState } from "react";
import Image from "next/image";
import { BotIcon } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md">
        {/* Left - Logo and Website Name */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="LoanSaathi Logo" width={50} height={50} />
          <h1 className="text-xl font-bold">
            <span className="text-black">Loan</span>
            <span className="text-green-600">Saathi</span>
          </h1>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex space-x-6">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#dashboard" className="hover:underline">Dashboard</a>
          <a href="#blogs" className="hover:underline">Blogs</a>
        </div>

        {/* Right - Login / Signup Button */}
        <button
          onClick={handleLoginClick}
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          Login / Signup
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-br from-white to-gray-100">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Welcome to{" "}
          <span className="text-green-600">
            <Typewriter
              words={["Loanसाथी", "LoanSaathi"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={120}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h2>
        <p className="text-lg mb-8">Your one stop place for Loan Management</p>
        <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm mb-6">
          🧠 AI-powered Loan Shark Detector
        </div>

        {/* Chat Widget */}
        <div className="max-w-xl mx-auto mt-8">
          <div className="flex items-start space-x-2 bg-green-50 p-4 rounded-lg shadow">
            <BotIcon className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <p className="text-left">
                Welcome to LoanSaathi! I'm here to help you with all your loan-related queries.
              </p>
            </div>
          </div>

          {/* Input field */}
          <div className="mt-4 flex items-center border rounded-full px-4 py-2 shadow-md bg-white">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your loan query here..."
              className="flex-1 outline-none bg-transparent"
            />
            <button className="text-green-600 hover:text-green-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
