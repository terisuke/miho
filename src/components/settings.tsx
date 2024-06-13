import React, { useContext, useCallback } from "react";
import { IconButton } from "./iconButton";
import { TextButton } from "./textButton";
import { Message } from "@/features/messages/messages";
import {
  KoeiroParam,
  PRESET_A,
  PRESET_B,
  PRESET_C,
  PRESET_D,
} from "@/features/constants/koeiroParam";
import { Link } from "./link";
import i18n from "i18next";
import { useTranslation } from 'react-i18next';
import speakers from './speakers.json';
import { buildUrl } from "@/utils/buildUrl";
import { ViewerContext } from "@/features/vrmViewer/viewerContext";
import { PROMPTS } from "@/features/constants/systemPromptConstants";

type Props = {
  selectAIService: string;
  setSelectAIService: (service: string) => void;
  selectAIModel: string;
  setSelectAIModel: (model: string) => void;
  openAiKey: string;
  onChangeOpenAiKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  anthropicKey: string;
  onChangeAnthropicKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  groqKey: string;
  onChangeGroqKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  difyKey: string;
  onChangeDifyKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  difyUrl: string;
  onChangeDifyUrl: (event: React.ChangeEvent<HTMLInputElement>) => void;
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
  chatLog: Message[];
  codeLog: Message[];
  koeiroParam: KoeiroParam;
  koeiromapKey: string;
  voicevoxSpeaker: string;
  setVoicevoxSpeaker: (speaker: string) => void;
  googleTtsType: string;
  stylebertvits2ServerUrl: string;
  stylebertvits2ModelId: string;
  stylebertvits2Style: string;
  youtubeMode: boolean;
  youtubeApiKey: string;
  youtubeLiveId: string;
  onClickClose: () => void;
  onChangeSystemPrompt: (event: React.ChangeEvent<HTMLTextAreaElement> | { target: { value: string } }) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeCodeLog: (index: number, text: string) => void;
  onChangeKoeiroParam: (x: number, y: number) => void;
  onClickOpenVrmFile: () => void;
  onClickResetChatLog: () => void;
  onClickResetCodeLog: () => void;
  onClickResetSystemPrompt: () => void;
  onChangeKoeiromapKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeVoicevoxSpeaker: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeGoogleTtsType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStyleBertVits2ServerUrl: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStyleBertVits2ModelId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStyleBertVits2Style: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeYoutubeMode: (mode: boolean) => void;
  onChangeYoutubeApiKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeYoutubeLiveId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  webSocketMode: boolean;
  onChangeWebSocketMode: (show: boolean) => void;
  selectVoice: string;
  setSelectVoice: (show: string) => void;
  selectLanguage: string;
  setSelectLanguage: (show: string) => void;
  setSelectVoiceLanguage: (show: string) => void;
  onClickTestVoice: (speaker: string) => void;
  selectVrmModel: string;
  setSelectVrmModel: (model: string) => void;
};

