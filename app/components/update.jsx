'use client'
import { useRouter } from "next/navigation";
export default function UpdatePage({ blogId }) {
    const router = useRouter();
    const handleUpdate = () => {
        router.push(`/update/${blogId}`)
    }
    return (
        <button
            onClick={handleUpdate}
            className="mt-4 ml-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
            Update
        </button>
    )
}