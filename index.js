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

server.listen({ port: 4000 });
