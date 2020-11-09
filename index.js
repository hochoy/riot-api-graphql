/* eslint-disable no-unused-vars */
// const { ApolloServer, gql } = require('apollo-server-lambda');
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    welcome: String
  }

`;

const resolvers = {
  Query: {
    welcome: (_obj, _arg, _ctx, _info) => 'welcome to the API',
  },
};

const serverConfig = {
  typeDefs,
  resolvers,
};

const server = new ApolloServer(serverConfig);

// Option 1: Use `apollo-server` to deploy on an EC2 instance
server.listen({ port: 4000 });

// Option 2: Use `apollo-server-lambda` to deploy on Lambda

// // TODO: what is credentials: true for?
// const handlerOptions = {
//   cors: {
//     origin: '*',
//     credentials: true,
//   },
// };

// module.exports.graphqlHandler = server.createHandler(handlerOptions);
