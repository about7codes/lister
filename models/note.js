const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, { timestamps: true });


module.exports = mongoose.model('Note', noteSchema);