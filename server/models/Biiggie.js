const { Schema, model } = require('mongoose');

const biiggieSchema = new Schema({
    title: {
        type: String,
        required: true,
    }
})