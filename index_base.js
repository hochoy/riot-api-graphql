/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
// const { ApolloServer, gql } = require('apollo-server-lambda');
const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
require('dotenv').config();
const _ = require('lodash');

// load environment variables
const { RIOT_API_TOKEN } = process.env;

// declare constants
const PORT = 4000;

const SUMMONER_BY_NAME_BASE_URL = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

const MATCH_LIST_BY_ACCOUNT_ID_BASE_URL = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/';

const MATCH_BY_ID_BASE_URL = 'https://na1.api.riotgames.com/lol/match/v4/matches/';

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

  type MatchReference {
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

  type Match {
    gameId: Float
    participantIdentities: [ParticipantIdentity!]
    queueId: Int
    gameType: String
    gameDuration: Float
    teams: [TeamStats]
    platformId: String
    gameCreation: Float
    seasonId: Int
    gameVersion: String
    mapId: Int
    gameMode: String
    participants: [Participant]
    
  }

  type ParticipantIdentity {
    participantId: Int
    # player: Player
  }

  type Player {
    profileIcon: Int
    accountId: String
    matchHistoryUri: String
    currentAccountId: String
    currentPlatformId: String
    summonerName: String
    summonerId: String
    platformId: String
  }

  type TeamStats {
    towerKills: Int
    riftHeraldKills: Int
    firstBlood: Boolean
    inhibitorKills: Int
    # bans: [TeamBans]
    firstBaron: Boolean
    firstDragon: Boolean
    dominionVictoryScore: Int
    dragonKills: Int
    baronKills: Int
    firstInhibitor: Boolean
    firstTower: Boolean
    vilemawKills: Int
    firstRiftHerald: Boolean
    teamId: Int
    win: String
  }

  type Participant {
    participantId: Int
    championId: Int
    # runes: [Rune]
    stats: ParticipantStats
    teamId: Int
    # timeline: ParticipantTimeline #IMPORTANT
    spell1ld: Int
    spell2ld: Int
    highestAchievedSeasonTier: String
    # masteries: [Mastery]
  }
  
  # too long to include all
  type ParticipantStats {
    kills: Int
    deaths: Int
    assists: Int
    """
    Final items
    """
    item0: Int
    item1: Int
    item2: Int
    item3: Int
    item4: Int
    item5: Int
    item6: Int
    """
    Champion level
    """
    champLevel: Int
    """
    Total minions killed
    """
    totalMinionsKilled: Int

  }

  type MatchHistory {
    matchId: String
    outcome: String
    gameDuration: Float
    summonerName: String
    summonerSpells: [String]
    # summonerPerks
    championName: String
    KDA: Float
    kills: Int
    deaths: Int
    assists: Int
    itemsBought: [String]
    champLevel: Int
    totalMinionsKilled: Int
    minionsKilledPerMinute: Float
  }

  type Query {
    welcome: String,
    summonerByName(name: String!): Summoner
    matchListByAccountId(accountId: String!, nLatestMatchesToShow: Int): [MatchReference!]
    matchById(matchId: String!): Match
    matchHistory(summonerName: String!): [MatchHistory]
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

      return response;
    },
    matchHistory: (obj, args, ctx, info) => {
      // TODO: Combine into single endpoint
    },
  },
};

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
