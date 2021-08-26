const Event = require('../models/events');
const User = require('../models/users')
// const {monthProperties} = require('../months')

module.exports.renderHome = (req,res) => {
    res.render('home.ejs')
};

module.exports.renderNew = (req, res) => {
    res.render('events/new')
};

module.exports.eventList = async (req,res) => {
    const user = await User.findById(req.user._id).populate('events');
    const eventos = await Event.find({author:req.user._id});
    const auxMonth = {
        mes:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto','Setembro', 'Outubro', 'Novembro', 'Dezembro']
    };
    res.render('events/index', { eventos, auxMonth})
};

module.exports.createEvent = async (req, res) => {
     const event = new Event(req.body.event);
     event.author = req.user._id;
     const autor = await User.findById(req.user._id).populate('events');
     autor.events.push(event);
     console.log(autor)
     await autor.save();
     await event.save();
     req.flash('success', 'Evento criado com sucesso!')
    res.redirect('/events');
};

module.exports.showEvent = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    const evento = await Event.findById(id).populate('author');
    // console.log(evento)
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
    const autor = await User.findById(req.user._id).populate('events');
    console.log(autor);
    // await autor.updateOne({$pull: {events: {_id: id}}});
    // console.log(autor)
    autor.events.pop(evento);
    await autor.save();
    console.log('AAAAAAAAA', autor)
    req.flash('success', 'Evento excluído com sucesso!')
    res.redirect('/events');
};