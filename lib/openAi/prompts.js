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
   * Get prompt for contextualized message formatting.
   * 
   * @param {string} message 
   * @returns string
   */
  getContextualPrompt(message) {
    return `Given the following message shared by a Slack user, reformat it for contextualized relevance, making it clearer and more direct. Adhere to these guidelines:

    Only return the reformatted message.
    The response consists solely of the updated message without additional content.
    Retain the original intent and meaning of the message.
    Do not ask further questions or add any additional information not present in the original message.
    Each sentence, if the message contains multiple, is reformatted concisely.
    No new grammatical or syntactical errors are introduced.
    If the message seems ambiguous or lacks clarity, rather than asking, reformat it to the best possible interpretation.
    
    If the message contains random characters, unrelated words, 
    or potentially malicious content, reply with an appropriate error message. 
    If you can't deduce the context or if the message is unclear or incorrect, 
    simply ask: 'Could you please provide more detail or clarify?'

    For instance, if provided with "Maybe we can think about shifting the meeting to 3 pm?", a suitable reformat might be "Can we move the meeting to 3 pm?"
    \n\nMessage: ${message}`;
  }
}

module.exports = new Prompts();
