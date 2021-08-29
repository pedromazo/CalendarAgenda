const Event = require('./models/events');
const User= require('./models/users')


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
     const {initDate, endDate, initTime, endTime} = req.body.event;
     const { id } = req.params
    const eventos = await Event.find({'author':req.user._id})
    let editedEvent = await Event.findById(id)
    const beginEvent = Date.parse(`${initDate} ${initTime}`);
    const endEvent = Date.parse(`${endDate} ${endTime}`);
    for (let evento of eventos) {
        const beginExistedEvent = Date.parse(`${evento.initDate} ${evento.initTime}`);
        const endExistedEvent = Date.parse(`${evento.endDate} ${evento.endTime}`);
        if(!editedEvent) {editedEvent = ''} //caso não haja evento sendo editado
        if(editedEvent._id !== evento._id){  //garantir que um evento não conflite com ele mesmo

            if((beginEvent > beginExistedEvent && beginEvent < endExistedEvent) //Evento começa no meio de outro evento
            || (endEvent < endExistedEvent && endEvent > beginExistedEvent) //Evento termina no meio de outro evento
            || (beginEvent > beginExistedEvent && endEvent < endExistedEvent)  //Evento esta contigo em outro evento
            || (beginEvent < beginExistedEvent && endEvent > endExistedEvent)) { //Evento esta contendo outro evento
                req.flash('error', 'Este evento conflita com outro evento de sua agenda.');
                return res.redirect('/events');
            }   
        }
    }
    next();

}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const evento = await Event.findById(id);
    const convidado = await User.find({invites:id})
    if(!evento.author.equals(req.user._id) && convidado) {
        req.flash('error', 'Você não tem permissão pra isso!');
        return res.redirect('/events');
    }
    next();
}

module.exports.auxMonth = {
    mes:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto','Setembro', 'Outubro', 'Novembro', 'Dezembro']
};

// const comparar = function compare(a, b) { 
//     const data1= new Date(a.initDate);
//     const data2 = new Date(b.initDate);

//     let comparison = 0;
//     if (data1 > data2) {
//         comparison = 1
//     } else if (data1 < data2) {
//         comparison = -1
//     } return comparison
// };

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