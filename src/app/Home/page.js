"use client";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Navbar from "../Navbar/page";
function Home() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Get the 'user' cookie
        const userData = Cookies.get('user');

        if (userData) {
            setUser(JSON.parse(userData)); // Parse and set user data
        } else {
            // If no user data is found, redirect to login
            router.push('/login');
        }
    }, [router]);
  return (
    <div>
      <Navbar/>  
    {user ? (
        <div>
            <h1>Welcome, {user.username}!</h1>
            {/* You can access and display user data here */}
        </div>
    ) : (
        <p>Loading...</p>
    )}
</div>
  )
}

export default Home