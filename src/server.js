const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs/schema");
const resolvers = require("./resolvers");
const { verifyToken } = require("./utils/auth");
require("dotenv").config();

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = verifyToken(token.replace("Bearer ", ""));
    return { user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server started at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
