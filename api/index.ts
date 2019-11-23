import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import { EmailAddressResolver } from "graphql-scalars";
import { GraphQLJSON, GraphQLJSONObject } from "graphql-type-json";
import { resolve } from "path";
import { buildSchema } from "type-graphql";

import { authChecker } from "@utils/authChecker";
import { buildContext } from "@utils/buildContext";

const schema = buildSchema({
  resolvers: [
    resolve(__dirname, "./resolvers/*.ts"),
    GraphQLJSON.toString(),
    GraphQLJSONObject.toString(),
    EmailAddressResolver.toString(),
  ],
  authChecker,
  emitSchemaFile: true,
  validate: true,
});

const app = express();

app.use(cookieParser());

(async () => {
  const apolloServer = new ApolloServer({
    schema: await schema,
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    context: ({ req, res }) => buildContext({ req, res }),
    introspection: true,
    debug: process.env.NODE_ENV !== "production",
  });
  apolloServer.applyMiddleware({
    app,
    path: "/api/graphql",
  });

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    )
  );
})();