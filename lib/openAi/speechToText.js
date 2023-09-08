const OpenAi = require('openai');
const axios = require('axios');
const fs = require('fs');

const rootPrefix = '../..',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  OpenAiCompletionLib = require(rootPrefix + '/lib/openAi/completion'),
  openAiConstants = require(
    rootPrefix + '/lib/globalConstants/openAiConstants',
  );

class SpeechToTextWhisper {
  async perform(event, say, client) {
    const audioFileUrl = await this.validate(event, client);
    if (!audioFileUrl) {
      return;
    }

    const audioResponse = await axios.get(audioFileUrl, {
      headers: {
        Authorization: `Bearer ${coreConstants.SLACK_BOT_USER_OAUTH_TOKEN}`,
      },
      responseType: 'arraybuffer',
    });

    const audioBuffer = audioResponse.data;
    fs.writeFileSync('temp.mp4', audioBuffer);

    const transcription = await this.transcribe();

    const refactoredTranscription =
      await this.getOpenAiSuggestion(transcription);

    await this.sendMessageToSlack(say, refactoredTranscription, event);

    await this.cleanUpFiles();
  }

  async cleanUpFiles() {
    fs.unlinkSync('temp.mp4');
  }

  async getOpenAiSuggestion(transcription) {
    const openAiCompletionLib = new OpenAiCompletionLib();
    const suggestionResponse = await openAiCompletionLib.getSuggestions(
      openAiConstants.formalPromptTypeForAudio,
      transcription,
    );

    return suggestionResponse.message;
  }

  async sendMessageToSlack(say, transcription, event) {
    await say({
      text: transcription,
      thread_ts: event.thread_ts || event.event_ts,
    });
  }

  async transcribe() {
    const openAi = new OpenAi({
      apiKey: coreConstants.OPEN_AI_API_KEY,
    });

    const fileObject = fs.readFileSync('temp.mp4');
    const response = await openAi.audio.transcriptions.create({
      file: await OpenAi.toFile(Buffer.from(fileObject), 'audio_message.mp4'),
      model: 'whisper-1',
      language: 'en',
    });

    return response.text;
  }

  async validate(event, client) {
    if (!event || !client) {
      throw new Error('Missing event or client');
    }

    const fileInfo = await client.files.info({
      file: event.file_id,
    });

    const supportedAudioFileTypes = ['m4a', 'webm'];
    if (supportedAudioFileTypes.indexOf(fileInfo.file.filetype) < 0) {
      console.log('Not a audio file');
      return;
    }

    return fileInfo.file.url_private_download;
  }
}

module.exports = SpeechToTextWhisper;
