"use client";
import { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");  

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created successfully! Please sign in.");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        setError(data.error || "An error occurred during registration");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-center items-center bg-white">
      <h1 className="text-3xl font-bold mb-6">Create Account</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 px-4 py-2 w-64 bg-gray-100 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 px-4 py-2 w-64 bg-gray-100 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 px-4 py-2 w-64 bg-gray-100 border border-gray-300 rounded-lg"
          />
          <button type="submit" className="py-2 px-6 bg-blue-500 text-white rounded-lg font-bold">
            Sign Up
          </button>
      </form>
    </div>
  );
}
