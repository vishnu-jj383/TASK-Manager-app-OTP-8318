"use client";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Navbar from "../Navbar/page"

function Contact() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    useEffect(() => {
        // Get the 'user' cookie
        const userData = Cookies.get('user');

        if (userData) {
            setUser(JSON.parse(userData)); // Parse and set user data
        } else {
            // If no user data is found, redirect to login
            router.push('/Login');
        }
       
    }, [router]);
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar/>  
  {user ? (
      <div>
          <h1>Welcome, {user.username}!</h1>
          {/* You can access and display user data here */}
      </div>
  ) : (
      <p>Loading...</p>
  )}
  <center>Contact</center>
    </div>
  )
}

export default Contact