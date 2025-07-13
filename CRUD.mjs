import Blog from "./models/schema.mjs";

export const addBlog = async (blogDetail) => {
  try {
    const exist = await Blog.findOne({ title: blogDetail.title }).lean();
    if (exist) {
      return { message: "Blog already exist", success: false }
    }
    const blog = new Blog(blogDetail);
    await blog.save();
    return { message: "Blog added successfully", success: true };
  }
  catch (err) {
    console.log(`Error in adding blog ${err}`)
    return { message: err.message, success: false };
  }
}

export const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find().lean();
    return { success: true, data: blogs };
  } catch (err) {
    console.error("Error fetching all blogs:", err);
    return { success: false, message: err.message };
  }
};
export const getById = async (id) => {
  try {
    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return { success: false, message: "Blog not found" };
    }

    return { success: true, data: blog };
  } catch (err) {
    console.error("Error fetching blog by ID:", err);
    return { success: false, message: err.message };
  }
};

export const getByTitle = async (title) => {
  try {
    const blogs = await Blog.find({
      title: { $regex: title, $options: 'i' }
    }).lean();

    if (!blogs.length) {
      return { success: false, message: "No matching blogs found" };
    }

    return { success: true, data: blogs };
  } catch (err) {
    console.error("Error fetching blogs by title:", err);
    return { success: false, message: err.message };
  }
};

export const updateById = async (id, updatedData) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true }).lean();
    if (!updatedBlog) {
      return { success: false, message: "Blog not found" };
    }
    return { success: true, data: updatedBlog };
  } catch (err) {
    console.error("Error updating blog:", err);
    return { success: false, message: err.message };
  }
};


export const deleteById = async (id) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id).lean();

    if (!deletedBlog) {
      return { success: false, message: "Blog not found" };
    }

    return { success: true, message: "Blog deleted successfully" };
  } catch (err) {
    console.error("Error deleting blog:", err);
    return { success: false, message: err.message };
  }
};