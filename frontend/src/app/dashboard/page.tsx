'use client';

import { useRouter } from 'next/navigation';
import {
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiHome,
  FiShield,
  FiBarChart2,
  FiRepeat,
} from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Sidebar from "./sidebar";
import { onAuthStateChanged, User } from 'firebase/auth';

const Dashboard = () => {
  const router = useRouter();
  const [glow, setGlow] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check for logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login'); // redirect if not logged in
      }
    });

    return () => unsubscribe(); // cleanup
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const toggleGlow = () => {
    setGlow(true);
    setTimeout(() => setGlow(false), 500);
  };

  // Extract username from email
  const getUsername = () => {
    if (user && user.email) {
      return user.email.split('@')[0];
    }
    return '';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <div
            className={`w-50 h-50 rounded-full transition-all ${
              glow ? 'shadow-[0_0_30px_10px_rgba(34,197,94,0.7)]' : ''
            }`}
            onClick={toggleGlow}
          >
            <Image
              src="/logo.png"
              alt="EcoSort Logo"
              width={230}
              height={230}
              className="cursor-pointer"
            />
          </div>

          {/* Welcome Message */}
          {user && (
            <h2 className="text-xl font-bold text-green-600 mt-4">
              Welcome, {getUsername()}!
            </h2>
          )}

          <p className="text-gray-600 mt-2 text-lg italic">
            "YOUR PERSONALIZED LOAN MANAGEMENT SYSTEM"
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <FiHome className="text-green-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold">HOME LOAN</h3>
            <p className="text-gray-600 mt-2">
              Make your dream home a reality with flexible repayment options.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <FiAward className="text-green-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold">EDUCATION LOAN</h3>
            <p className="text-gray-600 mt-2">
              Invest in your future with hassle-free education financing.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <FiUsers className="text-green-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold">PERSONAL LOAN</h3>
            <p className="text-gray-600 mt-2">
              Get instant funds for your personal needs, no questions asked.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
          <h3 className="text-2xl font-semibold text-center mb-6">We Can...</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FeatureCard icon={<FiRepeat />} title="1" desc="Manage all your transactions for your easy access." />
            <FeatureCard icon={<FiTrendingUp />} title="2" desc="Manage your investments like the stocks you buy/sell." />
            <FeatureCard icon={<FiShield />} title="3" desc="Keep your data private and secure." />
            <FeatureCard icon={<FiBarChart2 />} title="4" desc="Give insights and personalized advice related to loans." />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
    <div className="flex justify-center mb-4 text-green-500 text-4xl">{icon}</div>
    <h4 className="text-xl font-semibold">{title}</h4>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default Dashboard;
