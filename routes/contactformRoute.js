const express = require('express');
const router=express.Router();
const {createContactForm, getContactFormData, deleteContactFormData} =require('../controller/ContactFormController');
const {authorizationUser,authorizationRoles}=require('../middleware/authMiddleware')


//-------------------------routes-------------------

router.route('/create-contactform').post(
    // authorizationUser,authorizationRoles("admin"),
createContactForm);
router.route('/all-contactform-data').get(
    authorizationUser,authorizationRoles("admin"),
    getContactFormData);
router.route('/delete-contactform/:id').delete(authorizationUser,authorizationRoles("admin"),deleteContactFormData)

module.exports=router
