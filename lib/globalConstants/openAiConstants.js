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

  get formalPromptTypeForAudio() {
    return 'formal_for_audio';
  }
}

module.exports = new OpenAiConstants();
