const { gql } = require('apollo-server');

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
    spell1Id: Int
    spell2Id: Int
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

module.exports = typeDefs;
