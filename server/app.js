const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://graphql-tutorial-rmu1a.mongodb.net/graphql-tutorial', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

mongoose.connection.once('open', () => {
    console.log('connected to DB');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});