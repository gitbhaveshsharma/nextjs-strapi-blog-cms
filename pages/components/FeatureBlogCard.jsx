import Link from "next/link";
import Image from "next/image";

const FeatureBlogCard = ({ blog }) => {
  // Only render if blog is featured
  if (!blog?.isFeatured) return null; // Return null if the blog is not featured

  // Safely access properties using optional chaining
  const title = blog?.Title || "Untitled";
  const excerpt = blog?.Summary || "No excerpt available.";
  const Slug = blog?.Slug || "#";

  // Featured image logic
  const imageUrl = blog?.FeaturedImage?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_ASSETS_BASE_URL}${blog.FeaturedImage.url}`
    : null;
  const altText = blog?.FeaturedImage?.alternativeText || "Blog Image";

  return (
    // Card container with responsive width and maximum size constraints
    <div className="bg-white border rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[55%] mx-auto">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Blog Featured Image */}
        {imageUrl ? (
          // Image section: takes up 50% of the width on larger screens
          <div className="w-full lg:w-2/4 ">
            <Image
              src={imageUrl}
              alt={altText}
              width={800} // Adjusted width for better resolution
              height={533} // Adjusted height to maintain proper aspect ratio
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        ) : (
          // Placeholder for when the image is not available
          <div className="w-full lg:w-1/2 h-64 bg-gray-200 flex items-center justify-center mt-4 lg:mt-0 rounded-md">
            <span className="text-gray-600">No Image Available</span>
          </div>
        )}

        {/* Blog Content */}
        <div className="mt-4 lg:mt-0 lg:ml-6 p-2 w-full lg:w-1/2">
          {/* Blog title with truncated text */}
          <h2 className="text-lg font-semibold overflow-hidden text-ellipsis">
            {title}
          </h2>

          {/* Blog excerpt with truncated text */}
          <p className="text-sm text-gray-600 mt-2 overflow-hidden text-ellipsis line-clamp-4">
            {excerpt}
          </p>

          {/* "Read More" button with hover effect */}
          <Link href={`/blog/${Slug}`} passHref>
            <button className="mt-4 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureBlogCard;
