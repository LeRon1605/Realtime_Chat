const mongoose = require('mongoose');
const { Schema } = mongoose;

const userShema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', userShema);