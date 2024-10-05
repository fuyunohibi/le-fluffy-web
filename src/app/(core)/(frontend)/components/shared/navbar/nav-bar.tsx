"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CirclePlus, Heart, House, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchBar } from "./search-bar";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // New state for search box visibility
  const [searchInput, setSearchInput] = useState(""); // New state for search input
  const router = useRouter();

  const handleLogout = () => { 
    setIsAuthenticated(false); 
  };

  const handleSearchSubmit = (searchInput: string | number | boolean) => {
    if (searchInput) {
      router.push(`/search/${encodeURIComponent(searchInput)}`);
      setIsSearchVisible(false); 
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (isSearchVisible) {
        setIsSearchVisible(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSearchVisible]);

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -100 : 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 glassmorphism rounded-b-[3rem]"
      >
        <Link href="/" className="text-xl font-bold">
          le FLUFFY*
        </Link>
        <div className="flex gap-4">
          <motion.div
            whileTap={{
              scale: 1.2,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileHover={{ scale: 1.1 }}
            className="text-gray-900 font-semibold flex flex-col items-center transition-all hover:underline duration-500"
          >
            <Link href="/posting" className="text-gray-900">
              Post
            </Link>
          </motion.div>

          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-gray-900">
              Logout
            </button>
          ) : (
            <>
              <motion.div
                whileTap={{
                  scale: 1.2,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                whileHover={{ scale: 1.1 }}
                className="text-gray-900 font-semibold flex flex-col items-center transition-all hover:underline duration-500"
              >
                <Link href="/auth" className="text-gray-900">
                  Login
                </Link>
              </motion.div>

              <motion.div
                whileTap={{
                  scale: 1.2,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                whileHover={{ scale: 1.1 }}
                className="text-gray-900 font-semibold flex flex-col items-center transition-all hover:underline duration-500"
              >
                <Link href="/auth" className="text-gray-900">
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </motion.nav>

      {/* Bottom Navbar */}
      <div className="flex justify-center">
        <motion.nav
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 100 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="glassmorphism-blur fixed bottom-4 transform -translate-x-1/2 z-50 flex justify-around items-center shadow-lg rounded-[3rem] w-64 p-4"
        >
          <motion.div
            whileTap={{
              scale: 1.2,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileHover={{ scale: 1.1 }}
            className="text-gray-900 flex flex-col items-center"
          >
            <Link href="/" className="flex flex-col items-center">
              <House color="#111827" />
            </Link>
          </motion.div>

          <motion.div
            whileTap={{
              scale: 1.2,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileHover={{ scale: 1.1 }}
            className="text-gray-900 flex flex-col items-center"
          >
            <Link href="/posting" className="flex flex-col items-center">
              <CirclePlus color="#111827" />
            </Link>
          </motion.div>

          <motion.div
            whileTap={{
              scale: 1.2,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileHover={{ scale: 1.1 }}
            className="text-gray-900 flex flex-col items-center"
            onClick={() => setIsSearchVisible(true)}
          >
            <Search color="#111827" />
          </motion.div>
        </motion.nav>
      </div>

      {isSearchVisible && (
        <motion.div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 flex justify-center items-start"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.3 }} 
          onClick={() => setIsSearchVisible(false)}

        >
          <motion.div
            className="p-6 rounded-lg flex flex-col items-center mt-40"
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.8, opacity: 0 }} 
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.5, 
            }}
          >
            <SearchBar onSearchSubmit={handleSearchSubmit} />
          </motion.div>
        </motion.div>
      )}

    </>
  );
};
