"use client";
import { useState } from "react";
import { auth, provider } from "../../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Send to backend (create user if new)
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
        }),
      });

      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleManualAuth = async () => {
    try {
      if (isSignup) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Save to backend
        await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: "New User", // You can ask name later in dashboard
          }),
        });

        alert("Signup successful!");
        router.push("/dashboard");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Image src="/logoo.png" width={150} height={50} alt="LoanSaathi Logo" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignup ? "Create an account" : "Welcome back"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleManualAuth}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <div className="text-center text-sm text-gray-500 my-2">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition mb-4"
        >
          <Image src="/google-icon.svg" width={20} height={20} alt="Google Icon" />
          {isSignup ? "Sign up with Google" : "Login with Google"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-green-600 cursor-pointer font-semibold"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
