class OpenAiConstants {
  get formalPromptType() {
    return 'formal';
  }

  get concisePromptType() {
    return 'concise';
  }

  get persuasivePromptType() {
    return 'persuasive';
  }
}

module.exports = new OpenAiConstants();
