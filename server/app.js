const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

mongoose.connect(
  'mongodb+srv://webDev:123456qwas@webdevgraphql-giqun.mongodb.net/directors?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  }
);

app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log('Connection error'));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
