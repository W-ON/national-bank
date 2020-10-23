import { ApolloServer } from 'apollo-server'
import connectMongoose from './clients/mongoose'

function server({ typeDefs, resolvers}) {
  connectMongoose()

  const apolloServer = new ApolloServer({ typeDefs, resolvers})
  apolloServer.listen().then(({url}) => console.log(`Server Started at ${url}`))
}
 
export default server