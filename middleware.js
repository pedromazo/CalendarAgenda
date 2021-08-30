const Event = require('./models/events');
const User= require('./models/users')


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl 
        req.flash('error', 'Você precisa se conectar antes!');
        return res.redirect('/login');
        }
        next();
};

module.exports.validateEvent = (req, res, next) => {  //garantir que o final do evento vem depois do inicio
    const {initDate, endDate, initTime, endTime} = req.body.event;
    const fim = Date.parse(`${endDate} ${endTime}`);
    const inicio = Date.parse(`${initDate} ${initTime}`);
    if(fim < inicio){
        req.flash('error', 'Evento deve terminar só depois de começar');
        return res.redirect('/events')
    }
    next();
};

module.exports.checkForConflict = async (req, res, next) => {
    const {initDate, endDate, initTime, endTime} = req.body.event;
    const { id } = req.params; //Se estamos editando um evento, teremos acesso ao id dele
    const eventos = await Event.find({'_id':req.user.events});
    const beginEvent = Date.parse(`${initDate} ${initTime}`);
    const endEvent = Date.parse(`${endDate} ${endTime}`);
    for (let evento of eventos) {
        const beginExistedEvent = Date.parse(`${evento.initDate} ${evento.initTime}`);
        const endExistedEvent = Date.parse(`${evento.endDate} ${evento.endTime}`);
         if(id != evento._id){  //garantir que um evento não conflite com ele mesmo
            if((beginEvent > beginExistedEvent && beginEvent < endExistedEvent) //Evento começa no meio de outro evento
            || (endEvent < endExistedEvent && endEvent > beginExistedEvent)    //Evento termina no meio de outro evento
            || (beginEvent > beginExistedEvent && endEvent < endExistedEvent)  //Evento esta contigo em outro evento
            || (beginEvent < beginExistedEvent && endEvent > endExistedEvent))  //Evento esta contendo outro evento
            { 
                req.flash('error', 'Este evento conflita com outro evento de sua agenda.');
                return res.redirect('/events');
             }   
        }
    }
    next();

};

module.exports.checkForConflictInvite = async (req, res, next) => {
    const { id } = req.params; //Agora temos acesso ao id do evento para qual estamos sendo convidado
    const eventos = await Event.find({'_id':req.user.events});
    const invite = await Event.findById(id);
    const beginEvent = Date.parse(`${invite.initDate} ${invite.initTime}`);
    const endEvent = Date.parse(`${invite.endDate} ${invite.endTime}`);
    for (let evento of eventos) {
        const beginExistedEvent = Date.parse(`${evento.initDate} ${evento.initTime}`);
        const endExistedEvent = Date.parse(`${evento.endDate} ${evento.endTime}`);
            if((beginEvent > beginExistedEvent && beginEvent < endExistedEvent) //Evento começa no meio de outro evento
            || (endEvent < endExistedEvent && endEvent > beginExistedEvent)    //Evento termina no meio de outro evento
            || (beginEvent > beginExistedEvent && endEvent < endExistedEvent)  //Evento esta contigo em outro evento
            || (beginEvent < beginExistedEvent && endEvent > endExistedEvent))  //Evento esta contendo outro evento
            { 
                req.flash('error', 'Este evento conflita com outro evento de sua agenda.');
                return res.redirect('/events');
             }   
        
    }
    next();

};


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const evento = await Event.findById(id);
    const convidado = await User.find({invites:id})
    if(!evento.author.equals(req.user._id) && convidado) {
        req.flash('error', 'Você não tem permissão pra isso!');
        return res.redirect('/events');
    }
    next();
};

module.exports.auxMonth = {
    mes:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto','Setembro', 'Outubro', 'Novembro', 'Dezembro']
};

module.exports.comparar = function compare(a, b) { 
    const data1= new Date(a.initDate);
    const data2 = new Date(b.initDate);

    let comparison = 0;
    if (data1 > data2) {
        comparison = 1
    } else if (data1 < data2) {
        comparison = -1
    } return comparison
};