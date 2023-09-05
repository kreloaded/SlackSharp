const { App } = require('@slack/bolt');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.configDotenv();

const rootPrefix = '.',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  OpenModal = require(rootPrefix + '/lib/slack/openModal'),
  OpenAiCompletionLib = require(rootPrefix + '/lib/openAi/completion');

// Initialize your Slack app with the bot token
const slackApp = new App({
  token: coreConstants.SLACK_BOT_USER_OAUTH_TOKEN,
  signingSecret: coreConstants.SLACK_SIGNING_SECRET,
});

// Event listener for file shared events
slackApp.event('file_shared', async ({ event, say, client }) => {
  console.log('Received message -----');
  console.log('event: ------', event);
  try {
    // Check if the shared file is audio

    const fileInfo = await client.files.info({
      file: event.file_id,
    });

    console.log('fileInfo: -----', fileInfo);
    // Get audio URL from file info
    const audioUrl = fileInfo.file.url_private_download;
    console.log('audioUrl: -------', audioUrl);

    const audioResponse = await axios.get(audioUrl, {
      headers: {
        Authorization: `Bearer ${coreConstants.SLACK_BOT_USER_OAUTH_TOKEN}`,
      },
      responseType: 'arraybuffer',
    });
    const audioBuffer = audioResponse.data;
    console.log('audioBuffer: -----', audioBuffer);
    // Download audio file from Slack and process it
    // Implement audio processing and text generation here
    // Example response
    const formattedMessage = 'Your formatted response here';

    // Send the formatted message as a reply
    await say({
      text: formattedMessage,
      thread_ts: event.thread_ts || event.event_ts, // Reply within the same thread or event
    });

    return;
  } catch (error) {
    console.error('Error:', error);
  }
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
  const openAiCompletionLib = new OpenAiCompletionLib();
  const suggestionResponse = await openAiCompletionLib.getSuggestions(
    promptType,
    messageText,
  );
  console.log('suggestionResponse: ', suggestionResponse);

  await axios.post(responseUrl, {
    text: suggestionResponse.message,
    response_type: 'ephemeral',
  });
}

// Start your slack-app
(async () => {
  await slackApp.start(process.env.PORT || 3000);
  console.log('Bot is running!');
})();
