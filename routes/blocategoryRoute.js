const express = require('express');
const router = express.Router();
const { createBlogCategory,getAllBlogCategories,deleteCategory,updateCategory,getSingleBlogCategory
} = require('../controller/blogcategoryController');
const {upload,uploadToCloudinary} = require('../middleware/uploadMiddleware');
const { authorizationUser,
    authorizationRoles } = require('../middleware/authMiddleware');


router.route('/create-category').post(
    authorizationUser,authorizationRoles('admin'),
    createBlogCategory);
router.route('/get-all-category').get(getAllBlogCategories);
router.route('/delete-category/:id').delete(
    authorizationUser,authorizationRoles('admin'),
    deleteCategory)
router.route('/update-category/:id').patch(
    authorizationUser,authorizationRoles('admin'),
    updateCategory)
router.route('/get-single-category/:id').get(
    authorizationUser,authorizationRoles('admin'),
    getSingleBlogCategory)

module.exports=router