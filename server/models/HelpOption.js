const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HelpOptionSchema = new Schema(
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
          registeredUsers: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User'
            },
          ],
          moneyRequested: {
            type: Number,
          },
          moneyReceived: {
            type: Number,
          },
          biiggie: 
              {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Biiggie'
              }
        },

);

const HelpOption = mongoose.model("HelpOption", HelpOptionSchema);

module.exports = HelpOption;