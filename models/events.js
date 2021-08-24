const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const EventSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    initDate: Date,
    endDate: Date,
    isSecret: Boolean,

})

module.exports = mongoose.model('Event', EventSchema);