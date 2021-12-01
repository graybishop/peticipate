const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      // bcrypt
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Invalid, enter an e-mail address"],
    },
    description: {
      type: String,
    },
    createdBiiggies: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Biiggies'
        }
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
