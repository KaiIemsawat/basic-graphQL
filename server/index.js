const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");

const port = process.env.PORT || 5500;
const app = express();

app.use(
    "/graphql", // will be able to access at 'http://localhost:5500/graphql'
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === "development", // only if NODE_ENV is development
    })
);
app.listen(port, console.log(`SERVER'S LAUNCHED ON PORT -----------> ${port}`));
