import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JobDetailsOverlay from "./JobDetailsOverlay";

const Homepage = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://mini-job-board-backend-gu0p.onrender.com/api/jobs");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched jobs data:", data);
                setJobs(data);
                setFilteredJobs(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Extract unique categories (job types) from jobs
    const categories = [...new Set(jobs.map(job => job.type))];

    // Filter jobs when search or category changes
    useEffect(() => {
        let filtered = jobs;

        if (selectedCategory) {
            filtered = filtered.filter(job => job.type === selectedCategory);
        }

        if (searchTerm.trim() !== "") {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredJobs(filtered);
    }, [searchTerm, selectedCategory, jobs]);

    useEffect(() => {
        // Fetch job data (replace with your actual data fetching logic)
        const fetchJob = async () => {
            const response = await fetch('/api/jobs/1'); // Example API call
            const data = await response.json();
            setJob(data);
        };

        fetchJob();
    }, []);

    return (
        <div className="min-h-screen bg-white py-20 px-6 sm:px-12 md:px-20 font-sans">
            {/* Loader */}
            {loading ? (
                <div className="text-center">
                    <p className="text-lg text-gray-600">Loading jobs, please wait...</p>
                </div>
            ) : (
                <>
                    {/* Heading */}
                    <header className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
                            Find & Get Hired Fast.
                        </h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Jobs & Job search. Find jobs in global. Executive jobs & work.
                        </p>

                        {/* Search bar with category selector */}
                        <form
                            onSubmit={e => e.preventDefault()}
                            className="flex max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-sm overflow-hidden"
                        >
                            <select
                                className="w-1/3 px-4 py-3 border-r border-gray-300 focus:outline-none"
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Job Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Keywords or Title"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="flex-grow px-4 py-3 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white px-6 font-semibold transition"
                            >
                                Search
                            </button>
                        </form>
                    </header>

                    {/* Categories section */}
                    <section className="max-w-6xl mx-auto mt-8 mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Most Demanding Categories
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6">
                            {categories.map(cat => {
                                // Count vacancies per category
                                const count = jobs.filter(job => job.type === cat).length;
                                return (
                                    <div
                                        key={cat}
                                        className="border rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center"
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        <div className="text-green-500 mb-2">
                                            {/* Placeholder icon */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12h6m-3-3v6m7 3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold">{cat}</h3>
                                        <p className="text-gray-600">{count} vacanc{count !== 1 ? "ies" : "y"}</p>
                                    </div>
                                );
                            })}
                            {/* Big callout card */}
                            <div className="bg-green-500 text-white flex flex-col justify-center items-center rounded-lg p-6 shadow-lg hover:bg-green-600 transition cursor-pointer">
                                <p className="text-3xl font-extrabold">{jobs.length}+ </p>
                                <p className="font-semibold">Jobs already posted</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 mt-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </section>

                    {/* Jobs Grid */}
                    <section className="max-w-7xl mx-auto">
                        {filteredJobs.length === 0 ? (
                            <p className="text-center text-gray-600 text-lg">No jobs match your criteria.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredJobs.map(job => (
                                    <JobCard key={job._id} job={job} onViewDetails={setJob} />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Render JobDetails only if job data is available */}
                    <JobDetailsOverlay job={job} onClose={() => setJob(null)} />
                </>
            )}
        </div>
    );
};

export default Homepage;
