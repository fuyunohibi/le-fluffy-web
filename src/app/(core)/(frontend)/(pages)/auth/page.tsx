"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SignUpForm from "../../components/auth/SignUpForm";
import SignInForm from "../../components/auth/SignInForm";

export default function App() {
  const [signIn, toggle] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="flex flex-1 flex-col gap-4 items-center justify-center p-20 pt-24"
    >
      <div className="bg-white rounded-lg shadow-lg w-[678px] max-w-full min-h-[400px] relative overflow-hidden">
        {/* Sign Up Form */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}  // Initially hidden off the screen to the right
          animate={{ x: signIn ? "0%" : "100%", opacity: signIn ? 0 : 1 }}  // Move in and out depending on the signIn state
          transition={{ duration: 0.2 }}  // Smooth transition
          className="absolute top-0 left-0 w-1/2 h-full p-8 flex flex-col justify-center items-center bg-white"
          style={{ zIndex: signIn ? 0 : 1 }}  // Set z-index based on the signIn state
        >
          <SignUpForm />
        </motion.div>

        {/* Sign In Form */}
        <motion.div
          initial={{ x: signIn ? "0%" : "-100%", opacity: signIn ? 1 : 0 }}
          animate={{ x: signIn ? "0%" : "100%", opacity: signIn ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-0 w-1/2 h-full p-8 flex flex-col justify-center items-center bg-white"
          style={{ zIndex: signIn ? 1 : 0 }}  // Set z-index for the other form
        >
          <SignInForm />
        </motion.div>

        {/* Overlay Container */}
        <motion.div
          initial={{ x: signIn ? "0%" : "-100%" }}
          animate={{ x: signIn ? "0%" : "-50%" }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center"
          style={{ zIndex: 2 }}
        >
          <div className="absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center align-middle">
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold mb-4">
                {signIn ? "Welcome Back!" : "Hello"}
              </h1>
              <p className="mb-4">
                {signIn
                  ? "Sign in to your account to find your fluffy!"
                  : "Enter your personal details and start finding your fluffy!"}
              </p>
              <button
                onClick={() => toggle(!signIn)}
                className="border-2 border-white py-2 px-6 text-white rounded-lg"
              >
                {signIn ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
