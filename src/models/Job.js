const mongoose = require('mongoose');
const user = require('./User');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})