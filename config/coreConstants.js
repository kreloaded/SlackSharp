class CoreConstants {
  get ENVIRONMENT() {
    return process.env.ENVIRONMENT;
  }

  get SLACK_APP_ID() {
    return process.env.SLACK_APP_ID;
  }

  get SLACK_SIGNING_SECRET() {
    return process.env.SLACK_SIGNING_SECRET;
  }

  get SLACK_BOT_USER_OAUTH_TOKEN() {
    return process.env.SLACK_BOT_USER_OAUTH_TOKEN;
  }

  get SLACK_DOMAIN() {
    return process.env.SLACK_DOMAIN;
  }

  get OPENAI_API_KEY() {
    return process.env.OPENAI_API_KEY;
  }

  get GOOGLE_SPEECH_TO_TEXT_CRED_FILE_NAME() {
    return process.env.GOOGLE_SPEECH_TO_TEXT_CRED_FILE_NAME;
  }
}

module.exports = new CoreConstants();
