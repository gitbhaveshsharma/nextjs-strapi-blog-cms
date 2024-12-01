"use client";

import BlogList from "./components/BlogList";
// import FeaturedBlog from "./components/FeatureBlogCard";

const Home = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2 mt-2">Welcome to the Blog</h1>
            <BlogList />

            {/* Copyright Section */}
            <div className="text-blue-500 text-sm text-center py-1">
                &copy; 2024 The BlueBe. All Rights Reserved.
            </div>
        </div>
    );
};

export default Home;
