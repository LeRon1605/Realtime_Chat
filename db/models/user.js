const mongoose = require('mongoose');
const { Schema } = mongoose;

const userShema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    fbID: {
        type: String, 
        default: null
    },
    ggID: {
        type: String, 
        default: null
    },
    authType: {
        type: String,
        enum: [ 'local', 'google', 'facebook' ],
        default: 'local'
    }
})

module.exports = mongoose.model('user', userShema);