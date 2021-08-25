const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique:true
    }
});

UserSchema.plugin(passportLocalMongoose); //It adds on a fied for username and password, ensures that the users are unique and give us aditional methods

module.exports = mongoose.model('User', UserSchema);