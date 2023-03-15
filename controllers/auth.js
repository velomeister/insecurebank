const User = require('../models/user');

exports.getLoginPage = (req, res, next) => {
    res.render('auth/login', { path: '/login' });
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.fetchByEmail(email)
        .then(([user]) => {
            if (!user[0]) {
                return res.redirect('/login');
            }
            const loggedInUser = user[0];
            if (loggedInUser.password != password) {
                return res.redirect('/login');
            }
            req.session.isAuthenticated = true;
            req.session.user = loggedInUser;
            res.redirect('/');
        })
        .catch(err => console.log(err));
}

exports.logout = (req, res, next) => {
    req.session.isAuthenticated = false;
    req.session.user = null;
    res.redirect('/');
}