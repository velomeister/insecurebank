const User = require('../models/user');
const Transfer = require('../models/transfer');
const Overdraft = require('../models/overdraft');

exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        path: '/admin/add-user',
        isAuthenticated: req.session.isAuthenticated,
        role: req.session.user.role
    })
};

exports.addUser = (req, res, next) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    User.save(fullName, email, password, 0);
    res.redirect('/');
}

exports.getUsers = (req, res, next) => {
    User.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('admin/users', {
                users: rows,
                path: '/admin/users',
                isAuthenticated: req.session.isAuthenticated,
                role: req.session.user.role
            });
        })
        .catch(err => console.log(err));
}

exports.getTransfers = (req, res, next) => {
    const userId = req.params.userId;
    Transfer.fetchByUser(userId)
        .then(([rows, fieldData]) => {
            res.render('bank/transfers', {
                transfers: rows,
                path: '/transfers',
                isAuthenticated: req.session.isAuthenticated,
                role: req.session.user.role
            });
        })
        .catch(err => console.log(err))
}

exports.getPendingOverdrafts = (req, res, next) => {
    const userId = req.params.userId;
    Overdraft.fetchByUser(userId)
        .then(([rows, fieldData]) => {
            res.render('admin/overdrafts', {
                overdrafts: rows,
                path: '/admin/manage-overdrafts',
                isAuthenticated: req.session.isAuthenticated,
                role: req.session.user.role
            })
        })
        .catch(err => console.log(err))
}

exports.manageOverdraft = (req, res, next) => {
    const requestId = req.body.requestId;
    const isApproved = req.body.isApproved;
    Overdraft.fetch(requestId)
        .then(([result]) => {
            const overdraft = result[0];
            Overdraft.manageOverdraft(overdraft.id, overdraft.userId, isApproved, overdraft.amount);
        })
        .catch(err => console.log(err))
    setTimeout(() => {
        res.redirect('/admin/users')
    }, 500)
}