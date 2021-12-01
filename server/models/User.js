const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
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
  if(this.password) {                                                                                                                                                        
    let salt = bcrypt.genSaltSync(10)                                                                                                                                     
    this.password  = bcrypt.hashSync(this.password, salt)
  next()
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
