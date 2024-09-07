// src/routers/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authControllers');
const authenticateJWT = require('../middleware/authenticateJWT');

const authRouter = express.Router();

authRouter.post('/signup', register);
authRouter.post('/login', login);

module.exports = authRouter;
