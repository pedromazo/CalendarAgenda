const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const events = require('./controllers/events');
const Event = require('./models/events')
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/users');
const {isLoggedIn} = require('./middleware');

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
    expires: Date.now() + 1000*60*60*24*7
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

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


app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

app.get('/', (req,res) => {
    res.render('home.ejs')
});

app.get('/new', isLoggedIn, (req, res) => {
    res.render('events/new')
});

app.get('/events', isLoggedIn, async (req,res) => {
    const eventos = await Event.find({});
    res.render('events/index', { eventos })
});

app.post('/events',isLoggedIn, events.createEvent)

app.get('/events/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const evento = await Event.findById(id)
    res.render('events/show', { evento })
});

app.get('/events/:id/edit', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const evento = await Event.findById(id)
    res.render('events/edit', { evento })

});

app.put('/events/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const evento = await Event.findByIdAndUpdate(id,{...req.body.event});
    await evento.save();
    res.redirect(`/events/${evento._id}`);
});

app.delete('/events/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const evento = await Event.findByIdAndDelete(id);
    res.redirect('/events');
});

app.get('/register', (req, res) => {
    res.render('users/register');
});

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    res.redirect('/events');
});

app.get('/login', (req,res) => {
    res.render('users/login.ejs')
});

app.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), (req, res) => {
res.redirect('/events');
})

app.get('/logout', (req, res) => {
    req.logout();
    // req.flash('success','Até logo!');
    res.redirect('/');
})