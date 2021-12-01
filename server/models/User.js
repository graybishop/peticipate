const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

UserSchema.pre('save', function(next) {
  bcrypt.genSalt(10, function (saltError, salt) {
    if (saltError) {
      throw saltError
    } else {
      bcrypt.hash(this.password, salt, function(hashError, hash) {
        if (hashError) {
          throw hashError
        } else {
          this.password = hash
        }

      })
    }
  })
  next()
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
