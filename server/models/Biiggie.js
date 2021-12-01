const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BiiggieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
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
    type: Array,
  },
});

const Biiggie = mongoose.model("Biiggie", BiiggieSchema);

module.exports = Biiggie;
