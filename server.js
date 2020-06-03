const express = require("express");
const bodyParser = require("body-parser");
const serveStatic = require('serve-static');
const mongoose = require('mongoose');
const cors = require("cors");

const configFile = process.argv[2];
const config = require(`./app/config/${configFile}`);

require('./app/config/passport');

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(serveStatic('public/images'));

mongoose.connect(`mongodb://${config.USERNAME}:${config.PASSWORD}@${config.HOST}:${config.PORT}/${config.DATABASE}`, { 
  useUnifiedTopology: true 
});

const mongoDb = mongoose.connection;

if(!mongoDb)
  console.log("Error connecting to mongo db")
else
  console.log("Db connected successfully -- MongoDB")

const PORT = process.env.PORT || 8080;

if(process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
}

var routes = require("./app/routes/routes.js");
app.use(routes);

module.exports = app;
