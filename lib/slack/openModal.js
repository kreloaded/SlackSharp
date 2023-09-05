class OpenModal {
  async perform(params) {
    const modal = {
      trigger_id: params.triggerId,
      view: {
        type: 'modal',
        callback_id: 'suggestion-modal',
        private_metadata: JSON.stringify({ responseUrl: params.responseUrl }),
        title: {
          type: 'plain_text',
          text: 'Select Message Type',
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Choose the message type and provide additional details.',
            },
          },
          {
            type: 'input',
            block_id: 'message_input',
            label: {
              type: 'plain_text',
              text: 'Enter your message:',
            },
            element: {
              type: 'plain_text_input',
              action_id: 'message_input_action',
              multiline: true,
            },
          },
          {
            type: 'actions',
            block_id: 'message_type',
            elements: [
              {
                type: 'radio_buttons',
                action_id: 'message_type_action',
                options: [
                  {
                    text: {
                      type: 'plain_text',
                      text: 'Formal',
                    },
                    value: 'formal',
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: 'Concise',
                    },
                    value: 'concise',
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: 'Contextual',
                    },
                    value: 'contextualized',
                  },
                ],
              },
            ],
          },
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit',
        },
      },
    };

    await params.client.views.open(modal);
  }
}

module.exports = OpenModal;
