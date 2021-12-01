const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HelpOptionsSchema = new Schema({
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
          contributor: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User'
            }
          ],
          biiggie: [
              {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Biiggie'
              }
          ]
        },
    ]
});

const HelpOptions = mongoose.model("HelpOptions", HelpOptionsSchema);

module.exports = HelpOptions;