const User = require('../models/users');
const Event = require('../models/events');
const {auxMonth, comparar}= require('../middleware');


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
    if(e.message==='A user with the given username is already registered'){
    req.flash('error','Este usuário já esta sendo usado')
    res.redirect('/register');
    } else {
    req.flash('error',e.message)
    res.redirect('/register');
    }
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

module.exports.inviteList = async (req, res) => {
    const user = await User.findById(req.user._id).populate('invites');
    const invitesUnsorted = user.invites;
    const invites = invitesUnsorted.sort(comparar);
    res.render('users/invites', {invites, auxMonth})
}

module.exports.inviteFriend = async (req, res) => {
    const { friend, eventId } = req.body;
    const event = await Event.findById(eventId);
    const user = await User.findOne({username: friend});
    if(!user){
        req.flash('error', 'Usuário não encontrado');
        res.redirect('/events')
    } else{
    user.invites.push(event);
    await user.save();
    req.flash('success','Convite Enviado!');
    res.redirect('/events')

}}

module.exports.showInvite = async (req, res) => {
    const { id } = req.params;
    const evento = await Event.findById(id).populate('author');
    res.render('users/inviteShow', {evento, auxMonth})
};

module.exports.acceptInvite = async (req, res) => {
    const { id } = req.params;
    const evento = await Event.findById(id).populate('author');
    const user = await User.findById(req.user._id)
    await user.events.push(evento);
    await user.updateOne({$pull: {invites: {$in: id}}});
    await user.save();
    req.flash('success', 'Convite aceito!')
    res.redirect('/events');
};

module.exports.declineInvite = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id)
    await user.updateOne({$pull: {invites: {$in: id}}});
    await user.save();
    req.flash('success', 'Convite recusado!')
    res.redirect('/events');
}