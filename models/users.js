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
}],
    invites: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

UserSchema.plugin(passportLocalMongoose); //Adiciona um campo para username e password, garante que o username é unico, adiciona varios metodos no req, entre outras coisas

module.exports = mongoose.model('User', UserSchema);