'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'   
import Link from 'next/link'
export default function SearchPage() {
    const [query,setQuery] = useState('')
    const [results, setResult] = useState([]);
    useEffect(()=>{
        const delayDebounce = setTimeout(()=> {

            if(!query.trim()) {
                setResult([])
                return
            }
            const fetchResult=async()=>{
                try{
                    const response = await axios.get(`http://localhost:5000/getBlogsBySearch?title=${query}`)
                    if(response.data.success) {
                        setResult(response.data.data)
                    }
                }catch (error) {
                    console.error('Error fetching search results:', error)
                }
            }
            fetchResult()
        },500)
          return () => clearTimeout(delayDebounce)
    },[query])
      return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">🔍 Search Blogs</h1>

      <input
        type="text"
        placeholder="Type to search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {query.trim() !== '' && results.length === 0 && (
        <p className="text-gray-500">No blogs found.</p>
      )}

      {results.map((blog) => (
        <div key={blog._id} className="mb-4">
          <Link href={`/blog/${blog._id}`} className="text-lg text-blue-500 hover:underline">
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  )
}