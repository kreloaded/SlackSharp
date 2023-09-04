class OpenAiConstants {
  get formalPromptType() {
    return 'formal';
  }

  get concisePromptType() {
    return 'concise';
  }

  get contextualizedPromptType() {
    return 'contextualized';
  }
}

module.exports = new OpenAiConstants();
