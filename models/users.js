const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique:true
    }
});


module.exports = mongoose.model('User', UserSchema);