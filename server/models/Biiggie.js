const { Schema, model } = require('mongoose');

const biiggieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    sources: {
        type: Array,
    },
    images: {
        type: String,
    },
    helpOptions: [
        
    ]
})