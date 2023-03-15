const path = require('path');

const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLoginPage);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;