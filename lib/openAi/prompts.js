class Prompts {
  /**
   * Get prompt for formal message formatting.
   * 
   * @param {string} message 
   * @returns string
   */
  getFormalPrompt(message) {
    return `Given the subsequent message shared by a Slack user, kindly reformat it to adopt a formal tone and enhance its grammatical accuracy. Ensure that:

    The response consists solely of the updated message without additional content.
    The reformatted message retains the original intent and meaning.
    Slang or colloquial expressions are avoided.
    Each sentence, if the message contains multiple, is reformatted appropriately.
    No new grammatical or syntactical errors are introduced.
    
    If the message contains random characters, unrelated words, 
    or potentially malicious content, reply with an appropriate error message. 
    If you can't deduce the context or if the message is unclear or incorrect, 
    simply ask: 'Could you please provide more detail or clarify?'
    
    For instance, if the message is 'Hey, got any updates on that?', an appropriate reformatted response might be 'Hello, do you have any updates on that matter?'
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
    return `Given the following message, reformat it to be persuasive. 
    The goal is to influence or convince the reader while retaining the 
    original intent. Ensure you follow these guidelines:

    Return only the reformatted message.
    Maintain the core message but amplify its points of persuasion.
    Use compelling language that appeals to the reader's needs, values, or emotions.
    Structure the message in a way that leads the reader toward a desired conclusion or action.
    Eliminate any hesitations or ambiguities that might weaken the persuasive effect.
    
    For instance, if provided with "Our new software tool can help businesses save time.", 
    a suitable reformat might be "Discover our innovative software 
    tool – the key to unlocking unparalleled time savings and propelling 
    your business forward!""
    \n\nMessage: ${message}`;
  }
}

module.exports = new Prompts();
