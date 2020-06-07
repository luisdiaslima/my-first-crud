const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    res.render('login');
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

    if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function(){
        return res.redirect('back');
        });
    return;
    }

    req.flash('success','Seu cadastro foi realizado com sucesso!');
    req.session.save(function(){
    return res.redirect('back');
    });

    } catch (e) {
        console.log(e)
       return res.render('404');
    }
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.logar();

    if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function(){
        return res.redirect('back');
        });
    return;
    }

    req.flash('success','Logado.');
    req.session.user = login.user;
    req.session.save(function(){
    return res.redirect('back');
    });

    } catch (e) {
        console.log(e)
       return res.render('404');
    }
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/login/index');
}
