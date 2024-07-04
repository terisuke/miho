import { wait } from "@/utils/wait";
import { synthesizeVoiceApi } from "./synthesizeVoice";
import { synthesizeVoiceGoogleApi } from "./synthesizeVoiceGoogle";
import { synthesizeStyleBertVITS2Api } from "./synthesizeStyleBertVITS2";
import { Viewer } from "../vrmViewer/viewer";
import { Screenplay } from "./messages";
import { Talk } from "./messages";

const VOICE_VOX_API_URL = process.env.NEXT_PUBLIC_VOICE_VOX_API_URL || 'http://localhost:50021';

const createSpeakCharacter = () => {
  let lastTime = 0;
  let prevFetchPromise: Promise<unknown> = Promise.resolve();
  let prevSpeakPromise: Promise<unknown> = Promise.resolve();

  return (
    screenplay: Screenplay,
    viewer: Viewer,
    selectVoice: string,
    selectLanguage: string,
    koeiroApiKey: string,
    voicevoxSpeaker: string,
    googleTtsType: string,
    stylebertvits2ServerUrl: string,
    stylebertvits2ModelId: string,
    stylebertvits2Style: string,
    gsviTtsServerUrl: string,
    gsviTtsModelId: string,
    gsviTtsBatchSize: number,
    gsviTtsSpeechRate: number,
    onStart?: () => void,
    onComplete?: () => void
  ) => {
    onStart?.();
    console.log("speakCharacter function called");

    const fetchPromise = prevFetchPromise.then(async () => {
      const now = Date.now();
      if (now - lastTime < 1000) {
        await wait(1000 - (now - lastTime));
      }
      let buffer;
      console.log("selectVoice:", selectVoice);
      if (selectVoice == "koeiromap") {
        buffer = await fetchAudio(screenplay.talk, koeiroApiKey).catch(
          () => null
        );
      } else if (selectVoice == "voicevox") {
        buffer = await fetchAudioVoiceVox(screenplay.talk, voicevoxSpeaker).catch(
          () => null
        );
      } else if (selectVoice == "google") {

        const getGppgleTTsType = (selectLanguage: string) => {
          if (selectLanguage) {
            switch (selectLanguage) {
              case 'JP':
                return 'ja-JP-Standard-B';
              case 'EN':
                return 'en-US-Neural2-F';
              case 'ZH':
                return 'cmn-TW-Standard-A';
              default:
                return 'en-US-Neural2-F';  
            }
          }
        }

        let googleTtsTypeByLang:string = '';
        if (!googleTtsType || googleTtsType === "") {
          const storedData = window.localStorage.getItem('chatVRMParams');
          
          if (storedData) {
            const params = JSON.parse(storedData);
            const langCode = params.selectLanguage;
            if (langCode) {
              googleTtsTypeByLang = getGppgleTTsType(langCode) ?? '';
            }
          }
        } else {
          googleTtsTypeByLang = googleTtsType;
        }
        buffer = await fetchAudioGoogle(screenplay.talk, googleTtsTypeByLang).catch(
          () => null
        );
      } else if (selectVoice == "stylebertvits2") {
        buffer = await fetchAudioStyleBertVITS2(screenplay.talk, stylebertvits2ServerUrl, stylebertvits2ModelId, stylebertvits2Style, selectLanguage).catch(
          () => null
        );
      } else if (selectVoice == "gsvitts") {
        buffer = await fetchAudioVoiceGSVIApi(screenplay.talk, gsviTtsServerUrl, gsviTtsModelId, gsviTtsBatchSize, gsviTtsSpeechRate).catch(
          () => null  
        );
      }
      lastTime = Date.now();
      return buffer;
    });

    prevFetchPromise = fetchPromise;
    prevSpeakPromise = Promise.all([fetchPromise, prevSpeakPromise]).then(
      ([audioBuffer]) => {
        if (!audioBuffer) {
          return;
        }
        return viewer.model?.speak(audioBuffer, screenplay);
      }
    );
    prevSpeakPromise.then(() => {
      onComplete?.();
    });
  };
};

