'use client';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  FiHome,
  FiUser,
  FiSettings,
  FiAward,
  FiLogOut,
  FiFileText,
  FiTrendingUp,
  FiBarChart2,
  FiPlusCircle,
} from 'react-icons/fi';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="w-64 h-screen bg-green-100 shadow-md flex flex-col">
      {/* Sidebar Links */}
      <nav className="flex-1 p-4 space-y-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center space-x-3 text-gray-700 hover:bg-green-200 p-3 rounded-lg w-full text-left"
        >
          <FiHome />
          <span className="text-lg">Dashboard</span>
        </button>

        <button
          onClick={() => router.push('/components')}
          className="flex items-center space-x-3 text-gray-700 hover:bg-green-200 p-3 rounded-lg w-full text-left"
        >
          <FiFileText />
          <span className="text-lg">Add Details</span>
        </button>

        <button
          onClick={() => router.push('/transactions')}
          className="flex items-center space-x-3 text-gray-700 hover:bg-green-200 p-3 rounded-lg w-full text-left"
        >
          <FiTrendingUp />
          <span className="text-lg">Transactions</span>
        </button>

        <button
          onClick={() => router.push('/account')}
          className="flex items-center space-x-3 text-gray-700 hover:bg-green-200 p-3 rounded-lg w-full text-left"
        >
          <FiAward />
          <span className="text-lg">Account</span>
        </button>

        <button
          onClick={() => router.push('/investments')}
          className="flex items-center space-x-3 text-gray-700 hover:bg-green-200 p-3 rounded-lg w-full text-left"
        >
          <FiBarChart2 />
          <span className="text-lg">Investments</span>
        </button>

        <button
          onClick={() => router.push('/apply-loan')}
          className="flex items-center space-x-3 text-gray-700 hover:bg-green-200 p-3 rounded-lg w-full text-left"
        >
          <FiPlusCircle />
          <span className="text-lg">Apply Loan</span>
        </button>

        <button
          onClick={() => router.push('/profile')}
          className="flex items-center space-x-3 text-gray-700 hover:bg-green-200 p-3 rounded-lg w-full text-left"
        >
          <FiUser />
          <span className="text-lg">Profile</span>
        </button>

        <button
          onClick={() => router.push('/dashboard/settings')}
          className="flex items-center space-x-3 text-gray-700 hover:bg-green-200 p-3 rounded-lg w-full text-left"
        >
          <FiSettings />
          <span className="text-lg">Settings</span>
        </button>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 p-4 text-red-600 hover:bg-red-100 rounded-lg w-full"
      >
        <FiLogOut />
        <span className="text-lg">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
