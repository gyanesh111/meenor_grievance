// routes.js 
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Register a new user
// router.post('/register', employeeController.register);

// Login as a user
router.post('/login', employeeController.login);

module.exports = router;
