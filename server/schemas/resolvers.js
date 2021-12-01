const { AuthenticationError } = require('apollo-server-errors');
const Biiggie = require('../models/Biiggie.js');
const User = require('../models/User');


const resolvers ={
  // Temp resolver for server testing
  Query:{
    user: async (parent, { _id })=>{
      const params = _id ? { _id } : {};
      return User.findOne(params);
    },
    biiggies: async ()=>{
      return await Biiggie.find({})
    },
    authBiggiesReq: async (parent, args, context)=>{
      console.log('Context looks like this:', context.user)
      if(!context.user){
        throw new AuthenticationError('You need to be logged in to pull these Biggies')
      }
      return await Biiggie.find({})
    }
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