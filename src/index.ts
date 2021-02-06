import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";

import "./config/mongo";
import { __dev__, __health_endpoint__, __port__ } from "./config/env";
import schema from "./schema";

const app = express();

const server = new ApolloServer({
  schema,
  playground: __dev__,
  introspection: true,
  tracing: true,
});

server.applyMiddleware({
  app,
  path: "/",
  cors: true,
  onHealthCheck: () => {
    return new Promise<void>((resolve, reject) => {
      if (mongoose.connection.readyState > 0) {
        resolve();
      } else {
        reject();
      }
    });
  },
});

app.listen({ port: __port__ }, () => {
  console.log(`🚀 Server listening on port ${__port__}`);
  console.log(`😷 Health checks available at ${__health_endpoint__}`);
});
