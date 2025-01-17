"use client";
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from "axios";
import Navbar from '../../Navbar/page';
import styles from './add.module.css'
import { useRouter } from "next/navigation";

function Addtask() {
    const [id, setId] = useState("");
    const [taskname, setTaskname] = useState("");
    const [description, setDescription] = useState("");
    const [startdate, setStartdate] = useState("");
    const[enddate,setEnddate]=useState("")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
   
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
       
    }, [ router]);
    const handleAdd = async (e) => {
        e.preventDefault()
    
        // Basic validation
        if (!id || !taskname || !startdate || !enddate) {
          setError("All fields are required!");
          return;
        }
    
        try {
          await axios.post("http://localhost:4001/task/", {
            "id": id,
            "TaskName": taskname,
            "StartDate": startdate,
            "EndDate": enddate,
            "description": description
          });
          alert("Post saved!");
    
          setError(""); // Clear error on success
        } catch (err) {
          setError("Failed to save the post. Please try again.");
        }
      }
    //   if (loading) return <p>Loading...</p>;
    //   if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <>
     <Navbar />
    <div className={`${styles.editfullpage} p-6`} style={{ backgroundColor: "#f4f7fa", minHeight: "100vh" }}>
     
      <center>
        <form
          onSubmit={handleAdd}
          className={styles.form}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            maxWidth: "800px",
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {error && <div style={{ color: "red", fontSize: "14px" }}>{error}</div>}

          {/* Row for ID and Task Name */}
          <div style={{ display: "flex", gap: "15px", width: "100%", flexWrap: "wrap" }}>
            <div style={{ flex: "1" }}>
              <label htmlFor="id" className={styles.label}>ID</label>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => setId(e.target.value)}
                value={id}
                required
                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>

            <div style={{ flex: "1" }}>
              <label htmlFor="taskname" className={styles.label}>Task Name</label>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => setTaskname(e.target.value)}
                value={taskname}
                required
                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
          </div>

          {/* Row for Start Date and End Date */}
          <div style={{ display: "flex", gap: "15px", width: "100%", flexWrap: "wrap" }}>
            <div style={{ flex: "1" }}>
              <label htmlFor="startdate" className={styles.label}>Start Date</label>
              <input
                className={styles.input}
                type="date"
                onChange={(e) => setStartdate(e.target.value)}
                value={startdate}
                required
                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>

            <div style={{ flex: "1" }}>
              <label htmlFor="enddate" className={styles.label}>End Date</label>
              <input
                className={styles.input}
                type="date"
                onChange={(e) => setEnddate(e.target.value)}
                value={enddate}
                required
                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
          </div>

          {/* Description Field (Full Width) */}
          <div style={{ width: "100%" }}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows="3"
              style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <center>
            <button
              className={styles.button}
              type="submit"
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Add Task
            </button>
          </center>
        </form>
      </center>
    </div>
  </>
);
}

export default Addtask