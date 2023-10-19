const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const schema = require("./schema/schema");
const connectDB = require("./config/db"); // <-- to connect to DB

// Specific port
const port = process.env.PORT || 5500;
// Using express
const app = express();
// Connect to DB
connectDB();
// using cors
app.use(cors());

app.use(
    "/graphql", // will be able to access at 'http://localhost:5500/graphql'
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === "development", // only if NODE_ENV is development
    })
);
app.listen(port, console.log(`SERVER'S LAUNCHED ON PORT -----------> ${port}`));
