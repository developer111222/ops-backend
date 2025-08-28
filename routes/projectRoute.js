const express = require('express');
const router=express.Router();
const {addProject, getAllProjects, getSingleProject, updateProject, deleteProject,getSingleProjectBySlug} =require('../controller/projectController');
const {authorizationUser,authorizationRoles}=require('../middleware/authMiddleware')
const {uploadToCloudinary,upload}=require('../middleware/uploadMiddleware')


//-------------------------routes-------------------

router.route('/addProject').post(
    authorizationUser,authorizationRoles("admin"),
    upload.array("images", 10),
uploadToCloudinary,
addProject);

router.route('/allProjects').get(getAllProjects);
router.route('/singleProject/:slug').get(getSingleProject);
router.route('/updateProject/:slug').put(authorizationUser,authorizationRoles("admin"),
upload.array("images", 10),
uploadToCloudinary,
updateProject);
router.route('/deleteProject/:id').delete(authorizationUser,authorizationRoles("admin"),deleteProject);
router.route('/slug/singleProject/:slug').get(getSingleProjectBySlug);

module.exports=router;
    