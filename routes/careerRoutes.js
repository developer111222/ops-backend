const express = require('express');
const router = express.Router();
const {
  addCareer,
  getAllCareers,
  getCareerBySlug,
  deleteCareer,
  updateCareer
} = require('../controller/careerController');
const {authorizationUser, authorizationRoles}=require('../middleware/authMiddleware')

// Create a new job posting
router.post('/careers', authorizationUser, addCareer);

// Get all jobs
router.get('/careers', authorizationUser,authorizationRoles("admin"), getAllCareers);

// Get a job by slug
router.get('/careers/:slug', authorizationUser,authorizationRoles("admin"), getCareerBySlug);

// Delete a job by ID
router.delete('/careers/:id', authorizationUser,authorizationRoles("admin"), deleteCareer);

//update career
router.put('/careers/:id', authorizationUser,authorizationRoles("admin"), updateCareer);


module.exports = router;
