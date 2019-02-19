import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import cors from 'cors';
import schema from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import models, { sequelize } from './server/models';


const app = express();

app.use(cors());

const start = async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      models,
      me: await models.User.findByLogin('samcotech'),
    }
  });
  
  server.applyMiddleware({ app, path: '/graphql' });
  
  // sequelize.sync().then(async () => {
  //   app.listen({ port: 8000 }, () => {
  //     console.log(`🚀 Apollo Server on http://localhost:8000${server.graphqlPath}`);
  //   });
  // });
  
  app.listen({ port: 8000 }, () => {
    console.log(`🚀 Apollo Server on http://localhost:8000${server.graphqlPath}`);
  });
}

start();
