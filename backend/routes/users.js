const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/owners', userController.getAllOwners);
router.get('/seekers', userController.getAllSeekers);
router.get('/:id', userController.getUserById);

module.exports = router; 