"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetchBlogs } from "../api/blogApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; 

const FullBlogPage = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { slug } = router.query;

    const preprocessMarkdown = (content) => {
        if (!content) return content;

        // Remove horizontal rules and refine markdown
        content = content.replace(/^-{3,}$/gm, ""); // Removes lines with "---" or similar
        return content;
    };

    useEffect(() => {
        if (!slug) {
            console.log("Waiting for slug to load...");
            return;
        }

        const fetchData = async () => {
            try {
                const data = await fetchBlogs(slug);
                if (data?.length > 0) {
                    // Debugging the API response
                    console.log("Fetched blog data:", data[0]);

                    // Assuming the API returns the PublishedAt field as part of the response
                    if (data[0].PublishedAt) {
                        console.log("PublishedAt:", data[0].PublishedAt);
                    } else {
                        console.log("No PublishedAt field found in blog data.");
                    }

                    data[0].Content = preprocessMarkdown(data[0].Content);
                    setBlog(data[0]);
                } else {
                    console.error("No blog found for the provided slug.");
                    setBlog(null);
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (!slug) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg">Loading slug...</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    if (!blog) {
        return <div className="text-center text-xl text-red-500">Blog not found</div>;
    }

    // Format the publish date to a readable format
    const formatDate = (date) => {
        if (!date) return "";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mx-auto px-5 py-8 w-full sm:w-[90%] md:w-[80%] lg:w-[65%]">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog?.Title}</h1>

            {/* Author and Published At */}
            <div className=" text-sm text-green-600 mb-5 ml-2">
                {blog?.Author && <span className="block">{blog.Author}</span>}
                {blog?.publishedAt && (
                    <span className="block ">Published on {formatDate(blog.publishedAt)}</span>
                )}
            </div>

            {blog?.FeaturedImage?.url ? (
                <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_ASSETS_BASE_URL}${blog.FeaturedImage.url}`}
                    alt={blog?.FeaturedImage?.alternativeText || "Blog Image"}
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                />
            ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                    <span>No Image Available</span>
                </div>
            )}

            {/* Category as a tag */}
            {blog?.Category && (
                <div className="mt-2 inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                    {blog.Category}
                </div>
            )}
            <div className="mt-8 text-lg leading-8 text-gray-700 markdown-body">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        ul: ({ node, ...props }) => (
                            <ul className="list-disc ml-5" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol className="list-decimal ml-5" {...props} />
                        ),
                        hr: () => null, 
                    }}
                >
                    {blog?.Content}
                </ReactMarkdown>
            </div>
            <div className=" text-blue-500 text-sm text-center py-2 mt-10">
                &copy; 2024 The BlueBe. All Rights Reserved.
            </div>
        </div>
    );
};

export default FullBlogPage;
