const { App } = require('@slack/bolt');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.configDotenv();

const rootPrefix = '.',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  OpenModal = require(rootPrefix + '/lib/slack/openModal'),
  SpeechToTextLib = require(rootPrefix + '/lib/google/speechToText'),
  OpenAiCompletionLib = require(rootPrefix + '/lib/openAi/completion');

// Initialize your Slack app with the bot token
const slackApp = new App({
  token: coreConstants.SLACK_BOT_USER_OAUTH_TOKEN,
  signingSecret: coreConstants.SLACK_SIGNING_SECRET,
});

// Event listener for file shared events
slackApp.event('file_shared', async ({ event, say, client }) => {
  console.log('Received file event');

  const speechToTextLib = new SpeechToTextLib();
  await speechToTextLib.perform(event, say, client);
});

// Url verification required by slack
slackApp.event('url_verification', ({ event, context, client, next }) => {
  context.res = {
    status: 200,
    body: event.challenge,
  };
  return;
});

slackApp.command('/open-modal', async ({ ack, body, context, client }) => {
  console.log('Called open modal');
  try {
    await ack();

    const openModalObj = new OpenModal();
    openModalObj.perform({
      triggerId: body.trigger_id,
      client: client,
      responseUrl: body.response_url,
    });

    return;
  } catch (error) {
    throw new Error('Error opening in slack modal: ', error);
  }
});

// View submission event listener
slackApp.view('suggestion-modal', async ({ ack, body, view }) => {
  try {
    const messageText =
      view.state.values.message_input.message_input_action.value;
    const promptType =
      view.state.values.message_type.message_type_action.selected_option.value;

    const responseUrl = JSON.parse(view.private_metadata).responseUrl;
    getOpenAiSuggestionAndSendToChannel(messageText, promptType, responseUrl);

    console.log('Calling ack');
    await ack();
    console.log('Calling ack done');
    return;
  } catch (error) {
    throw new Error('Error after modal submit: ', error);
  }
});

async function getOpenAiSuggestionAndSendToChannel(
  messageText,
  promptType,
  responseUrl,
) {
  console.log('Calling openai lib');
  messageText = messageText.trim();

  const openAiCompletionLib = new OpenAiCompletionLib();
  const suggestionResponse = await openAiCompletionLib.getSuggestions(
    promptType,
    messageText,
  );
  console.log('suggestionResponse: ', suggestionResponse);

  const payload = {
    response_type: 'ephemeral',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Input Message*: ${messageText}`
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Formatted Response*: ${suggestionResponse.message}`
        }
      }
    ]
  };
  await axios.post(responseUrl, payload);
}

// Start your slack-app
(async () => {
  await slackApp.start(process.env.PORT || 3000);
  console.log('Bot is running!');
})();
