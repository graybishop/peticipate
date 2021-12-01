const Biiggie = require('../models/Biiggie.js');
const User = require('../models/User');

const resolvers ={
  // Temp resolver for server testing
  Query:{
    user: ()=>{
      return {message: 'you got a user'}
    },
    userById: async ({ _id }) => {
      return await User.findOne({ _id });
    },
    biiggies: async ()=>{
      return await Biiggie.find({})
    }
  }
}
// Temp resolver for server testing

module.exports = resolvers