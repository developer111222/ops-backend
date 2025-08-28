const express = require('express');
const router=express.Router();
const {addCareerFormData, getCareerFormData, deleteCareerFormData,getCareerFormDataById} =require('../controller/CareerFormDataController');
const {authorizationUser,authorizationRoles}=require('../middleware/authMiddleware')
const { upload } = require("../utils/multer");


//-------------------------routes-------------------

router.route('/create-careerform').post(
    // authorizationUser,authorizationRoles("admin"),
    upload.single("resume"),
addCareerFormData);
router.route('/alldata').get(
    authorizationUser,authorizationRoles("admin"),
    getCareerFormData);
router.route('/delete-careerform/:id').delete(authorizationUser,authorizationRoles("admin"),deleteCareerFormData)
router.route('/get-careerform/:id').get(authorizationUser,authorizationRoles("admin"),getCareerFormDataById)

module.exports=router
