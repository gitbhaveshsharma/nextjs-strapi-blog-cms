import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ blog }) => {
  // Safely access the properties using optional chaining
  const title = blog?.Title || "Untitled";
  const excerpt = blog?.Summary || "No excerpt available.";
  const Slug = blog?.Slug || "#";

  // Featured image logic
  const imageUrl = blog?.FeaturedImage?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_ASSETS_BASE_URL}${blog.FeaturedImage.url}`
    : null;
  const altText = blog?.FeaturedImage?.alternativeText || "Blog Image";

  return (
    <div className="flex">
      <div
        className="  bg-white border rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ height: "395px", width: "405px" }}
      >
        {/* Blog Featured Image */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={altText}
            width={800}
            height={300}
            className="w-full h-60 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-60 bg-gray-200 flex items-center justify-center mt-4 rounded-md">
            <span className="text-gray-600">No Image Available</span>
          </div>
        )}

        {/* Blog Content */}
        <div className="mt-4 px-2">
          <h2 className="text-lg font-semibold overflow-hidden text-ellipsis line-clamp-1">
            {title}
          </h2>
          <p className="text-sm text-gray-600 mt-2 overflow-hidden text-ellipsis line-clamp-2">
            {excerpt}
          </p>

          {/* Read More Link */}
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

export default BlogCard;
