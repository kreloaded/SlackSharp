const OpenAi = require('openai');

const rootPrefix = '../..',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  prompts = require(rootPrefix + '/lib/openAi/prompts'),
  openAiConstants = require(
    rootPrefix + '/lib/globalConstants/openAiConstants',
  );

class Completion {
  async getSuggestions(promptType, message) {
    let prompt = null;

    switch (promptType) {
      case openAiConstants.formalPromptType:
        prompt = prompts.getFormalPrompt(message);
        break;
      case openAiConstants.concisePromptType:
        prompt = prompts.getConcisePrompt(message);
        break;
      case openAiConstants.persuasivePromptType:
        prompt = prompts.getPersuasivePrompt(message);
        break;
        case openAiConstants.formalPromptTypeForAudio:
          prompt = prompts.getFormalPromptForAudio(message);
          break;
      default:
        throw new Error(`Invalid prompt type: ${promptType}`);
    }

    const openAi = new OpenAi({
      apiKey: coreConstants.OPEN_AI_API_KEY,
    });

    let completionResponse = null;
    try {
      completionResponse = await openAi.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });
      console.log('GPT Response: ', JSON.stringify(completionResponse));
    } catch (err) {
      throw new Error(`Error while getting completion from OpenAI: ${err}`);
    }

    const messageSuggestion =
      completionResponse.choices[0] &&
      completionResponse.choices[0].message &&
      completionResponse.choices[0].message.content;

    return {
      message: messageSuggestion,
    };
  }
}

module.exports = Completion;
