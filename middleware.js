const Event = require('./models/events');


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl 
        req.flash('error', 'Você precisa se conectar antes!');
        return res.redirect('/login'); //if is not returned, the reststill runs
        }
        next();
};

module.exports.validateEvent = (req, res, next) => {
    const {initDate, endDate} = req.body.event;
    const fim = new Date(endDate);
    const inicio = new Date(initDate);
    if(fim.getTime() < inicio.getTime()){
        req.flash('error', 'Evento deve terminar só depois de começar');
        return res.redirect('/new')
    }
    next();
};

module.exports.checkForConflict = async (req, res, next) => {
     const {initDate, endDate} = req.body.event;
    const eventos = await Event.find({'author':req.user._id})
    for (let evento of eventos) {
        if((evento.initDate > initDate && evento.initDate < endDate)
         || (evento.endDate < endDate && evento.endDate > initDate)
          || (evento.initDate > initDate && evento.endDate < endDate) 
          || (evento.initDate < initDate && evento.endDate > endDate)) {
            req.flash('error', 'Este evento conflita com outro evento de sua agenda.');
            return res.redirect('/events');
        }
    }
    next();

}