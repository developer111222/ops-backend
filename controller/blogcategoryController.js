const BlogCategory = require('../models/BlogCategory')
const Blog = require('../models/Blog');
//----------------------------------create category------------------------
exports.createBlogCategory = async (req, res) => {
    const {categoryname,categorydescription} = req.body;
console.log(req.body)
    try {
        let categorydata = await BlogCategory.findOne({categoryname})
        if (categorydata) {
            return res.status(400).json({ message: "category already exists" })
        }

        categorydata = new BlogCategory({categoryname,categorydescription});
        await categorydata.save();
        return res.status(201).json({
            success: true,
            message: "Blog category created successfully",

        });
    } catch (error) {
      console.log(error)
        res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
};

//----------------------------------get all categories------------------------
exports.getAllBlogCategories = async (req, res) => {
    try {
      // Get all categories from the database
      const categories = await BlogCategory.find();
  
      // For each category, count the number of blogs associated with it.
      const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          const blogCount = await Blog.countDocuments({ category: category._id });
          // Convert the Mongoose document to a plain object and add blogCount
          return { ...category.toObject(), blogCount };
        })
      );
  
      return res.status(200).json({
        success: true,
        categories: categoriesWithCounts
      });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
        error: error.message
      });
    }
  };
  

// --------------------get single category------------------------
exports.getSingleBlogCategory = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      const category = await BlogCategory.findById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(200).json({ category });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "server error",
        error: error.message
      });
    }
  };


exports.deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;
        console.log(id)
        const category = await BlogCategory.findByIdAndDelete(id);

        return res.status(200).json({ messag: "deleted successfully" })


    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
}


//----------------------update-----------------------

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryname, categorydescription } = req.body;
        const category = await BlogCategory.findByIdAndUpdate(id, { categoryname, categorydescription });
        return res.status(200).json({ message: "updated successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
}
