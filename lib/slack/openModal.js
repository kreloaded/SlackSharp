const rootPrefix = '../..',
  slackmin = require(rootPrefix + '/slackmin'),
  openAiConstants = require(
    rootPrefix + '/lib/globalConstants/openAiConstants',
  );

class OpenModal {
  async perform(triggerId, responseUrl, apiAppId) {
    const modal = new slackmin.interactiveElements.Modal(
      apiAppId,
      'Test Modal',
    );
    modal.addAction('sharpen_modal_submit');
    modal.addDivider();

    // These are the parameter names for the subsequent textboxes.
    const paramsMeta = ['input_message', 'prompt_type'];
    modal.addParamsMeta(paramsMeta);
    modal.addTextbox('Enter text', true, false, '', 'Enter message here');

    modal.addHiddenParamsMeta({ response_url: responseUrl });
    modal.addRadioButtons(
      'Prompt type',
      [
        { text: 'Formal', value: openAiConstants.formalPromptType },
        { text: 'Concise', value: openAiConstants.concisePromptType },
        {
          text: 'Contextualized',
          value: openAiConstants.contextualizedPromptType,
        },
      ],
      { text: 'Formal', value: openAiConstants.formalPromptType },
    );

    modal.addSubmitAndCancel();
    await modal.open(triggerId);
  }
}

module.exports = OpenModal;
