"use client";
export default function SignInForm() {
  return (
    <div className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-center items-center bg-white">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
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
      <a href="#" className="text-gray-600 mb-4 transition-all duration-300 hover:text-blue-500 hover:underline">
        Forgot your password?
      </a>
      <button className="py-2 px-6 bg-blue-500 text-white rounded-lg font-bold">
        Sign In
      </button>
    </div>
  );
}
