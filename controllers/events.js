const Event = require('../models/events');
const User = require('../models/users')

module.exports.renderHome = (req,res) => {
    res.render('home.ejs')
};

module.exports.renderNew = (req, res) => {
    res.render('events/new')
};

module.exports.eventList = async (req,res) => {
    const user = await User.findById(req.user._id).populate('events');
    const eventos = await Event.find({author:req.user._id});
    res.render('events/index', { eventos })
};

module.exports.createEvent = async (req, res) => {
     const event = new Event(req.body.event);
     event.author = req.user._id;
      const autor = await User.findById(req.user._id);
     autor.events.push(event);
     await autor.save();
     await event.save();
     req.flash('success', 'Evento criado com sucesso!')
    res.redirect('/events');
};

module.exports.showEvent = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const evento = await Event.findById(id).populate('author');
    console.log(evento)
    res.render('events/show', { evento })
};

module.exports.showFormEdit = async (req, res) => {
    const { id } = req.params;
    const evento = await Event.findById(id)
    res.render('events/edit', { evento })

};

module.exports.editEvent = async (req, res) => {
    const { id } = req.params;
    const evento = await Event.findByIdAndUpdate(id,{...req.body.event});
    await evento.save();
    req.flash('success', 'Evento alterado com sucesso!');
    res.redirect(`/events/${evento._id}`);
};

module.exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    const evento = await Event.findByIdAndDelete(id);
    req.flash('success', 'Evento excluído com sucesso!')
    res.redirect('/events');
};