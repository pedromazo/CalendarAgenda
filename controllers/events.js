const Event = require('../models/events');
const User = require('../models/users');
const {auxMonth, comparar} = require('../middleware')


module.exports.renderHome = (req,res) => {
    res.render('home.ejs')
};

module.exports.renderNew = (req, res) => {
    res.render('events/new')
};

module.exports.eventList = async (req,res) => {
    let year, day, month = '';
    if(req.query){
        month=req.query.month;
        year=req.query.year;
        day=req.query.day;
    };
    const user = await User.findById(req.user._id).populate('events');
    const eventosUnsorted = user.events;
    const eventos = eventosUnsorted.sort(comparar);
    res.render('events/index', { eventos, auxMonth, year, day, month})
};

module.exports.createEvent = async (req, res) => {
     const event = new Event(req.body.event);
     event.author = req.user._id;
     const autor = await User.findById(req.user._id).populate('events');
     autor.events.push(event);
     await autor.save();
     await event.save();
     req.flash('success', 'Evento criado com sucesso!')
    res.redirect('/events');
};

module.exports.showEvent = async (req, res) => {
    try{
    const { id } = req.params;
    const evento = await Event.findById(id).populate('author');
    res.render('events/show', { evento, auxMonth })
    }catch{
        req.flash('error','Evento não encontrado')
        res.redirect('/events')
    }
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
    const autor = await User.findById(req.user._id).populate('events');
    await autor.updateOne({$pull: {events: {$in: id}}});
    req.flash('success', 'Evento excluído com sucesso!');
    res.redirect('/events');
};