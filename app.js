const serverless = require('serverless-http'),
  express = require('express'),
  morgan = require('morgan'),
  helmet = require('helmet'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.configDotenv();

const rootPrefix = '.',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  slackmin = require(rootPrefix + '/slackmin'),
  setResponseHeader = require(rootPrefix + '/middlewares/setResponseHeader'),
  slackOpenModalLib = require(rootPrefix + '/lib/slack/openModal'),
  slackGetSuggestionsLib = require(rootPrefix + '/lib/slack/getSuggestions');

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

// slackmin common middlewares
app.use(slackmin.commonMiddlewares);

app.get('/api/health-check', function (req, res) {
  return res.status(200).json({ success: true });
});

app.post(
  '/api/slack/interactive-endpoint',
  slackmin.interactiveEndpointMiddlewares,
  async function (req, res) {
    const responseUrl = req.decodedParams.response_url;

    const inputMessage = req.decodedParams.input_message;
    const promptType = req.decodedParams.prompt_type;

    const getSuggestionsLib = new slackGetSuggestionsLib();
    getSuggestionsLib.perform(responseUrl, inputMessage, promptType);

    return res.status(200).json();
  },
);

app.post(
  '/api/slack/open-modal',
  slackmin.slashCommandMiddlewares,
  async function (req, res) {
    const triggerId = req.decodedParams.trigger_id;
    const responseUrl = req.decodedParams.response_url;
    const apiAppId = req.decodedParams.api_app_id;

    const openModalLib = new slackOpenModalLib();
    await openModalLib.perform(triggerId, responseUrl, apiAppId);

    return res.status(200).json();
  },
);

// Set response header to prevent response caching
app.use(setResponseHeader());

// If running in development mode, start the server on port 8080, else export handler for lambda
if (
  coreConstants.ENVIRONMENT === 'development' ||
  coreConstants.ENVIRONMENT === 'test'
) {
  console.log('Server running on 8080');
  app.listen(8080);
  module.exports = { handler: app };
} else {
  // Export the handler for Lambda on production
  const handler = serverless(app);
  module.exports = { handler };
}
