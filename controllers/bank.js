const Transfer = require('../models/transfer');
const Overdraft = require('../models/overdraft');

exports.getIndex = (req, res, next) => {
    res.render('bank/index', {
        path: '/',
        isAuthenticated: req.session.isAuthenticated,
        fullName: req.session.isAuthenticated ? req.session.user.fullName : '',
        role: req.session.isAuthenticated ? req.session.user.role : '',
        balance: req.session.isAuthenticated ? req.session.user.balance : 0,
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
    const originEmail = req.session.user.email;
    const destinationEmail = req.body.destinationEmail;
    const amount = req.body.amount;
    if (req.session.user.balance < amount) {
        return res.redirect('/400?err="Not enough money to make that transfer..."');
    }
    Transfer.save(originEmail, destinationEmail, amount);
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
    const userEmail = req.session.user.email;
    const amount = req.body.amount;
    Overdraft.save(userEmail, amount);
    res.redirect('/request-overdraft');
}

exports.getTransactions = (req, res, next) => {
    const userEmail = req.session.user.email;
    Transfer.fetchByUser(userEmail)
        .then(([rows, fetchData]) => {
            const transfers = rows;
            Overdraft.fetchByUser(userEmail)
            .then(([rows, fieldData]) => {
                res.render('bank/transactions', {
                    transfers: transfers,
                    overdrafts: rows,
                    path: '/transactions',
                    isAuthenticated: req.session.isAuthenticated,
                    role: req.session.user.role
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}