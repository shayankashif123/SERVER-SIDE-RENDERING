'use client'
import { useRouter } from "next/navigation"
import axios from "axios"
export default function DeleteBlog({ blogId }) {
    const router = useRouter()
    const handleDelete = async () => {
        try {
            const confirm = window.confirm("Are you sure you want to delete this blog");
            if (confirm) {
                const response = await axios.delete(`http://localhost:5000/deleteBlog/${blogId}`);
                if (response.data.success) {
                    alert("Blog deleted successfully");
                    router.push("/");
                }
                else {
                    alert("Failed to delete the blog.")
                }
            } else {
                return;
            }
        }
        catch (err) {
            console.error("Error deleting blog:", err)
            alert("Something went wrong.")
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
            Delete
        </button>
    )
}