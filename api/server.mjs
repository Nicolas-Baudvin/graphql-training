import dotenv from "dotenv";
dotenv.config();
import apollo from 'apollo-server-express';
const { ApolloServer } = apollo;
import express from 'express';
import schema from './Schema/index.mjs';
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

const server = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV || 'development',
    introspection: true,
    tracing: true,
    path: "/"
});

app.use(bodyParser.json());

server.applyMiddleware({
    app,
    path: "/",
    cors: true,
    onHealthCheck: () => new Promise((resolve, reject) => {
        if (mongoose.connection.readyState > 0)
        {
            resolve();
        } else
        {
            reject();
        }
    })
});

app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
});