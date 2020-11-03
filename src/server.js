import { ApolloServer } from 'apollo-server'
import mongo from './clients/mongoose'


function server({ typeDefs, resolvers}) {
  mongo.connectMongoose()

  const apolloServer = new ApolloServer({ typeDefs, resolvers,
    formatError: (err) => ({ message: err.message, status: err.status })
  })
  
  apolloServer.listen().then(({url}) => console.log(`Server Started at ${url}`))
}
 
export default server