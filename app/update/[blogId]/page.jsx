'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useParams } from "next/navigation"
export default function UpdatePage() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const router = useRouter();
    const { blogId } = useParams();
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getBlog/${blogId}`);
                if (response.data.success) {
                    setTitle(response?.data?.data?.title)
                    setDescription(response?.data?.data?.description)
                }
            }
            catch (err) {
                console.error('Error fetching blog:', err)
            }
        }
        if (blogId) fetchBlog()
    }, [blogId])
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:5000/updateBlog/${blogId}`, {
                title,
                description,
            })
            if (res.data.success) {
                alert('Blog updated successfully')
                router.push(`/blog/${blogId}`)
            }
        } catch (err) {
            alert("Error in updating blog")
            console.error('Error updating blog:', err)
        }
    }
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">✏️ Update Blog</h1>
            <form onSubmit={handleUpdate}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 border rounded mb-4"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full p-2 border rounded mb-4"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Update
                </button>
            </form>
        </div>
    )
}