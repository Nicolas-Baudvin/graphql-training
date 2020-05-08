import graphQLCompose from 'graphql-compose';
import auth from '../Schema/resolvers/auth.mjs';
const { SchemaComposer, ObjectTypeComposer, GraphQLJSON } = graphQLCompose;

import db from '../Utils/db.mjs';

const schemaComposer = new SchemaComposer();

import { UserQuery } from './user.mjs';
import { UserMutation } from './user.mjs';
import graphql from 'graphql';
const { GraphQLObjectType, GraphQLString } = graphql;

schemaComposer.Query.addFields({
    ...UserQuery,
    connectUser: {
        schemaComposer,
        name: "connectUser",
        displayName: "User",
        kind: "query",
        type: GraphQLJSON,
        args: {
            username: "String",
            password: "String"
        },
        projection: {},
        resolve: (parentValue, args) => auth(parentValue, args),
    }
});

schemaComposer.Mutation.addFields({
    ...UserMutation
});

export default schemaComposer.buildSchema();
