const { AuthenticationError } = require('apollo-server-errors');
const {Biiggie, User, HelpOption} = require('../models/index.js')
const { signToken } = require('../utils/index.js');


const resolvers ={
  // Temp resolver for server testing
  Query:{
    user: async (parent, { _id })=>{
      const params = _id ? { _id } : {};
      return User.findOne(params);
    },
    biiggies: async ()=>{
      return await Biiggie.find({}).populate('helpOptions')
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
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user with this username found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    commitToHelp: async (parent, args, context)=>{
      console.log('Context looks like this:', context.user)

      if(!context.user){
        throw new AuthenticationError('You need to be logged in to commit to an Idea.')
      }

      console.log(context.user)

      let helpOption = await HelpOption.findOneAndUpdate({id: args.helpOptionId}, {$addToSet: {registeredUsers: context.user._id}}, {new:true} )

      console.log(helpOption)
      return helpOption
      //need to add user to the help option as a new item in the 'registeredUsers' array

      //then i want to update the button to say weather 
    }
  }
}
// Temp resolver for server testing

module.exports = resolvers