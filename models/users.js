const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique:true
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
}]
});

UserSchema.plugin(passportLocalMongoose); //It adds on a fied for username and password, ensures that the users are unique and give us aditional methods

module.exports = mongoose.model('User', UserSchema);