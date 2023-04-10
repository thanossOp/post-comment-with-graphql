const express = require('express')

const app = express()

const { port, secretkey } = require('./config/credentials')

const { ApolloServer } = require('@apollo/server')

const { startStandaloneServer } = require('@apollo/server/standalone')

require('./middleware/database')

const typeDefs = require('./Schema/typeDef/allDefs')

const resolvers = require('./Schema/resolvers/allresolver')

const { json } = require('body-parser')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    includeStacktraceInErrorResponses: false
})

const startserver = startStandaloneServer(server, {
    listen: { port: port },
    context: ({ req }) => {
        const token = req.headers.authorization
        return { token }
    },
})

startserver.then((server) => {
    console.log(`appollo server starts in ${server.url}`)
})

app.use('/', json())
