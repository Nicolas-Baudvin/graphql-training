import graphQLCompose from 'graphql-compose';
import auth from '../Schema/resolvers/auth.mjs';
const { SchemaComposer, ObjectTypeComposer, GraphQLJSON } = graphQLCompose;

import db from '../Utils/db.mjs';

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user.mjs';
import { TaskMutation, TaskQuery } from './task.mjs';

schemaComposer.Query.addFields({
    ...UserQuery,
    ...TaskQuery,
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
    ...UserMutation,
    ...TaskMutation
});

export default schemaComposer.buildSchema();
