const express = require("express");
require("dotenv").config()
const {graphqlHTTP} = require("express-graphql")
const schema = require("./Schema/schema")
require("./config/db");

const app = express();


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,
}))


app.listen("5000",()=>{
    console.log("server running");
})