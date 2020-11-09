/* eslint-disable padded-blocks */
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

// `apollo-server-lambda` version
const createContext = ({ event, context }) => {

  const { functionName } = context;
  const { headers } = event;

  return {
    functionName,
    headers,
  };

};

const serverConfig = {
  typeDefs,
  resolvers,
  context: createContext,
};

const server = new ApolloServer(serverConfig);

// Option 2: Use `apollo-server-lambda` to deploy on Lambda

// TODO: what is credentials: true for?
const handlerOptions = {
  cors: {
    origin: '*',
    credentials: true,
  },
};

module.exports.graphqlHandler = server.createHandler(handlerOptions);
