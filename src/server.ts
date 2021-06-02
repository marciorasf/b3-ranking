import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { PORT } from "@config/env";
import "@config/mongo";
import { StocksImportResolver } from "@resolvers/stock-import";

async function main() {
  const schema = await buildSchema({
    resolvers: [StocksImportResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({ schema });

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
}

main();
