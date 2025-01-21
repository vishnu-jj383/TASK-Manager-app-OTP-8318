"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/page";
import axios from "axios";
import Link from "next/link";

function Home() {
    const [user, setUser] = useState(null);
    const [taskdata, setTaskdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 3; 
    const router = useRouter();

    useEffect(() => {
        const userData = Cookies.get("user");
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            router.push("/Login");
            return;
        }

        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:4001/task");
                setTaskdata(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    // Delete Task
    const Deleterow = useCallback(async (id) => {
        try {
            await axios.delete(`http://localhost:4001/task/${id}`);
            setTaskdata((prevData) => prevData.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
            setError("Failed to delete task. Please try again.");
        }
    }, []);

    // Filtered & Paginated Tasks
    const filteredTasks = useMemo(() => 
        taskdata.filter((task) => task.TaskName.toLowerCase().includes(searchTerm.toLowerCase())), 
        [taskdata, searchTerm]
    );

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = useMemo(() => filteredTasks.slice(indexOfFirstTask, indexOfLastTask), [filteredTasks, indexOfFirstTask, indexOfLastTask]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Search and Add Task Button */}
            <div className="flex justify-between mt-4 px-6">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="border p-2 rounded w-1/3 text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link className="btn btn-success bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md" href="/Home/Addtask">
                    Add Task
                </Link>
            </div>

            {/* Error Handling */}
            {error && <div className="text-red-500 text-center mt-4">{error}</div>}

            {/* Task Table */}
            <div className="flex-1 mt-6 px-4">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Task Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Description</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Start Date</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">End Date</th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTasks.length > 0 ? (
                                    currentTasks.map((item, index) => (
                                        <tr key={item.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.TaskName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.description}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.StartDate}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.EndDate}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center space-x-2">
                                                    <Link className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" href={`/Home/${item.id}`}>
                                                        Edit
                                                    </Link>
                                                    <button className="btn btn-danger bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => Deleterow(item.id)}>
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
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}  style={{color:"black"} } className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50">
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button 
                                key={index + 1} 
                                onClick={() => setCurrentPage(index + 1)} 
                                className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-red" : "bg-gray-300"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} style={{color:"black"} } className="px-4 py-2 mx-2 bg-green-300 rounded disabled:opacity-50">
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
