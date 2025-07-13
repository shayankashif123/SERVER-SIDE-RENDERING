import axios from "axios"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function Home() {
    let blogs = []
    try {
        const res = await axios.get("http://localhost:5000/getAllBlogs")
        blogs = res.data.data
    }
    catch (err) {
        console.error("Error fetching blogs:", err);
    }

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-600">📝 My Blogs</h1>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/search"
                            className="hover:text-blue-600"
                            title="Search"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                                />
                            </svg>
                        </Link>

                        <Link
                            href="/write"
                            className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Write a Blog
                        </Link>
                    </div>
                </div>

                {blogs.length === 0 ? (
                    <p className="text-gray-500 text-center">No blogs to show</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog._id} className="mb-4">
                            <Link
                                href={`/blog/${blog._id}`}
                                className="text-lg text-blue-500 hover:underline"
                            >
                                {blog.title}
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
