const path = require('path');

const express = require('express');

const bankController = require('../controllers/bank')
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', bankController.getIndex);

router.get('/make-transfer', authMiddleware.isLoggedIn, authMiddleware.isUser, bankController.getMakeTransfer);

router.post('/make-transfer', authMiddleware.isLoggedIn, authMiddleware.isUser, bankController.makeTransfer);

router.get('/request-overdraft', authMiddleware.isLoggedIn, authMiddleware.isUser, bankController.getRequestOverdraft);

router.post('/request-overdraft', authMiddleware.isLoggedIn, authMiddleware.isUser, bankController.requestOverdraft);

router.get('/transactions', authMiddleware.isLoggedIn, authMiddleware.isUser, bankController.getTransactions);

module.exports = router;