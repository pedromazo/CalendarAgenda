const mongoose = require('mongoose');
const { Schema } = mongoose;


const EventSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    eventName: {
        type: String,
        required: true
    },
    eventDescrip: String,
    initDate: {
        type: String,
        required: true
    },
    initTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    isSecret: Boolean

})

module.exports = mongoose.model('Event', EventSchema);