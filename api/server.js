
const express = require('express'),
cors = require('cors'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
config = require('./DB'),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express"),
rateLimit = require("express-rate-limit");

const options = {
    authAction :{ },
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Recommendation Share API",
        version: "0.1.0",
        description:
          "CRUD API application made with Express and documented with Swagger",
        contact: {
          name: "Purest Earth",
          url: "https://github.com/PurestEarth",
        },
      },
      servers: [
        {
            url: "http://localhost:4000",
        },
        {   
            url: "http://localhost:3000",
        },
      ],
    },
    apis: [ './models/Recommendation.js', './routes/recommendation.route.js',],
         schemas: []
  };

const specs = swaggerJsdoc(options);

mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
() => {console.log('Database is connected') },
err => { console.log('Can not connect to the database'+ err)}
);
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500
});

const recRoute = require('./routes/recommendation.route');


const app = express();
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: false
}));

app.use(limiter);
app.use('/api/rec', recRoute);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
console.log('Listening on port ' + port);
});


