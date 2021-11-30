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
        {
            name: {
                type: String,
                require: true,
            },
            description: {
                type: String,
                require: true,
            },
            numOfPeople: {
                type: Number,
            }
        }
    ]
});

const Biiggie = mongoose.model("Biiggie", biiggieSchema);

moduele.exports = Biiggie;