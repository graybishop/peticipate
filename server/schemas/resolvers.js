const resolvers ={
  // Temp resolver for server testing
  Query:{
    user: ()=>{
      return {message: 'you got a user'}
    }
  }
}
// Temp resolver for server testing

module.exports = resolvers