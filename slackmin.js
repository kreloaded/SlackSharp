const Slackmin = require('@truesparrow/slackmin');
const coreConstants = require('./config/coreConstants');

const appConfigs = [
  {
    id: coreConstants.SLACK_APP_ID,
    secret: coreConstants.SLACK_SIGNING_SECRET,
    slack_bot_user_oauth_token: coreConstants.SLACK_BOT_USER_OAUTH_TOKEN,
    slack_domain: coreConstants.SLACK_DOMAIN,
  },
];

const whiteListedChannels = [];
const whitelistedUsers = [];

const slackmin = new Slackmin(
  appConfigs,
  whiteListedChannels,
  whitelistedUsers,
);

module.exports = slackmin;
