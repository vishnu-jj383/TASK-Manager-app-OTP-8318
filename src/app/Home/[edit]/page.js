"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Cookies from 'js-cookie';
import axios from "axios";
import styles from "./edit.module.css";
import Navbar from "@/app/Navbar/page";

import { useRouter } from "next/navigation";

function Edittask({ params }) {
    const [id, setId] = useState("");
    const [taskname, setTaskname] = useState("");
    const [description, setDescription] = useState("");
    const [startdate, setStartdate] = useState("");
    const[enddate,setEnddate]=useState("")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const uniqueId = React.use(params)?.edit;
     const [user, setUser] = useState(null);
    useEffect(() => {
        // Get the 'user' cookie
        const userData = Cookies.get('user');

        if (userData) {
            setUser(JSON.parse(userData)); // Parse and set user data
        } else {
            // If no user data is found, redirect to login
            router.push('/Login');
        }
        if (uniqueId) {
            const getEditData = async () => {
                try {
                    const response = await axios.get(`http://localhost:4001/task/${uniqueId}`);
                    setId(response.data.id || "");  // Set default empty string
                    setTaskname(response.data.TaskName || ""); // Set default empty string
                    setDescription(response.data.description || ""); // Set default empty string
                    setStartdate(response.data.StartDate || ""); // Set default empty string
                    setEnddate(response.data.EndDate || ""); // Set default empty string
                } catch (err) {
                    console.error("Error fetching data:", err);
                    setError("Failed to fetch data");
                } finally {
                    setLoading(false);
                }
            };
    
            getEditData();
        }
    }, [uniqueId, router]);
    const handleEdit = async (e) => {
        e.preventDefault();
        if (!id || !taskname || !startdate || !enddate) {
          alert("All fields are required!");
          return;
        }
    
        try {
          await axios.put(`http://localhost:4001/task/${uniqueId}`, {
            id,
           
            TaskName: taskname,
            StartDate: startdate,
            EndDate: enddate,
            description
            
          });
          alert("Changes saved successfully!");
          router.push("/Home");
        } catch (err) {
          console.error("Error saving changes:", err);
          alert("Failed to save changes.");
        }
      };
    
    //   if (loading) return <p>Loading...</p>;
    //   if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <>
   
    <div className={`${styles.editfullpage} p-6`} style={{ backgroundColor: '#f4f7fa', minHeight: '100vh' }}>
    <Navbar />
    <center>
      <form
        className={styles.form}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          maxWidth: '600px',
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {error && <div style={{ color: "red", fontSize: '14px' }}>{error}</div>} {/* Display error message */}
        <br />

        <div style={{ width: '100%' }}>
          <label htmlFor="id" className={styles.label}>ID</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setId(e.target.value)}
            value={id}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '12px',
            }}
          />
        </div>

        <div style={{ width: '100%' }}>
          <label htmlFor="taskname" className={styles.label}>Task Name</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTaskname(e.target.value)}
            value={taskname}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '12px',
            }}
          />
        </div>

        <div style={{ width: '100%' }}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <input
            className={styles.textarea}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '12px',
            }}
          />
        </div>

        <div style={{ width: '100%' }}>
          <label htmlFor="startdate" className={styles.label}>Start Date</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setStartdate(e.target.value)}
            value={startdate}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '12px',
            }}
          />
        </div>

        <div style={{ width: '100%' }}>
          <label htmlFor="enddate" className={styles.label}>End Date</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setEnddate(e.target.value)}
            value={enddate}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '12px',
            }}
          />
        </div>

        <center>
          <button
            className={styles.button}
            onClick={handleEdit}
            type="submit"
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Save Changes
          </button>
        </center>
      </form>
    </center>
  </div>
  </>
  )
}

export default Edittask