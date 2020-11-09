# Instructions for a future dev

## basic setup

```bash
mkdir riot-api-graphql && cd ./riot-api-graphql

touch .gitignore # .env* node_modules .DS_Store
touch README.md

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:hochoy/riot-api-graphql.git
git push -u origin main
```

## libraries

```bash

npm init

npm install \
apollo-server-lambda \
graphql \
axios \
lodash \
moment

```

## linting
```bash
npm install eslint --save-dev

./node_modules/.bin/eslint --init
```

## basic server
https://www.apollographql.com/docs/apollo-server/deployment/lambda/

```bash
touch index.js
```

## Serverless deployment

https://www.apollographql.com/docs/apollo-server/deployment/lambda/#configuring-the-serverless-framework
https://www.serverless.com/framework/docs/providers/aws/guide/quick-start/

```bash
npm i -g serverless

aws configure

touch serverless.yml

serverless deploy
```

to inspect what has been deployed:
https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy-list/
```bash
serverless deploy list

serverless deploy list functions
```

to invoke function via serverless (not very useful for GraphQL, just use Postman):
https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke/
https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/

```bash
serverless invoke -f hello -l
serverless invoke local -f hello -l
```

to deploy it locally
https://www.serverless.com/plugins/serverless-offline

```bash
npm i -g serverless-offline

# or

npm i serverless-offline --save-dev

# then, add the following to serverless.yml
plugins:
  - serverless-offline

# then, run this, once ready, it will print the port and path
serverless offline
```


## moving typeDefs and resolvers into sub-folders


## calling REST API via `axios`
https://developer.riotgames.com/apis#summoner-v4
https://developer.riotgames.com/apis#match-v4
https://developer.riotgames.com/docs/lol#data-dragon_champions

## handling rate limits


## caching and dataloader


## scaling (CDN, caching strategy, pre-computation, cold starts)