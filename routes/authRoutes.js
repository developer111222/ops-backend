const express = require('express');
const router=express.Router();
const {usersignup,userlogin,getProfile,userlogout} =require('../controller/authController');
const {authorizationUser}=require('../middleware/authMiddleware')


//-------------------------routes-------------------

router.route('/signup').post(usersignup);
router.route('/login').post(userlogin);
router.route('/profile').get(authorizationUser,getProfile);
router.route('/logout').post(authorizationUser,userlogout);


module.exports=router;