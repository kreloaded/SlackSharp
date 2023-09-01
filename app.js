const serverless = require('serverless-http'),
  express = require('express'),
  morgan = require('morgan'),
  helmet = require('helmet'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv');

const rootPrefix = '.',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  setResponseHeader = require(rootPrefix + '/middlewares/setResponseHeader');

// Load environment variables from .env file
dotenv.configDotenv();

// Set worker process title.
process.title = 'SlackSharp';

const app = express();

// Use Morgan middleware to log requests
app.use(morgan('combined'));

// Helmet can help protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

// Node.js body parsing middleware. Default limit is 100kb
app.use(bodyParser.json({ limit: '2mb' }));

// Parsing the URL-encoded data with the qs library (extended: true). Default limit is 100kb
app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }));

const getRequestParams = function (req) {
  if (req.method === "POST") {
    return req.body;
  } else if (req.method === "GET") {
    return req.query;
  }

  return {};
};

const assignParams = function (req, res, next) {
  req.decodedParams = getRequestParams(req);

  req.internalDecodedParams = {};

  next();
};

// Set response header to prevent response caching
app.use(setResponseHeader());

// If running in development mode, start the server on port 8080, else export handler for lambda
if (coreConstants.ENVIRONMENT === 'development' || coreConstants.ENVIRONMENT === 'test') {
  console.log('Server running on 8080');
  app.listen(8080);
  module.exports = { handler: app };
} else {
  // Export the handler for Lambda on production
  const handler = serverless(app);
  module.exports = { handler };
}