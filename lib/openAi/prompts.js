class Prompts {
  /**
   * Get prompt for formal message formatting.
   *
   * @param {string} message
   * @returns string
   */
  getFormalPrompt(message) {
    return `Given the subsequent message shared by a Slack user, 
    kindly reformat it to adopt a formal tone and enhance its grammatical accuracy. 
    Ensure that:

    The response consists solely of the updated message without additional content.
    The reformatted message retains the original intent and meaning.
    Slang or colloquial expressions are avoided.
    Each sentence, if the message contains multiple, is reformatted appropriately.
    No new grammatical or syntactical errors are introduced.
    
    If the message contains random characters, unrelated words, 
    or potentially malicious content, reply with an appropriate error message. 
    If you can't deduce the context or if the message is unclear or incorrect, 
    simply ask: 'Could you please provide more detail or clarify?'
    
    For instance, if the message is 'Hey, got any updates on that?', 
    an appropriate reformatted response might be 'Hello, do you have any updates on that matter?'
    \n\n Message: ${message}`;
  }

  /**
   * Get prompt for concise message formatting.
   *
   * @param {string} message
   * @returns string
   */
  getConcisePrompt(message) {
    return `Given the following message shared by a Slack user, please reformat it to adopt a concise tone while improving its grammatical accuracy. Ensure that:

    The response consists solely of the updated message without additional content.
    The reformatted message retains the original intent and meaning.
    Unnecessary words or phrases are removed.
    Each sentence, if the message contains multiple, is reformatted concisely.
    No new grammatical or syntactical errors are introduced.
    
    If the message contains random characters, unrelated words, 
    or potentially malicious content, reply with an appropriate error message. 
    If you can't deduce the context or if the message is unclear or incorrect, 
    simply ask: 'Could you please provide more detail or clarify?'
    
    For instance, if the message is 'Hey, I was just wondering if there might be any updates on that project we've been working on?', an appropriate reformatted response might be 'Any updates on the project?'
    \n\nMessage: ${message}`;
  }

  /**
   * Get prompt for persuasive message formatting.
   *
   * @param {string} message
   * @returns string
   */
  getPersuasivePrompt(message) {
    return `Rephrase the given message to enhance its expression without introducing 
    new concepts or judgments. The reformed statement should:

    Stay True to the Original: Your response should closely mirror the sentiment 
    expressed in the original message without deviating from its primary intent.
    Avoid External Assessments: Refrain from introducing outside evaluations, judgments, or embellishments.
    Keep It Direct: While refining the message, ensure clarity and directness.
    
    For example: For the message "I like to run in the mornings", an appropriate 
    rephrase might be: "I enjoy morning runs."
    
    \n\nMessage: ${message}`;
  }

  /**
   * Get prompt for persuasive message formatting.
   *
   * @param {string} transcription
   * @returns
   */
  getFormalPromptForAudio(transcription) {
    return `Given the following transcribed message, refine it for formality 
    and clarity. The transcription may contain inaccuracies or 
    miss certain nuances. Your objectives are:

    Ensure that the transcription flows naturally and is devoid of any 
    informalities or inaccuracies.
    No new grammatical or syntactical errors are introduced.

    For instance, if provided with "Hey, um, we kinda need to get 
    this thing done, alright?", a suitable refinement might be 
    "It is essential that we complete this task."
    \n\nTranscribed Message: ${transcription}`;
  }
}

module.exports = new Prompts();
