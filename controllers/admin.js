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

exports.getTransactions = (req, res, next) => {
    const userId = req.params.userId;
    User.fetchById(userId).then(([user]) => {
        const userEmail = user[0].email;
        Transfer.fetchByUser(userEmail)
            .then(([rows, fieldData]) => {
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
    })
        .catch(err => console.log(err));
}

exports.getPendingOverdrafts = (req, res, next) => {
    const userId = req.params.userId;
    User.fetchById(userId)
        .then(([user]) => {
            const userEmail = user[0].email;
            Overdraft.fetchByUserAndPendingManagement(userEmail)
                .then(([rows, fieldData]) => {
                    res.render('admin/overdrafts', {
                        overdrafts: rows,
                        path: '/admin/manage-overdrafts',
                        isAuthenticated: req.session.isAuthenticated,
                        role: req.session.user.role
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

exports.manageOverdraft = (req, res, next) => {
    const requestId = req.body.requestId;
    const isApproved = req.body.isApproved;
    Overdraft.fetch(requestId)
        .then(([result]) => {
            const overdraft = result[0];
            Overdraft.manageOverdraft(overdraft.id, overdraft.userEmail, isApproved, overdraft.amount);
        })
        .catch(err => console.log(err))
    setTimeout(() => {
        res.redirect('/admin/users')
    }, 500)
}