"use client";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Navbar from "../Navbar/page";
import axios from "axios";
import Link from "next/link";
function Home() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const[taskdata,setTaskdata]=useState([]);
    const [loading, setLoading] = useState(true); // to track loading state
    const [error, setError] = useState(null); // to track errors
    useEffect(() => {
        // Get the 'user' cookie
        const userData = Cookies.get('user');

        if (userData) {
            setUser(JSON.parse(userData)); // Parse and set user data
        } else {
            // If no user data is found, redirect to login
            router.push('/Login');
        }
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:4001/task");
                setTaskdata(res.data); // Set the task data
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false); // Set loading to false after data fetch
            }
        };

        fetchData();
        
    }, [router]);

    async function Deleterow(id) {
        try {
          await axios.delete(`http://localhost:4001/task/${id}`);
          // Update state without re-fetching all data
          setTaskdata((prevData) => prevData.filter((post) => post.id !== id));
        } catch (error) {
          console.error("Error deleting post:", error);
          setError("Failed to delete post");
        }
      }  
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
 <div className="flex justify-between items-center mt-4 px-6">
      
        {/* <Link
          className="btn btn-success bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          href="/CallAddBlog"
        >
          Add Blog
        </Link> */}
      </div>

      <div className="flex-1 mt-6 px-4">
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Task Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                 End  Date
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
                            {taskdata.length > 0 ? (
                                taskdata.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-100`}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.TaskName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.description}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.StartDate}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.EndDate}</td>
                                        <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center space-x-2">
                      <Link
                        className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        href={`/Home/${item.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={() => Deleterow(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-700">
                                        No tasks available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home