const Biiggie = require('../models/Biiggie.js');
const User = require('../models/User');


const resolvers ={
  // Temp resolver for server testing
  Query:{
    user: async ({ _id })=>{
      const params = _id ? { _id } : {};
      return User.find(params);
    },
    biiggies: async ()=>{
      return await Biiggie.find({})
    },
  },
  Mutation: {
    newUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
  }
}
// Temp resolver for server testing

module.exports = resolvers