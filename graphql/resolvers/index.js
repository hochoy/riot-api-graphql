/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
const axios = require('axios');
const _ = require('lodash');
require('dotenv').config();

// load environment variables
const { RIOT_API_TOKEN } = process.env;

// declare temporary constants

const SUMMONER_BY_NAME_BASE_URL = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

const MATCH_LIST_BY_ACCOUNT_ID_BASE_URL = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/';

const MATCH_BY_ID_BASE_URL = 'https://na1.api.riotgames.com/lol/match/v4/matches/';

const AXIOS_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'X-Riot-Token': RIOT_API_TOKEN,
  },
};

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
      const { accountId, nLatestMatchesToShow } = args;

      const finalUrl = `${MATCH_LIST_BY_ACCOUNT_ID_BASE_URL}${accountId}`;

      const response = await axios.get(finalUrl, AXIOS_CONFIG);

      if (response.data) {
        const {
          matches: allMatchRefs,
          startIndex,
          endIndex,
          totalGames,
        } = response.data;

        if (nLatestMatchesToShow) {
          const latestMatchRefs = allMatchRefs.slice(0, nLatestMatchesToShow);

          return latestMatchRefs;
        }

        return allMatchRefs;
      }

      throw new Error(`No matches found for account ID: ${accountId}`);
    },
    matchById: async (obj, args, ctx, info) => {
      const { matchId } = args;

      const finalUrl = `${MATCH_BY_ID_BASE_URL}${matchId}`;

      const response = await axios.get(finalUrl, AXIOS_CONFIG);

      console.log(response.data);

      return response.data;
    },
    matchHistory: (obj, args, ctx, info) => {
      // TODO: Combine into single endpoint
    },
  },
};

module.exports = resolvers;
