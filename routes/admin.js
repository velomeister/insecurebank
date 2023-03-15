const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin')
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/users', authMiddleware.isLoggedIn, authMiddleware.isAdmin, adminController.getUsers);

router.get('/add-user', authMiddleware.isLoggedIn, authMiddleware.isAdmin, adminController.getAddUser);

router.post('/add-user', authMiddleware.isLoggedIn, authMiddleware.isAdmin, adminController.addUser);

router.get('/transfers/:userId', authMiddleware.isLoggedIn, authMiddleware.isAdmin, authMiddleware.isAuditor, adminController.getTransfers);

router.get('/manage-overdrafts/:userId', authMiddleware.isLoggedIn, authMiddleware.isAdmin, adminController.getPendingOverdrafts);

router.post('/overdrafts', authMiddleware.isLoggedIn, authMiddleware.isAdmin, adminController.manageOverdraft);

module.exports = router;