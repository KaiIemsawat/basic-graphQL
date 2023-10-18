// const { projects, clients } = require("../sampleData.js");

// * Mongoose model
const Project = require("../models/Project");
const Client = require("../models/Client");

// ! First, import 'GraphQLObjectType' since we will need to create types
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require("graphql");

// * create Project Type
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                // In this case, 'parent' refer to 'name : "..."'. In this case -> "Project"
                return Client.findById(parent.clientId);
                // 'clientTd' in 'parent.clientId' comes from mongoDB
            },
        },
    }),
});

// * create Client Type
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

// * What need to be query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        projects: {
            type: new GraphQLList(ProjectType), // <-- Array of 'ProjectType's
            resolve(parent, args) {
                return Project.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            },
        },
        clients: {
            type: new GraphQLList(ClientType), // Since it is a list of 'clients', we need to import 'GraphQLList'. For this usage 'GraphQLList(ClientType)' graphQL list of type ClientType
            // No 'id' is required since we will be getting all clients
            resolve(parent, args) {
                return Client.find();
            },
        },
        client: {
            type: ClientType, // <-- this 'ClientType' comes from above function
            args: { id: { type: GraphQLID } }, // This code is to tell that 'id' is required with the type 'GraphQLID'
            resolve(parent, args) {
                return Client.findById(args.id);
            },
        },
    },
});

// * Mutation
// Then we can manipulate data/database
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // create new 'client' using 'moongoose' model
                const client = new Client({
                    // passing value from graphQL to moongoose
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                // Save
                return client.save();
            },
        },
        // Delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id);
            },
        },
    },
});

// Export as 'GraphQLSchema' that take an object of query as 'RootQuery'
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});

/* 
NOTE 

- 'resolve' is a function that you define for each field in your GraphQL schema.
It tells GraphQL how to obtain the data for that specific field.

- 'parent' is often referred to as the "parent object" or "parent value."
It represents the result of the previous resolver (the resolver for the parent type).

- 'args' is an object that contains any arguments passed to the field in the GraphQL query.
You can use these arguments to customize how the data is fetched or processed.
*/
