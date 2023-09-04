class Prompts {
  getFormalPrompt(message) {
    return `Please rephrase the following message in a formal style suitable for a Slack. If user has entered text in the format of bullet points consider that to provide the response. User input message ${message}`;
  }

  getConcisePrompt(message) {
    return `Please make the following message more concise without losing its main points, suitable for a Slack. If user has entered text in the format of bullet points consider that to provide the response. User input message ${message}`;
  }

  getContextualPrompt(message) {
    return `Provide a context in the concise form of 5-6 words of the following message and make it more readable. If user has entered text in the format of bullet points consider that to provide the response. User input message ${message}`;
  }
}

module.exports = new Prompts();
