const express = require('express');
const router = express.Router();
const {
  addCareer,
  getAllCareers,
  getCareerByID,
  deleteCareer,
  updateCareer
} = require('../controller/careerController');
const {authorizationUser, authorizationRoles}=require('../middleware/authMiddleware')

// Create a new job posting
router.post('/create-careers', authorizationUser, addCareer);

// Get all jobs
router.get('/careers', authorizationUser,authorizationRoles("admin"), getAllCareers);

// Get a job by slug
router.get('/single-careers/:id', authorizationUser,authorizationRoles("admin"), getCareerByID);

// Delete a job by ID
router.delete('/delete-careers/:id', authorizationUser,authorizationRoles("admin"), deleteCareer);

//update career
router.put('/update-careers/:id', authorizationUser,authorizationRoles("admin"), updateCareer);


module.exports = router;
