const Transfer = require('../models/transfer');
const Overdraft = require('../models/overdraft');

exports.getIndex = (req, res, next) => {
    res.render('bank/index', {
        path: '/',
        isAuthenticated: req.session.isAuthenticated,
        role: req.session.isAuthenticated ? req.session.user.role : ''
    });
}

exports.getMakeTransfer = (req, res, next) => {
    res.render('bank/make-transfer', {
        path: '/make-transfer',
        isAuthenticated: req.session.isAuthenticated,
        role: req.session.isAuthenticated ? req.session.user.role : ''
    });
}

exports.makeTransfer = (req, res, next) => {
    const originId = req.body.originId;
    const destinationId = req.body.destinationId;
    const amount = req.body.amount;
    Transfer.save(originId, destinationId, amount);
    res.redirect('/make-transfer');
}

exports.getRequestOverdraft = (req, res, next) => {
    res.render('bank/request-overdraft', {
        path: '/request-overdraft',
        isAuthenticated: req.session.isAuthenticated,
        role: req.session.isAuthenticated ? req.session.user.role : ''
    });
}

exports.requestOverdraft = (req, res, next) => {
    const userId = req.body.userId;
    const amount = req.body.amount;
    Overdraft.save(userId, amount);
    res.redirect('/request-overdraft');
}