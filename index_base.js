/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
// const { ApolloServer, gql } = require('apollo-server-lambda');
const { ApolloServer, gql } = require('apollo-server');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

// declare constants
const PORT = 4000;

// define context (per request)
const createContext = (requestContext) => {
  
  const { body } = requestContext.req;
  const { headers } = requestContext.req;

  return {};
};

const serverConfig = {
  typeDefs,
  resolvers,
  context: createContext,
};

const server = new ApolloServer(serverConfig);

(async () => {
  
  console.log('Starting server at port: ', PORT);

  await server.listen({ port: PORT });
  
})();
