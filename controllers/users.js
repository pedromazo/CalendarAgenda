const User = require('../models/users')

module.exports.showFormRegister = (req, res) => {
    res.render('users/register');
};

module.exports.registerUser = async (req, res) => {
    try{
    const { email, username, password } = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) return next(err);
        req.flash('success', 'Conta criada com sucesso!');
        res.redirect('/events');
    })
} catch (e) {
    req.flash('error',e.message)
    res.redirect('/register');
}
};

module.exports.login = (req, res) => {
    req.flash('success', 'Bem vindo de volta!');
    res.redirect('/events');
};

module.exports.renderLogin = (req,res) => {
    res.render('users/login.ejs');
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success','Até logo!');
    res.redirect('/');
};