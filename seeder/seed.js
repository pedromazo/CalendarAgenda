const Event = require('../models/events');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/calendar', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    const niverTest = new Event ({
        initDate: Date.now(),
        endDate: Date.now() + 1000* 60 * 60 * 24,
        isSecret: false
    });
    await niverTest.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})