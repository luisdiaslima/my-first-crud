exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.middleware2 = (req, res, next) => {

    next();
};

exports.checkCsurf = (err, req, res, next) => {
    if(err) {
        return res.render('404');
    };
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisar fazer login');
        req.session.save(() => res.redirect('/'));
        return;
    };
    next();
}