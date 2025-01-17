"use client";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Navbar() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Get the 'user' cookie
        const userData = Cookies.get('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        // Remove the user cookie
        Cookies.remove('user');
        setUser(null);
        router.push('/Login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-2xl font-semibold">
                    <Link href="/">MyApp</Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-4">
                    <Link href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                    <Link href="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                    <Link href="/contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                </div>

                {/* User Section */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            {/* User Profile */}
                            <div className="relative">
                                <button
                                    className="text-white"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    {user.username}
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link href="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar