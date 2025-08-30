const Blog = require('../models/Blog');
const BlogCategory=require('../models/BlogCategory');
const { default: slugify } = require('slugify');

//-----------------------------create blog----------------------------------

exports.createBlog = async (req, res) => {
    // console.log(req.body,req.file)
    try {

        // console.log(req.body,"req.body")
        const { title, content, metatitle, metadescription, metakeywords,category,excerpt} = req.body;
        const images= req.cloudinaryImages;
        const author = req.user.id;
        // console.log(req.user,"author")
        // const category = req.body.category;

        // Validate incoming data
        if (!title || !content || !images) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create a new blog post
        const blog = new Blog({
            title,
            content,
            metatitle,
            metadescription,
            metakeywords,
            images,  
            author,
            category,
            excerpt
        });

        // Save the blog to the database
        await blog.save();

        return res.status(201).json({
            message: 'Blog post created successfully!',
            blog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create blog post', error: error.message });
    }
}



//-----------------------------get all blogs----------------------------------

exports.getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate('author', 'username').populate('category', 'categoryname slug').sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};



//----------------------------------get blog by category--------------------------


exports.getBlogByCategory = async (req, res) => {
    const slug  = req.params.id;
    console.log(slug)

    try {
        // Step 1: Find the category based on the slug
        const category = await BlogCategory.findOne({ slug: slug });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Step 2: Find all blogs that belong to this category
        const blogs = await Blog.find({ category: category._id })
            .populate('author', 'username')
            .populate('category', 'slug'); // Only return slug here if needed

        // Step 3: Return the blogs
        return res.json({ success: true, blogs });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};





//-----------------------------get single blog by Id----------------------------------

exports.getBlogById = async (req, res) => {
        try {
            const slug = req.params.id;
            console.log(slug,"slug")
          
            const blog = await Blog.findById( slug ).populate('author', 'username').populate('category', 'categoryname slug');
            if (!blog) return res.status(404).json({ message: 'Blog not found' });
            res.status(200).json(blog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to retrieve blog', error: error.message });
        }
    };



    //-----------------------------get single blog by slug----------------------------------


    exports.getBlogBySlug = async (req, res) => {
        try {
            const slug = req.params.id;
            console.log(slug,"slug")
          
            const blog = await Blog.findOne({ slug: slug }).populate('author', 'username').populate('category', 'categoryname slug');
            if (!blog) return res.status(404).json({ message: 'Blog not found' });
            res.status(200).json(blog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to retrieve blog', error: error.message });
        }
    };

    
    //-----------------------------update blog----------------------------------


    exports.updateBlog = async (req, res) => {
        try {
          const slug = req.params.id;
          const { title, content, metatitle, metadescription, metakeywords, category, excerpt } = req.body;
      
   
      
          const newImages = req.cloudinaryImages; // uploaded images (if any)
            // Build update object
            const updateData = {
                title,
                content,
                metatitle,
                metadescription,
                metakeywords,
                category,
                excerpt,
          
              };

              if (newImages && newImages.length > 0) {
                updateData.images = newImages;
              }

          const blog = await Blog.findByIdAndUpdate(slug, updateData, { new: true });
      
          if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
          }
      
          return res.status(200).json({ message: "Updated successfully", blog });
        } catch (error) {
          return res.status(500).json({ message: "Failed to update blog", error: error.message });
        }
      };
      


    //-------------------------------------------delete blog------------------------------

    exports.deleteBlog = async (req, res) => {
        try {
            const { id } = req.params;  // Access id directly from req.params
            console.log(id)
            const blog = await Blog.findByIdAndDelete(id);

            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            return res.status(200).json({ message: "Deleted successfully" });

        } catch (error) {
            return res.status(500).json({ message: "Failed to delete", error: error.message });
        }
    };