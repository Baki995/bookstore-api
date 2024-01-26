import 'reflect-metadata'
import 'tsconfig-paths/register'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { BookResolver } from './resolvers/BookResolver'
import { AppDataSource } from './data-source'

const startServer = async (): Promise<void> => {
  const app = express()

  try {
    await AppDataSource.initialize()
    console.log('Connected to Database')
  } catch (error) {
    console.log(error)
  }

  const schema = await buildSchema({
    resolvers: [BookResolver],
    validate: true
  })

  const apolloServer = new ApolloServer({ schema })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`)
  })
}

startServer()
