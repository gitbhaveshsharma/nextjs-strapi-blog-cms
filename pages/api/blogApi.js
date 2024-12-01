import axios from 'axios';
import { API_ENDPOINTS } from '../../config';

export const fetchBlogs = async (slug = "") => {
    const TOKEN = process.env.NEXT_PUBLIC_TOKEN; // Changed to use NEXT_PUBLIC_TOKEN
    console.log('Authorization Token:', TOKEN); // Console the token
    if (!TOKEN) throw new Error('Authorization token is missing!');

    const apiUrl = slug
        ? `${API_ENDPOINTS.api}/api/blogs?filters[Slug][$eq]=${slug}&populate=*`
        : `${API_ENDPOINTS.api}/api/blogs?populate=*`;

    try {
        console.log('Fetching API URL:', apiUrl); // Log the API URL for debugging
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        console.log('Fetched Blogs Response:', response.data); // Log the response data
        return response.data.data || []; // Ensure we return an empty array if no data is found
    } catch (error) {
        console.error('Error fetching blogs:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : error.message);
    }
};
