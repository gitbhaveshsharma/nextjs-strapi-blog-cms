"use client";

import { useEffect, useState } from "react";
import { fetchBlogs } from "../api/blogApi";
import BlogCard from "./BlogCard";
import FeatureBlogCard from "./FeatureBlogCard";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogData = await fetchBlogs();
                setBlogs(blogData);
            } catch (err) {
                setError("An error occurred while fetching the data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (blogs.length === 0) return <div>No blogs available.</div>;

    return (
        // Wrap both components in a parent div
        <div>
            {/* FeatureBlogCard for larger screens */}
            <div >
                {blogs.map((blog) => (
                    <FeatureBlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            {/* BlogCard for other screens or as an alternative */}
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogList;
