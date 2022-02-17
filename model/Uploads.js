const mongoose = require('mongoose');

const uploadsSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: true
    },
    location:{
        type: Object,
        required: true
    },
    imagepath:{
        type: String,
        required: true
    },
    timestamp:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Uploads', uploadsSchema);