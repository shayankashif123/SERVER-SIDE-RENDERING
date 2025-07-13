import axios from "axios";
import DeleteBlog from "@/app/components/delete";
import UpdatePage from "@/app/components/update";
export async function generateMetadata({ params }) {
    return {
        title: `Blog ${params.blogId}`
    }
}
export default async function getBlog({ params }) {
    const { blogId } = params
    let blog = null
    try {
        const res = await axios.get(`http://localhost:5000/getBlog/${blogId}`)
        if (res.data.success) {
            blog = res.data?.data;
        }
    } catch (error) {
        console.error('Error fetching blog:', error);
    }


    if (!blog) {
        return <p className="p-6 text-red-500">Blog not found.</p>;
    }
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">{blog.title}</h1>
            <p className="text-gray-700">{blog.description}</p>
            <DeleteBlog blogId={blogId}/>
            <UpdatePage blogId={blogId}/>
        </div>
    )
}