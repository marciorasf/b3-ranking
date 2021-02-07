import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { __port__ } from "./config/env";
import "./config/mongo";
import { StocksImportResolver } from "./resolvers/stock-import";

export default async function main() {
  const schema = await buildSchema({
    resolvers: [StocksImportResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({ schema });

  const app = Express();

  server.applyMiddleware({ app });

  app.listen({ port: __port__ }, () => {
    console.log(`🚀 Server listening on port ${__port__}`);
  });
}