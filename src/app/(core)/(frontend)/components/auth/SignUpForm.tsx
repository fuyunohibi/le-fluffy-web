"use client";
export default function SignUpForm() {
  return (
    <div className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-center items-center bg-white">
      <h1 className="text-3xl font-bold mb-6">Create Account</h1>
      <input
        type="text"
        placeholder="Name"
        className="mb-4 px-4 py-2 w-64 bg-gray-100 border border-gray-300 rounded-lg"
        onClick={() => console.log("Name")}
      />
      <input
        type="email"
        placeholder="Email"
        className="mb-4 px-4 py-2 w-64 bg-gray-100 border border-gray-300 rounded-lg"
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 px-4 py-2 w-64 bg-gray-100 border border-gray-300 rounded-lg"
      />
      <button className="py-2 px-6 bg-blue-500 text-white rounded-lg font-bold">
        Sign Up
      </button>
    </div>
  );
}