export const speakCharacter = createSpeakCharacter();

export const fetchAudio = async (
  talk: Talk,
  apiKey: string
): Promise<ArrayBuffer> => {
  const ttsVoice = await synthesizeVoiceApi(
    talk.message,
    talk.speakerX,
    talk.speakerY,
    talk.style,
    apiKey
  );
  const url = ttsVoice.audio;

  if (url == null) {
    throw new Error("Something went wrong");
  }

  const resAudio = await fetch(url);
  const buffer = await resAudio.arrayBuffer();
  return buffer;
};

export const fetchAudioVoiceVox = async (
  talk: Talk,
  speaker: string
): Promise<ArrayBuffer> => {
  console.log("speakerId:", speaker)
  const ttsQueryResponse = await fetch(VOICE_VOX_API_URL + '/audio_query?speaker=' + speaker + '&text=' + encodeURIComponent(talk.message), {
    method: 'POST',
  });
  if (!ttsQueryResponse.ok) {
    throw new Error('Failed to fetch TTS query.');
  }
  const ttsQueryJson = await ttsQueryResponse.json();

  ttsQueryJson['speedScale'] = 1.16;
  ttsQueryJson['pitchScale'] = -0.02;
  ttsQueryJson['intonationScale'] = 1.26;
  const synthesisResponse = await fetch(VOICE_VOX_API_URL + '/synthesis?speaker=' + speaker, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Transfer-Encoding': 'chunked' },
    body: JSON.stringify(ttsQueryJson)
  });
  if (!synthesisResponse.ok) {
    throw new Error('Failed to fetch TTS synthesis result.');
  }
  const blob = await synthesisResponse.blob();
  const buffer = await blob.arrayBuffer();
  return buffer;
}

export const fetchAudioGoogle = async (
  talk: Talk,
  ttsType: string
): Promise<ArrayBuffer> => {
  const ttsVoice = await synthesizeVoiceGoogleApi(
    talk.message,
    ttsType
  );
  const uint8Array = new Uint8Array(ttsVoice.audio.data);
  const arrayBuffer: ArrayBuffer = uint8Array.buffer;
  
  return arrayBuffer;
};

export const fetchAudioStyleBertVITS2 = async (
  talk: Talk,
  stylebertvits2ServerUrl: string,
  stylebertvits2ModelId: string,
  stylebertvits2Style: string,
  selectLanguage: string
): Promise<ArrayBuffer> => {
  const ttsVoice = await synthesizeStyleBertVITS2Api(
    talk.message,
    stylebertvits2ServerUrl,
    stylebertvits2ModelId,
    stylebertvits2Style,
    selectLanguage
  );
  return ttsVoice
};

export const testVoice = async (
  viewer: Viewer,
  voicevoxSpeaker: string
) => {
  const talk: Talk = {
    message: "ボイスボックスを使用します",
    speakerX: 0,
    speakerY: 0,
    style: "talk",
  };
  const buffer = await fetchAudioVoiceVox(talk, voicevoxSpeaker).catch(
    () => null  
  );
  if (buffer) {
    const screenplay: Screenplay = {
      expression: "neutral",
      talk: talk
    };
    await viewer.model?.speak(buffer, screenplay);
  }
};

export const fetchAudioVoiceGSVIApi = async (
  talk: Talk,
  url: string,
  character: string,
  batchsize: number,
  speed: number,
): Promise<ArrayBuffer> => {
  const style = (talk.style !== 'talk')? talk.style : 'default';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      character: character,
      emotion: style,
      text: talk.message,
      batch_size: batchsize,
      speed: speed.toString(),
      stream: true
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch TTS audio.');
  }

  const blob = await response.blob();
  const buffer = await blob.arrayBuffer();
  return buffer;
}
