/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
// const { ApolloServer, gql } = require('apollo-server-lambda');
const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
require('dotenv').config();

// load environment variables
const { RIOT_API_TOKEN } = process.env;

// declare constants
const PORT = 4000;

const SUMMONER_BY_NAME_BASE_URL = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

const MATCH_LIST_BY_ACCOUNT_ID_BASE_URL = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/';

const AXIOS_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'X-Riot-Token': RIOT_API_TOKEN,
  },
};

// define type definitions
const typeDefs = gql`

  type Summoner {
    """
    Encrypted Summoner ID. (up to 63 characters)
    """
    id: String!
    """
    Encrypted Account ID. (up to 56 characters)
    """
    accountId: String!
    """
    Summoner name
    """
    name: String
    """
    Player Universally Unique IDentifiers (exactly 78 characters)
    """
    puuid: String!
    """
    Revision Date
    """
    revisionDate: Float
    """
    Summoner level
    """
    summonerLevel: Int
  }

  type Match {
    """
    Ex: NA1
    """
    platformId: String,
    gameId: Float,
    champion: Int,
    queue: Int,
    season: Int,
    timestamp: Float
    role: String
    lane: String
  }

  type Query {
    welcome: String,
    summonerByName(name: String!): Summoner
    matchListByAccountId(accountId: String!): [Match!]
  }

`;

// define resolvers
const resolvers = {
  Query: {
    welcome: (_obj, _args, _ctx, _info) => 'welcome to the API',
    summonerByName: async (obj, args, ctx, info) => {

      const { name } = args;

      const finalUrl = `${SUMMONER_BY_NAME_BASE_URL}${name}`;

      const response = await axios.get(finalUrl, AXIOS_CONFIG);

      const summoner = response.data;

      return summoner;

    },
    matchListByAccountId: async (obj, args, ctx, info) => {
      const { accountId } = args;

      const finalUrl = `${MATCH_LIST_BY_ACCOUNT_ID_BASE_URL}${accountId}`;

      const response = await axios.get(finalUrl, AXIOS_CONFIG);

      const matches = response.data && response.data.matches;

      return matches;
    },
  },
};

// define context (per request)
const createContext = (requestContext) => {
  const { body } = requestContext.req;
  const { headers } = requestContext.req;

  console.log('\n ======== Request context start ========');
  console.log(body);
  console.log(headers);
  console.log(' ======== Request context end ======== \n');

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
