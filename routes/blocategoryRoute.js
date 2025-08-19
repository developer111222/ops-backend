const express = require('express');
const router = express.Router();
const { createBlogCategory,getAllBlogCategories,deleteCategory
} = require('../controller/blogcategoryController');
const {upload,uploadToCloudinary} = require('../middleware/uploadMiddleware');
const { authorizationUser,
    authorizationRoles } = require('../middleware/authMiddleware');


router.route('/create-category').post(
    // authorizationUser,authorizationRoles('admin'),
    createBlogCategory);
router.route('/get-all-category').get(getAllBlogCategories);
router.route('/delete-category/:id').delete(
    // authorizationUser,authorizationRoles('admin'),
    deleteCategory)


module.exports=router