// src/routers/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authControllers');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/signup', register); // Sign-up route
router.post('/login', login); // Login route

// Example protected route
router.get('/dashboard', authenticateJWT, (req, res) => {
    const {userId, email} = req.user;
  res.status(200).json({ message: `Welcome, user ${userId}, email ${email}` });
});

module.exports = router;
