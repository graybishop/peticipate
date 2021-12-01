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
        },
        moneyRequested: {
          type: Number,
        },
        moneyRecieved: {
          type: Number,
        },
      },
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
