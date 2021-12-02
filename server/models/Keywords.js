const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KeywordSchema = new Schema(
    {
        keyword:{
            type: String,
            require: true,
        },
        biiggie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Biiggie'
        }
    },
);

const Keywords = mongoose.model("Keywords", KeywordSchema);

module.exports = Keywords;