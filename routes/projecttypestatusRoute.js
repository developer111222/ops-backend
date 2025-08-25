const express = require('express');
const router = express.Router();
const { createProjectTypeStatus, getProjectTypeStatus, updateProjectTypeStatus, deleteProjectTypeStatus } = require('../controller/projecttypestatusController');
const {authorizationUser,authorizationRoles}=require('../middleware/authMiddleware')

router.post('/createProjectTypeStatus', authorizationUser,authorizationRoles("admin"), createProjectTypeStatus);
router.get('/getProjectTypeStatus', authorizationUser,authorizationRoles("admin"), getProjectTypeStatus);
router.put('/updateProjectTypeStatus/:id', authorizationUser,authorizationRoles("admin"), updateProjectTypeStatus);
router.delete('/deleteProjectTypeStatus/:id', authorizationUser,authorizationRoles("admin"), deleteProjectTypeStatus);

module.exports = router;