const { AuthenticationError } = require('apollo-server-errors');
const { Biiggie, User, HelpOption, Keywords, } = require('../models/index.js');
const { signToken } = require('../utils/index.js');


const resolvers = {
  // Temp resolver for server testing
  Query: {
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.findOne(params).populate('createdBiiggies').populate({ path: 'createdBiiggies', populate: [{ path: 'keywords' }, { path: 'helpOptions' }] });
    },
    biiggie: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return await Biiggie.findById(params)
        .populate('helpOptions')
        .populate('createdBy')
        .populate('comments')
        .populate({path: 'comments', populate:{ path: 'author'}});
    },
    biiggies: async () => {
      return await Biiggie.find({}).populate('helpOptions').populate('createdBy').populate('keywords').sort({likes: -1});
    },
    authBiggiesReq: async (parent, args, context)=>{
      if(!context.user){
        throw new AuthenticationError('You need to be logged in to pull these Biiggies')
      }
      return await Biiggie.find({});
    },
    keywords: async () => {
      return await Keywords.find({}).populate('biiggie').populate({ path: 'biiggie', populate: { path: 'helpOptions' } }).populate({ path: 'biiggie', populate: { path: 'helpOptions', populate: { path: 'registeredUsers' } } });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('createdBiiggies').populate({ path: 'createdBiiggies', populate: [{ path: 'keywords' }, { path: 'helpOptions' }] }).populate('liked');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
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
    createBiiggie: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to to create a Biiggie.');
      }

      const helpOptionsArray = args.helpOptions;
      console.log({ ...args });
      console.log(helpOptionsArray);
      const createHelpOptions = async () => {
        let helpOptionIds = [];
        for (let helpOption of helpOptionsArray) {
          let newHelpOptionDoc = await HelpOption.create(helpOption);
          console.log(newHelpOptionDoc);
          console.log(newHelpOptionDoc._id);
          helpOptionIds.push(newHelpOptionDoc._id);
          console.log(helpOptionIds);
        }
        console.log(helpOptionIds);
        return await createBiiggie(helpOptionIds);
      };

      const createBiiggie = async (helpOptionIds) => {
        const biiggie = await Biiggie.create({ ...args, helpOptions: helpOptionIds, createdBy: context.user._id });
        let userDocument = await User.findOne({ _id: context.user._id });
        userDocument.createdBiiggies.push(biiggie._id);
        await userDocument.save();
        return biiggie;
      };

      return await createHelpOptions();
    },
    commitToHelp: async (parent, args, context) => {
      //check that the user is logged in, if not send back an error
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to commit to an Idea.');
      }

      //find the option in the database
      let helpOption = await HelpOption.findOne({ _id: args.helpOptionId });

      //check if this option is asking for people or money
      //people route
      if (helpOption.numOfPeople) {

        //if the helpOption already has all of the commitment it needs, then just skip adding the person
        if (helpOption.registeredUsers.length < helpOption.numOfPeople) {
          helpOption = await HelpOption.findOneAndUpdate(
            { _id: args.helpOptionId },
            //addToSet will only add new entries if they are not already in the array
            { $addToSet: { registeredUsers: context.user._id } },
            { new: true }
          );
        }

        //return the doc to apollo to serve to the client
        return helpOption;
      }

      // Money route
      if (helpOption.moneyRequested) {
        if (!args.moneyCommitted) {
          throw new Error('If the help option is asking for a money commitment, we need a moneyCommitted variable in the mutation.');
        }
        if (helpOption.moneyReceived < helpOption.moneyRequested) {

          //add the committed money to the money received
          helpOption.moneyReceived = args.moneyCommitted + helpOption.moneyReceived;
          console.log('value of money received:', helpOption.moneyReceived);

          //if the commitment is over the requested amount, set the total money received to be the requested amount
          if (helpOption.moneyReceived > helpOption.moneyRequested) {
            helpOption.moneyReceived = helpOption.moneyRequested;
          }
        }

        //save any changes made to document to the database
        helpOption.save();
        //return the doc to apollo to serve to the client
        return helpOption;
      }
    },
    addComment: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to commit to an Idea.');
      }

      let newComment = {
        author: context.user._id,
        body: args.body
      };

      let biiggie = await Biiggie.findById(args.biiggieId);

      biiggie.comments.push(newComment);

      await biiggie.save();

      return biiggie;
    },
    addLike: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to like an Idea.');
      }

      let user = await User.findById(context.user._id);

      user.liked.push(args.biiggieId);

      await user.save();

      return user;
    },
  }
};
// Temp resolver for server testing

module.exports = resolvers;