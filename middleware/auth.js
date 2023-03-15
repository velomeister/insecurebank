exports.isLoggedIn = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        return res.status(401).redirect('/login');
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.session.user.role != 'Administrator') {
        return res.status(401).render('401');
    }
    next();
}

exports.isAdminOrAuditor = (req, res, next) => {
    if (req.session.user.role != 'Administrator' && req.session.user.role != 'Auditor') {
        return res.status(401).render('401');
    }
    next();
}

exports.isUser = (req, res, next) => {
    if (req.session.user.role != 'User') {
        return res.status(401).render('401');
    }
    next();
}