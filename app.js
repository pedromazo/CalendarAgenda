const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/users');
const flash = require('connect-flash');
const eventsRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const ExpressError = require('./utils/ExpressErrors');

app.engine('ejs', ejsMate); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true})) //need to tell the express to parse the data
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'secretword',
    resave: false,
    saveUninitialized: false,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
app.use(flash());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', userRoutes);
app.use('/events', eventsRoutes);

mongoose.connect('mongodb://localhost:27017/calendar', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection OPEN!")
}).catch(err => {
    console.log("oh no, error")
    console.log(err)
});


const db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.all('*',(req,res,next) => {
    next(new ExpressError('Page not found', 404))
});

app.use((err,req,res,next) => { //middleware for hangling errors
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Algo de errado não está certo...';
    res.status(statusCode).render('error', { err });

});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

