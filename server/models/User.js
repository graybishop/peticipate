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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eo_circle_orange_letter-b.svg/2048px-Eo_circle_orange_letter-b.svg.png'
    },
    createdBiiggies: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Biiggie'
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

UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
