"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/";  
    }
  };
  return (
    <div className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-center items-center bg-white">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 px-4 py-2 w-64 bg-gray-100 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 px-4 py-2 w-64 bg-gray-100 border border-gray-300 rounded-lg"
          />
          {/* <a href="#" className="text-gray-600 mb-4 transition-all duration-300 hover:text-blue-500 hover:underline">
            Forgot your password?
          </a> */}
          <button className="py-2 px-6 bg-blue-500 text-white rounded-lg font-bold">
            Sign In
          </button>
      </form>
    </div>
  );
}
