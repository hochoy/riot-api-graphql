/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
const { ApolloServer, gql } = require('apollo-server-lambda');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

// `apollo-server-lambda` version
const createContext = ({ event, context }) => {

  // const { functionName } = context;
  // const { headers } = event;

  // return {
  //   functionName,
  //   headers,
  // };

};

const serverConfig = {
  typeDefs,
  resolvers,
  context: createContext,
  playground: {
    endpoint: '/dev/graphql',
  },
};

const server = new ApolloServer(serverConfig);

// TODO: what is credentials: true for?
const handlerOptions = {
  cors: {
    origin: '*',
    credentials: true,
  },
};

module.exports.graphqlHandler = server.createHandler(handlerOptions);
