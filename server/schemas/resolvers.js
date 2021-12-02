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
      //check that the user is logged in, if not send back an error
      if(!context.user){
        throw new AuthenticationError('You need to be logged in to commit to an Idea.')
      }

      //find the option in the database
      console.log("these are the args:", args)
      let helpOption = await HelpOption.findOne({_id: args.helpOptionId})
      console.log(helpOption)

      //check if this option involves people or money
      //people route
      if (helpOption.numOfPeople){
        //if the helpOption already has all of the commitment it needs, then just skip adding the person
        if (helpOption.registeredUsers.length < helpOption.numOfPeople){
          helpOption = await HelpOption.findOneAndUpdate({_id: args.helpOptionId}, {$addToSet: {registeredUsers: context.user._id}}, {new:true} )
        }
  
        return helpOption
      
        // Money route
      } else {
        if(helpOption.moneyReceived < helpOption.moneyRequested){

          //add the committed money to the money received
          helpOption.moneyReceived = args.moneyCommitted + helpOption.moneyReceived
          console.log('value of money received:', helpOption.moneyReceived)

          //if the commitment is over the requested amount, set it to be the requested amount
          if (helpOption.moneyReceived > helpOption.moneyRequested){
            helpOption.moneyReceived = helpOption.moneyRequested
          }

        }
        helpOption.save()
        return helpOption
      }
    }
  }
}
// Temp resolver for server testing

module.exports = resolvers