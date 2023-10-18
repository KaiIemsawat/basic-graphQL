const { projects, clients } = require("../sampleData.js");

// ! First, import 'GraphQLObjectType' since we will need to create types
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
} = require("graphql");

// * Client Type
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return clients.find((client) => client.id === args.id);
            },
        },
    },
});

// Export as 'GraphQLSchema' that take an object of query as 'RootQuery'
module.exports = new GraphQLSchema({
    query: RootQuery,
});