export const Settings = ({
  selectAIService,
  setSelectAIService,
  selectAIModel,
  setSelectAIModel,
  openAiKey,
  onChangeOpenAiKey,
  anthropicKey,
  onChangeAnthropicKey,
  groqKey,
  onChangeGroqKey,
  difyKey,
  onChangeDifyKey,
  difyUrl,
  onChangeDifyUrl,
  chatLog,
  systemPrompt,
  setSystemPrompt,
  koeiroParam,
  koeiromapKey,
  voicevoxSpeaker,
  setVoicevoxSpeaker,
  googleTtsType,
  stylebertvits2ServerUrl,
  stylebertvits2ModelId,
  stylebertvits2Style,
  youtubeMode,
  youtubeApiKey,
  youtubeLiveId,
  onClickClose,
  onChangeSystemPrompt,
  onChangeChatLog,
  onChangeCodeLog,
  onChangeKoeiroParam,
  onClickResetChatLog,
  onClickResetCodeLog,
  onClickResetSystemPrompt,
  onChangeKoeiromapKey,
  onChangeVoicevoxSpeaker,
  onChangeGoogleTtsType,
  onChangeStyleBertVits2ServerUrl,
  onChangeStyleBertVits2ModelId,
  onChangeStyleBertVits2Style,
  onChangeYoutubeMode,
  onChangeYoutubeApiKey,
  onChangeYoutubeLiveId,
  webSocketMode,
  onChangeWebSocketMode,
  selectVoice,
  setSelectVoice,
  selectLanguage,
  setSelectLanguage,
  setSelectVoiceLanguage,
  onClickTestVoice,
  selectVrmModel,
  setSelectVrmModel,
}: Props) => {
  const { t } = useTranslation();
  const { viewer } = useContext(ViewerContext);

  const handleVrmChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const vrmFile = event.target.value;
      setSelectVrmModel(vrmFile); // 選択したモデルを状態に保存
      viewer.loadVrm(buildUrl(vrmFile)); // 選択したモデルを読み込む

      // VRMモデルに応じてスピーカーとシステムプロンプトを変更
      let speakerId; // スピーカーIDを初期化
      let newSystemPrompt;
      switch (vrmFile) {
        case '/AvatarSample_A.vrm':
          speakerId = 2; // 四国めたん/普通のID
          newSystemPrompt = PROMPTS.avatarSampleA;
          break;
        case '/AvatarSample_C.vrm':
          speakerId = 12; // 白上虎太郎/普通のID
          newSystemPrompt = PROMPTS.avatarSampleC;
          break;
        case '/inuinu.vrm':
          speakerId = 3; // ずんだもん/普通のID
          newSystemPrompt = PROMPTS.inuinu;
          break;
        default:
          speakerId = 2; // 四国めたん/普通のID
          newSystemPrompt = PROMPTS.avatarSampleA;
          break;
      }

      // スピーカーIDに対応するスピーカー名を設定
      const speaker = speakers.find(s => s.id === speakerId);
      if (speaker) {
        setVoicevoxSpeaker(speaker.speaker); // スピーカー名を設定
      }
      
      // デバッグ用のログ
      console.log('VRMモデル:', vrmFile);
      console.log('スピーカー:', speaker ? speaker.speaker : 'なし');
      console.log('プロンプト:', newSystemPrompt);

      // システムプロンプトを設定
      setSystemPrompt(newSystemPrompt);
    },
    [setSelectVrmModel, viewer, setVoicevoxSpeaker, setSystemPrompt]
  );

  // AIサービスごとのデフォルトモデルを設定
  const defaultModels: { [key: string]: string } = {
    openai: 'gpt-3.5-turbo',
    anthropic: 'claude-3-haiku-20240307',
    groq: 'gemma-7b-it',
    ollama: '',
    dify: '',
  };

  return (
    <div className="absolute z-40 w-full h-full bg-white/80 backdrop-blur ">
      <div className="absolute m-24">
        <IconButton
          iconName="24/Close"
          isProcessing={false}
          onClick={onClickClose}
        ></IconButton>
      </div>
      <div className="max-h-full overflow-auto">
        <div className="text-text1 max-w-3xl mx-auto px-24 py-64 ">
          <div className="my-24 typography-32 font-bold">{t('Settings')}</div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">
              言語設定 - Language
            </div>
            <div className="my-8">
              <select
                className="px-16 py-8 bg-surface1 hover:bg-surface1-hover rounded-8"
                value={selectLanguage}
                onChange={(e) => {
                  const newLanguage = e.target.value;
                  switch (newLanguage) {
                    case "JP":
                      setSelectLanguage("JP");
                      setSelectVoiceLanguage("ja-JP");
                      i18n.changeLanguage('ja');
                      break;
                    case "EN":
                      setSelectLanguage("EN");
                      if (selectVoice === "voicevox") {
                        setSelectVoice("google");
                      }
                      setSelectVoiceLanguage("en-US");
                      i18n.changeLanguage('en');
                      break;
                    case "ZH":
                      setSelectLanguage("ZH");
                      if (selectVoice === "voicevox") {
                        setSelectVoice("google");
                      }
                      setSelectVoiceLanguage("zh-TW");
                      i18n.changeLanguage('zh-TW');
                      break;
                    default:
                      break;  // Optionally handle unexpected values
                  }
                }}
              >
                <option value="JP">日本語 - Japanese</option>
                <option value="EN">英語 - English</option>
                <option value="ZH">繁體中文 - Traditional Chinese</option>
              </select>
            </div>
          </div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">
              {t('ExternalConnectionMode')}
            </div>
            <div className="my-8">
              {webSocketMode ? (
                <TextButton onClick={() => onChangeWebSocketMode(false)}>
                  {t('StatusOn')}
                </TextButton>
              ) : (
                <TextButton onClick={() => onChangeWebSocketMode(true)}>
                  {t('StatusOff')}
                </TextButton>
              )}
            </div>
          </div>
          {(() => {
            if (!webSocketMode) {
              return (
                <>
                  <div className="my-40">
                    <div className="my-16 typography-20 font-bold">
                      {t('SelectAIService')}
                    </div>
                    <div className="my-8">
                      <select
                        className="px-16 py-8 bg-surface1 hover:bg-surface1-hover rounded-8"
                        value={selectAIService}
                        onChange={(e) => {
                          const newService = e.target.value as keyof typeof defaultModels;
                          setSelectAIService(String(newService));
                          // 選択したAIサービスに基づいてデフォルトモデルを設定する
                          setSelectAIModel(defaultModels[newService]);
                        }}
                      >
                        <option value="openai">OpenAI</option>
                        <option value="anthropic">Anthropic</option>
                        <option value="groq">Groq</option>
                        <option value="ollama">{t('LocalLLMOllama')}</option>
                        <option value="dify">Dify</option>
                      </select>
                    </div>
                    {(() => {
                      if (selectAIService === "openai") {
                        return (
                          <div className="my-24">
                            <div className="my-16 typography-20 font-bold">{t('OpenAIAPIKeyLabel')}</div>
                            <input
                              className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                              type="text"
                              placeholder="sk-..."
                              value={openAiKey}
                              onChange={onChangeOpenAiKey}
                            />
                            <div className="my-16">
                              {t('APIKeyInstruction')}<br />
                              <Link url="https://platform.openai.com/account/api-keys" label="OpenAI" />
                            </div>
                            <div className="my-16">
                              {t('ChatGPTInfo')}
                            </div>
                            <div className="my-24">
                              <div className="my-16 typography-20 font-bold">{t('SelectModel')}</div>
                              <select
                                className="px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                                value={selectAIModel}
                                onChange={(e) => setSelectAIModel(e.target.value)}
                              >
                                <option value="gpt-4o">gpt-4o</option>
                                <option value="gpt-4-turbo">gpt-4-turbo</option>
                                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                              </select>
                            </div>
                          </div>
                        );
                      } else if (selectAIService === "anthropic") {
                        return (
                          <div className="my-24">
                            <div className="my-16 typography-20 font-bold">{t('AnthropicAPIKeyLabel')}</div>
                            <input
                              className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                              type="text"
                              placeholder="..."
                              value={anthropicKey}
                              onChange={onChangeAnthropicKey}
                            />
                            <div className="my-16">
                              {t('APIKeyInstruction')}<br />
                              <Link url="https://console.anthropic.com" label="Anthropic" />
                            </div>
                            <div className="my-24">
                              <div className="my-16 typography-20 font-bold">{t('SelectModel')}</div>
                              <select
                                className="px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                                value={selectAIModel}
                                onChange={(e) => setSelectAIModel(e.target.value)}
                              >
                                <option value="claude-3-opus-20240229">claude-3-opus-20240229</option>
                                <option value="claude-3-sonnet-20240229">claude-3-sonnet-20240229</option>
                                <option value="claude-3-haiku-20240307">claude-3-haiku-20240307</option>
                              </select>
                            </div>
                          </div>
                        );
                      } else if (selectAIService === "groq") {
                        return (
                          <div className="my-24">
                            <div className="my-16 typography-20 font-bold">{t('GroqAPIKeyLabel')}</div>
                            <input
                              className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                              type="text"
                              placeholder="..."
                              value={groqKey}
                              onChange={onChangeGroqKey}
                            />
                            <div className="my-16">
                              {t('APIKeyInstruction')}<br />
                              <Link url="https://console.groq.com/keys" label="Groq Dashboard" />
                            </div>
                            <div className="my-24">
                              <div className="my-16 typography-20 font-bold">{t('SelectModel')}</div>
                              <select
                                className="px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                                value={selectAIModel}
                                onChange={(e) => setSelectAIModel(e.target.value)}
                              >
                                <option value="gemma-7b-it">gemma-7b-it</option>
                                <option value="llama3-70b-8192">llama3-70b-8192</option>
                                <option value="llama3-8b-8192">llama3-8b-8192</option>
                                <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
                              </select>
                            </div>
                          </div>
                        );
                      } else if (selectAIService === "ollama") {
                        return (
                          <div className="my-24">
                            <div className="my-16">
                              {t('OllamaInfo')}<br />
                              <Link url="https://note.com/schroneko/n/n8b1a5bbc740b" label="https://note.com/schroneko/n/n8b1a5bbc740b" />
                            </div>
                            <div className="my-16">
                              {t('OllamaInfo2')}
                            </div>
                            <div className="my-16 typography-20 font-bold">{t('SelectModel')}</div>
                            <input
                              className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                              type="text"
                              placeholder="..."
                              value={selectAIModel}
                              onChange={(e) => setSelectAIModel(e.target.value)}
                            />
                          </div>
                        );
                      } else if (selectAIService === "dify") {
                        return (
                          <div className="my-24">
                            <div className="my-16">
                              {t('DifyInfo')}<br />
                              {t('DifyInfo2')}
                            </div>
                            <div className="my-16 typography-20 font-bold">{t('DifyAPIKeyLabel')}</div>
                            <input
                              className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                              type="text"
                              placeholder="..."
                              value={difyKey}
                              onChange={onChangeDifyKey}
                            />
                            <div className="my-24">
                              <div className="my-16 typography-20 font-bold">{t('EnterURL')}</div>
                              <input
                                className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                                type="text"
                                placeholder="..."
                                value={difyUrl}
                                onChange={onChangeDifyUrl}
                              />
                            </div>
                          </div>
                        );
                      }
                    })()}
                  </div>
                  <div className="my-40">
                    <div className="my-16 typography-20 font-bold">
                      {t('YoutubeMode')}
                    </div>
                    <div className="my-8">
                      {youtubeMode ? (
                        <TextButton onClick={() => onChangeYoutubeMode(false)}>
                          {t('StatusOn')}
                        </TextButton>
                      ) : (
                        <TextButton onClick={() => onChangeYoutubeMode(true)}>
                          {t('StatusOff')}
                        </TextButton>
                      )}
                    </div>
                    <div className="my-16">
                      {(() => {
                        if (youtubeMode) {
                          return (
                            <>
                              <div className="">{t('YoutubeInfo')}</div>
                              <div className="my-16 typography-20 font-bold">{t('YoutubeAPIKey')}</div>
                              <input
                                className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                                type="text"
                                placeholder="..."
                                value={youtubeApiKey}
                                onChange={onChangeYoutubeApiKey} />
                              <div className="my-16 typography-20 font-bold">{t('YoutubeLiveID')}</div>
                              <input
                                className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                                type="text"
                                placeholder="..."
                                value={youtubeLiveId}
                                onChange={onChangeYoutubeLiveId} />
                            </>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </>
              )
            }
          })()}
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">
              {t('CharacterModelLabel')}
            </div>
            <div className="my-8">
              <select
                className="px-16 py-8 bg-surface1 hover:bg-surface1-hover rounded-8"
                value={selectVrmModel} // 現在の選択を保持する
                onChange={handleVrmChange}
              >
                <option value="/AvatarSample_A.vrm">Miho</option>
                <option value="/AvatarSample_C.vrm">Kennichi</option>
                <option value="/inuinu.vrm">Mugi</option>
              </select>
            </div>
          </div>
          {(() => {
            if (!webSocketMode) {
              return (
                <>
                  <div className="my-40">
                    <div className="my-8">
                      <div className="my-16 typography-20 font-bold">
                        {t('CharacterSettingsPrompt')}
                      </div>
                      {selectAIService === "dify" && (
                        <div className="my-16">{t('DifyInstruction')}</div>
                      )}
                      <TextButton onClick={onClickResetSystemPrompt}>
                        {t('CharacterSettingsReset')}
                      </TextButton>
                    </div>
                    <textarea
                      value={systemPrompt}
                      onChange={onChangeSystemPrompt}
                      className="px-16 py-8 bg-surface1 hover:bg-surface1-hover h-168 rounded-8 w-full"
                    ></textarea>
                  </div>
                </>
              )
              }
            })()
          }
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">{t('SyntheticVoiceEngineChoice')}</div>
            <div>{t('VoiceEngineInstruction')}</div>
            <div className="my-8">
              <select
                value={selectVoice}
                onChange={(e) => setSelectVoice(e.target.value)}
                className="px-16 py-8 bg-surface1 hover:bg-surface1-hover rounded-8"
              >
                <option value="voicevox">{t('UsingVoiceVox')}</option>
                <option value="koeiromap">{t('UsingKoeiromap')}</option>
                <option value="google">{t('UsingGoogleTTS')}</option>
                <option value="stylebertvits2">{t('UsingStyleBertVITS2')}</option>
              </select>
            </div>
            <div>&nbsp;</div>
            <div className="my-16 typography-20 font-bold">{t('VoiceAdjustment')}</div>
            {(() => {
                if (selectVoice === "koeiromap") {
                  return (
                    <>
                      <div>
                        KoemotionのKoeiromap APIを使用しています。詳しくは下記をご覧ください。<br />
                        <Link
                          url="https://koemotion.rinna.co.jp"
                          label="https://koemotion.rinna.co.jp" />
                        
                      </div>
                      <div className="mt-16 font-bold">API キー</div><div className="mt-8">
                        <input
                          className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                          type="text"
                          placeholder="..."
                          value={koeiromapKey}
                          onChange={onChangeKoeiromapKey} />
                      </div>
                      <div className="mt-16 font-bold">プリセット</div><div className="my-8 grid grid-cols-2 gap-[8px]">
                        <TextButton
                          onClick={() => onChangeKoeiroParam(PRESET_A.speakerX, PRESET_A.speakerY)}
                        >
                          かわいい
                        </TextButton>
                        <TextButton
                          onClick={() => onChangeKoeiroParam(PRESET_B.speakerX, PRESET_B.speakerY)}
                        >
                          元気
                        </TextButton>
                        <TextButton
                          onClick={() => onChangeKoeiroParam(PRESET_C.speakerX, PRESET_C.speakerY)}
                        >
                          かっこいい
                        </TextButton>
                        <TextButton
                          onClick={() => onChangeKoeiroParam(PRESET_D.speakerX, PRESET_D.speakerY)}
                        >
                          渋い
                        </TextButton>
                      </div><div className="my-24">
                        <div className="select-none">x : {koeiroParam.speakerX}</div>
                        <input
                          type="range"
                          min={-10}
                          max={10}
                          step={0.001}
                          value={koeiroParam.speakerX}
                          className="mt-8 mb-16 input-range"
                          onChange={(e) => {
                            onChangeKoeiroParam(
                              Number(e.target.value),
                              koeiroParam.speakerY
                            );
                          } }
                        ></input>
                        <div className="select-none">y : {koeiroParam.speakerY}</div>
                        <input
                          type="range"
                          min={-10}
                          max={10}
                          step={0.001}
                          value={koeiroParam.speakerY}
                          className="mt-8 mb-16 input-range"
                          onChange={(e) => {
                            onChangeKoeiroParam(
                              koeiroParam.speakerX,
                              Number(e.target.value)
                            );
                          } }
                        ></input>
                      </div>
                    </>
                  );
                } else if (selectVoice === "voicevox") {
                  return (
                    <>
                      <div>
                        VOICEVOXを使用しています。ローカルAPIを使用するので下記のサイトから環境にあったアプリをダウンロードし、起動しておく必要があります。<br />
                        <Link
                          url="https://voicevox.hiroshiba.jp/"
                          label="https://voicevox.hiroshiba.jp/" />
                      </div>
                      <div className="mt-16 font-bold">{t('SpeakerSelection')}</div>
                        <div className="flex items-center">
                          <select
                            value={voicevoxSpeaker}
                            onChange={onChangeVoicevoxSpeaker}
                            className="px-16 py-8 bg-surface1 hover:bg-surface1-hover rounded-8"
                          >
                            <option value="">選択してください</option>
                            {speakers.map((speaker) => (
                              <option key={speaker.id} value={speaker.speaker}>
                                {speaker.speaker}
                              </option>
                            ))}
                          </select>
                          <TextButton onClick={() => onClickTestVoice(voicevoxSpeaker)} className="ml-16">
                            ボイスを試聴する
                          </TextButton>
                        </div>
                    </>
                  );
                } else if (selectVoice === "google"){
                  return (
                    <>
                      <div>
                        {t('GoogleTTSInfo')}
                        {t('AuthFileInstruction')}<br />
                        <Link
                          url="https://developers.google.com/workspace/guides/create-credentials?#create_credentials_for_a_service_account"
                          label="https://developers.google.com/workspace/guides/create-credentials?#create_credentials_for_a_service_account" />
                        <br /><br />
                        {t('LanguageModelURL')}<br />
                        <Link
                          url="https://cloud.google.com/text-to-speech/docs/voices"
                          label="https://cloud.google.com/text-to-speech/docs/voices" />
                      </div>
                      <div className="mt-16 font-bold">{t('LanguageChoice')}</div>
                      <div className="mt-8">
                        <input
                          className="text-ellipsis px-16 py-8 w-col-span-4 bg-surface1 hover:bg-surface1-hover rounded-8"
                          type="text"
                          placeholder="..."
                          value={googleTtsType}
                          onChange={onChangeGoogleTtsType} />
                      </div>
                    </>
                  );
                } else if (selectVoice === "stylebertvits2"){
                  return (
                    <>
                      <div>
                        {t('StyleBertVITS2Info')}
                        <br />
                        <Link
                          url="https://github.com/litagin02/Style-Bert-VITS2"
                          label="https://github.com/litagin02/Style-Bert-VITS2" />
                        <br /><br />
                      </div>
                      <div className="mt-16 font-bold">{t('StyleBeatVITS2LocalServerURL')}</div>
                      <div className="mt-8">
                        <input
                          className="text-ellipsis px-16 py-8 w-col-span-4 bg-surface1 hover:bg-surface1-hover rounded-8"
                          type="text"
                          placeholder="..."
                          value={stylebertvits2ServerUrl}
                          onChange={onChangeStyleBertVits2ServerUrl} />
                      </div>
                      <div className="mt-16 font-bold">{t('StyleBeatVITS2ModelID')}</div>
                      <div className="mt-8">
                        <input
                          className="text-ellipsis px-16 py-8 w-col-span-4 bg-surface1 hover:bg-surface1-hover rounded-8"
                          type="number"
                          placeholder="..."
                          value={stylebertvits2ModelId}
                          onChange={onChangeStyleBertVits2ModelId} />
                      </div>
                      <div className="mt-16 font-bold">{t('StyleBeatVITS2Style')}</div>
                      <div className="mt-8">
                        <input
                          className="text-ellipsis px-16 py-8 w-col-span-4 bg-surface1 hover:bg-surface1-hover rounded-8"
                          type="text"
                          placeholder="..."
                          value={stylebertvits2Style}
                          onChange={onChangeStyleBertVits2Style} />
                      </div>
                    </>
                  );
                }
            })()}

          </div>
          {chatLog.length > 0 && (
            <div className="my-40">
              <div className="my-8 grid-cols-2">
                <div className="my-16 typography-20 font-bold">{t('ConversationHistory')}</div>
                <div className="my-8">
                  {t('ConversationHistoryInfo')}
                </div>
                <TextButton onClick={() => {
                  onClickResetChatLog();
                  onClickResetCodeLog();
                }}>
                  {t('ConversationHistoryReset')}
                </TextButton>
              </div>
              <div className="my-8">
                {chatLog.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="my-8 grid grid-flow-col  grid-cols-[min-content_1fr] gap-x-fixed"
                    >
                      <div className="w-[64px] py-8">
                        {value.role === "assistant" ? "Character" : "You"}
                      </div>
                      <input
                        key={index}
                        className="bg-surface1 hover:bg-surface1-hover rounded-8 w-full px-16 py-8"
                        type="text"
                        value={value.content}
                        onChange={(event) => {
                          onChangeChatLog(index, event.target.value);
                          onChangeCodeLog(index, event.target.value);
                        }}
                      ></input>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
