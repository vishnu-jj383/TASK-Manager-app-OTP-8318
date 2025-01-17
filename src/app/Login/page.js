"use client";
import {React,useState,useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from "next/navigation"; 
import styles from "./login.module.css"
import Cookies from 'js-cookie';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [logindata,setLogindata]=useState([])
    const router = useRouter(); 
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Fetch user profiles from the server
            const response = await axios.get('http://localhost:4001/users/');
            const users = response.data; // Assuming response.data contains an array of user profiles

            // Find the user based on username and password
            const user = users.find((u) => u.username === username && u.password === password);

            if (user) {
                // Save user info to localStorage or sessionStorage
                // Cookies.set('user', JSON.stringify(user), { expires: 1 / 24 }); // expires in 1 hour
                Cookies.set('user', JSON.stringify(user)); // No expiration set
                router.push("/Home"); 
                
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError('An error occurred. Please try again.');
        }
    };
  return (
    <div className={styles.container}>
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form}>
      {error && <p className="text-red-500 mb-4">{error}</p>}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email"  
       value={username}
       onChange={(e) => setUsername(e.target.value)}

              placeholder="Enter your email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" style={{color:"black"}} name="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}

         placeholder="Enter your password" required />
        <button type="submit" onClick={handleLogin} className={styles.submitButton}>Log In</button>
      </form>
    </div>
  </div>
  )
}

export default Login