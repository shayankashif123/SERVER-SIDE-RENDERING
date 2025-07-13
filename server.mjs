import { addBlog, getAllBlogs, getById, getByTitle, updateById, deleteById } from './CRUD.mjs'
import { connectDb, disconnectDb } from './Lib/connectDb.mjs'
import express from 'express'
import cors from "cors"
const app = express();
app.use(express.json());
app.use((cors()));
const port = 5000
connectDb()
app.post('/addBlogs', async (req, res) => {
    try {
        const blogDetail = req.body;
        const result = await addBlog(blogDetail);
        if (!result) {
            return res.status(404).json(result);
        }
        return res.status(201).json(result)
    }
    catch (err) {
        console.error("Error in /addBlogs route:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})
app.get("/getBlog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getById(id);
        if (!response) {
            return res.status(404).json(response)
        }
        return res.status(200).json(response)
    }
    catch (err) {
        console.error("Error in getting blogs by id:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})
app.get("/getAllBlogs", async (req, res) => {
    try {
        const result = await getAllBlogs();
        if (!result) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result)
    } catch (err) {
        console.error("Error in getting all blogs :", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})
app.get("/getBlogsBySearch", async (req, res) => {
    try {
        const {title} = req.query
        const result = await getByTitle(title.trim());
        if (!result) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result)
    }
    catch (err) {
        console.error("Error in getting blogs by search :", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})
app.put("/updateBlog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const result = await updateById(id, updatedData);
        if (!result.success) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        console.error("Error updating blog:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
app.delete("/deleteBlog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteById(id);
        if (!result.success) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        console.error("Error deleting blog:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
process.on("SIGINT", async () => {
    await disconnectDb();
    process.exit();
})