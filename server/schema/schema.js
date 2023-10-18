const { projects, clients } = require("../sampleData.js");

// ! First, import 'GraphQLObjectType' since we will need to create types
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
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
        clients: {
            type: new GraphQLList(ClientType), // Since it is a list of 'clients', we need to import 'GraphQLList'. For this usage 'GraphQLList(ClientType)' graphQL list of type ClientType
            // No 'id' is required since we will be getting all clients
            resolve(parent, args) {
                return clients;
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } }, // This code is to tell that 'id' is required with the type 'GraphQLID'
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
