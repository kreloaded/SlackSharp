const rootPrefix = '../..',
  slackmin = require(rootPrefix + '/slackmin'),
  OpenAiCompletionLib = require(rootPrefix + '/lib/openAi/completion');

class GetSuggestions {
  async perform(responseUrl, inputMessage, promptType) {
    const openAiCompletionLib = new OpenAiCompletionLib();
    const response = await openAiCompletionLib.getSuggestions(
      promptType,
      inputMessage,
    );

    const message = new slackmin.interactiveElements.Message();
    message.addSection(response.message);

    await message.sendUsingResponseUrl(responseUrl, true);
  }
}

module.exports = GetSuggestions;
