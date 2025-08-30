const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, updateBlog,deleteBlog,getBlogByCategory,getBlogBySlug
} = require('../controller/blogController');
const {upload,uploadToCloudinary }= require('../middleware/uploadMiddleware');
const { authorizationUser,
    authorizationRoles } = require('../middleware/authMiddleware');


//-------------------------routes-------------------

router.route('/create-blog').post(
    authorizationUser, authorizationRoles('admin'),
    upload.array("images", 10), uploadToCloudinary, createBlog);
router.route('/all-blogs').get(getAllBlogs);
router.route('/single-blog/:id').get(getBlogById)
router.route('/update-blog/:id').put(
    authorizationUser, authorizationRoles('admin'), 
     upload.array("images", 10), uploadToCloudinary, updateBlog);
router.route('/delete-blog/:id').delete(authorizationUser,authorizationRoles('admin'),deleteBlog)

router.route('/blog-by-category/:id').get(getBlogByCategory)
router.route('/single-slug-blog/:id').get(getBlogBySlug)

module.exports = router;


// This is how you can use this router in your app.js file: