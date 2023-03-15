exports.get400 = (req, res, next) => {
    res.status(400).render('400', {
        err: req.query.err,
        isAuthenticated: req.session.isAuthenticated
    });
}

exports.get401 = (req, res, next) => {
    res.status(401).render('401', { isAuthenticated: req.session.isAuthenticated });
}

exports.get404 = (req, res, next) => {
    res.status(404).render('404', { isAuthenticated: req.session.isAuthenticated });
}