const Biiggie = require("../models/Biiggie.js");

const resolvers ={
  // Temp resolver for server testing
  Query:{
    user: ()=>{
      return {message: 'you got a user'}
    },
    biiggies: async ()=>{
      return await Biiggie.find({})
    }
  }
}
// Temp resolver for server testing

module.exports = resolvers