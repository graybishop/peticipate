const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BiiggieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      type: [String],
    },
    images: {
      type: [String],
    },
    helpOptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HelpOption"
      }
    ],
    keywords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Keywords'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Biiggie = mongoose.model("Biiggie", BiiggieSchema);

module.exports = Biiggie;
