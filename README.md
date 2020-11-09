# (Non-official) Riot Games API in GraphQL

Purpose:
This API returns the match history for any given summoner name. For each match, tt provides
the following information:

1. outcome (victory or defeat)
2. game duration
3. summoner name
4. summoner spells
5. summoner perks
6. champion name
7. K/DA (kills, deaths, assists)
8. items bought during the match (names should be fine don't need any icons)
9. champion level in the match
10. total creep score
11. creep score per minute (total creeps divided by game duration)