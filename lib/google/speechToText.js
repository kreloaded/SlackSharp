const axios = require('axios');
const Speech = require('@google-cloud/speech');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const rootPrefix = '../..',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  openAiConstants = require(rootPrefix + '/lib/globalConstants/openAiConstants'),
  OpenAiCompletionLib = require(rootPrefix + '/lib/openAi/completion');

class SpeechToText {
  /**
   * Main performer of the speech to text converter class.
   *
   * @param {object} event
   * @param {object} say
   * @param {object} client
   * @returns
   */
  async perform(event, say, client) {
    const audioFileUrl = await this.validate(event, client);
    if (!audioFileUrl) {
      return;
    }

    await this.createFlacFile(audioFileUrl);

    const transcription = await this.convertSpeechToText();

    const refactoredTranscription =
      await this.getOpenAiSuggestion(transcription);

    await this.sendMessageToSlack(say, refactoredTranscription, event);

    await this.cleanUpFiles();
    return;
  }
  catch(error) {
    throw new Error('Error:', error);
  }

  /**
   * Get open-ai suggestion for the transcription to
   * convert it into a more formal language.
   *
   * @param {string} transcription
   * @returns string - transcription
   */
  async getOpenAiSuggestion(transcription) {
    const openAiCompletionLib = new OpenAiCompletionLib();
    const suggestionResponse = await openAiCompletionLib.getSuggestions(
      openAiConstants.formalPromptTypeForAudio,
      transcription,
    );

    return suggestionResponse.message;
  }

  /**
   * Send open-ai suggested transcript to slack channel.
   *
   * @param {object} say
   * @param {object} transcription
   * @param {object} event
   */
  async sendMessageToSlack(say, transcription, event) {
    await say({
      text: transcription,
      thread_ts: event.thread_ts || event.event_ts,
    });
  }

  /**
   * Convert audio file to transcript using google speech-to-text apis.
   *
   * @returns string - transcript
   */
  async convertSpeechToText() {
    const audioBytes = fs.readFileSync('converted.flac').toString('base64');
    const sampleRateHertz = await this.getSampleRate('converted.flac');

    const audio = { content: audioBytes };
    const config = {
      encoding: 'FLAC',
      sampleRateHertz: sampleRateHertz,
      languageCode: 'en-IN',
    };
    const request = {
      audio: audio,
      config: config,
    };

    const speechClient = new Speech.SpeechClient({
      keyFilename: coreConstants.GOOGLE_SPEECH_TO_TEXT_CRED_FILE_NAME,
    });

    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    console.log(`Transcription: ${transcription}`);

    return transcription;
  }

  /**
   * Get audio file sample rate.
   *
   * @param {string} filePath 
   * @returns string
   */
  async getSampleRate(filePath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err);
          return;
        }
        const sampleRate = metadata.streams[0].sample_rate;
        resolve(sampleRate);
      });
    });
  }

  /**
   * Create file with FLAC audio format.
   *
   * @param {string} audioFileUrl
   */
  async createFlacFile(audioFileUrl) {
    const audioResponse = await axios.get(audioFileUrl, {
      headers: {
        Authorization: `Bearer ${coreConstants.SLACK_BOT_USER_OAUTH_TOKEN}`,
      },
      responseType: 'arraybuffer',
    });
    const audioBuffer = audioResponse.data;
    fs.writeFileSync('temp.mp4', audioBuffer);

    await convertAudioToFlac('temp.mp4', 'converted.flac');
  }

  /**
   * Validate event and client.
   *
   * @param {object} event
   * @param {object} client
   * @returns string - audio file url to download the file
   */
  async validate(event, client) {
    if (!event || !client) {
      throw new Error('Missing event or client');
    }

    const fileInfo = await client.files.info({
      file: event.file_id,
    });

    const supportedAudioFileTypes = ['m4a', 'webm'];
    console.log('fileInfo: -----', fileInfo);
    if (supportedAudioFileTypes.indexOf(fileInfo.file.filetype) < 0) {
      console.log('Not a audio file');
      return;
    }

    return fileInfo.file.url_private_download;
  }

  /**
   * Clean up temporary audio files.
   *
   * @returns void
   */
  async cleanUpFiles() {
    fs.unlinkSync('converted.flac');
    fs.unlinkSync('temp.mp4');
  }
}

/**
 * Convert webm audio file to FLAG audio format.
 *
 * @param {string} inputPath
 * @param {string} outputPath
 * @returns void
 */
const convertAudioToFlac = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat('flac')
      .on('error', err => {
        console.log('An error occurred:', err.message);
        reject(err);
      })
      .on('progress', progress => {
        console.log(`Processing: ${progress.percent}% done`);
      })
      .on('end', () => {
        console.log('Processing finished!');
        resolve();
      })
      .save(outputPath);
  });
};

module.exports = SpeechToText;
