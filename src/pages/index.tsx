import { useCallback, useContext, useEffect, useState, useRef } from "react";
import VrmViewer from "@/components/vrmViewer";
import { ViewerContext } from "@/features/vrmViewer/viewerContext";
import {
  Message,
  textsToScreenplay,
  Screenplay,
} from "@/features/messages/messages";
import { speakCharacter } from "@/features/messages/speakCharacter";
import { MessageInputContainer } from "@/components/messageInputContainer";
import { SYSTEM_PROMPT } from "@/features/constants/systemPromptConstants";
import { KoeiroParam, DEFAULT_PARAM } from "@/features/constants/koeiroParam";
import { getOpenAIChatResponseStream } from "@/features/chat/openAiChat";
import { getAnthropicChatResponseStream } from "@/features/chat/anthropicChat";
import { getGoogleChatResponseStream } from "@/features/chat/googleChat";
import { getLocalLLMChatResponseStream } from "@/features/chat/localLLMChat";
import { getGroqChatResponseStream } from "@/features/chat/groqChat";
import { getDifyChatResponseStream } from "@/features/chat/difyChat";
import { Introduction } from "@/components/introduction";
import { Menu } from "@/components/menu";
import { Meta } from "@/components/meta";
import "@/lib/i18n";
import { useTranslation } from 'react-i18next';
import { fetchAndProcessComments } from "@/features/youtube/youtubeComments";
import { buildUrl } from "@/utils/buildUrl";

export default function Home() {
  const { viewer } = useContext(ViewerContext);

  const [systemPrompt, setSystemPrompt] = useState(SYSTEM_PROMPT);
  const [selectAIService, setSelectAIService] = useState("openai");
  const [selectAIModel, setSelectAIModel] = useState("gpt-3.5-turbo");
  const [openAiKey, setOpenAiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [googleKey, setGoogleKey] = useState("");
  const [groqKey, setGroqKey] = useState("");
  const [localLlmUrl, setLocalLlmUrl] = useState("");
  const [difyKey, setDifyKey] = useState("");
  const [difyUrl, setDifyUrl] = useState("");
  const [selectVoice, setSelectVoice] = useState("voicevox");
  const [selectLanguage, setSelectLanguage] = useState("JP");
  const [selectVoiceLanguage, setSelectVoiceLanguage] = useState("ja-JP");
  const [koeiromapKey, setKoeiromapKey] = useState("");
  const [voicevoxSpeaker, setVoicevoxSpeaker] = useState("2");
  const [googleTtsType, setGoogleTtsType] = useState(process.env.NEXT_PUBLIC_GOOGLE_TTS_TYPE && process.env.NEXT_PUBLIC_GOOGLE_TTS_TYPE !== "" ? process.env.NEXT_PUBLIC_GOOGLE_TTS_TYPE : "");
  const [stylebertvits2ServerUrl, setStylebertvits2ServerURL] = useState("http://127.0.0.1:5000");
  const [stylebertvits2ModelId, setStylebertvits2ModelId] = useState("0");
  const [stylebertvits2Style, setStylebertvits2Style] = useState("Neutral");
  const [youtubeMode, setYoutubeMode] = useState(false);
  const [youtubeApiKey, setYoutubeApiKey] = useState("");
  const [youtubeLiveId, setYoutubeLiveId] = useState("");
  const [conversationContinuityMode, setConversationContinuityMode] = useState(false);
  const [koeiroParam, setKoeiroParam] = useState<KoeiroParam>(DEFAULT_PARAM);
  const [chatProcessing, setChatProcessing] = useState(false);
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [codeLog, setCodeLog] = useState<Message[]>([]);
  const [assistantMessage, setAssistantMessage] = useState("");
  const [webSocketMode, changeWebSocketMode] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false); // WebSocketモード用の設定
  const { t } = useTranslation();
  const INTERVAL_MILL_SECONDS_RETRIEVING_COMMENTS = 5000; // 5秒
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    process.env.NEXT_PUBLIC_BACKGROUND_IMAGE_PATH !== undefined ? process.env.NEXT_PUBLIC_BACKGROUND_IMAGE_PATH : "/bg-c.png"
  );
  const [dontShowIntroduction, setDontShowIntroduction] = useState(false);
  const [gsviTtsServerUrl, setGSVITTSServerUrl] = useState(process.env.NEXT_PUBLIC_LOCAL_TTS_URL && process.env.NEXT_PUBLIC_LOCAL_TTS_URL !== "" ? process.env.NEXT_PUBLIC_LOCAL_TTS_URL : "http://127.0.0.1:5000/tts");
  const [gsviTtsModelId, setGSVITTSModelID] = useState("");
  const [gsviTtsBatchSize, setGSVITTSBatchSize] = useState(2);
  const [gsviTtsSpeechRate, setGSVITTSSpeechRate] = useState(1.0);
  const [youtubeNextPageToken, setYoutubeNextPageToken] = useState("");
  const [youtubeContinuationCount, setYoutubeContinuationCount] = useState(0);
  const [youtubeNoCommentCount, setYoutubeNoCommentCount] = useState(0);
  const [youtubeSleepMode, setYoutubeSleepMode] = useState(false);
  const [chatProcessingCount, setChatProcessingCount] = useState(0);

  const incrementChatProcessingCount = () => {
    setChatProcessingCount(prevCount => prevCount + 1);
  };

  const decrementChatProcessingCount = () => {
    setChatProcessingCount(prevCount => prevCount - 1);
  }

  useEffect(() => {
    const storedData = window.localStorage.getItem("chatVRMParams");
    if (storedData) {
      const params = JSON.parse(storedData);
      setSystemPrompt(params.systemPrompt || SYSTEM_PROMPT);
      setKoeiroParam(params.koeiroParam || DEFAULT_PARAM);
      setChatLog(Array.isArray(params.chatLog) ? params.chatLog : []);
      setCodeLog(Array.isArray(params.codeLog) ? params.codeLog : []);
      setSelectAIService(params.selectAIService || "openai");
      setSelectAIModel(params.selectAIModel || "gpt-3.5-turbo");
      setOpenAiKey(params.openAiKey || "");
      setAnthropicKey(params.anthropicKey || "");
      setGoogleKey(params.googleKey || "");
      setGroqKey(params.groqKey || "");
      setDifyKey(params.difyKey || "");
      setDifyUrl(params.difyUrl || "");
      setSelectVoice(params.selectVoice || "voicevox");
      setSelectLanguage(params.selectLanguage || "JP");
      setSelectVoiceLanguage(params.selectVoiceLanguage || "ja-JP");
      setKoeiromapKey(params.koeiromapKey || "");
      setVoicevoxSpeaker(params.voicevoxSpeaker || "2");
      setGoogleTtsType(params.googleTtsType || "en-US-Neural2-F");
      setYoutubeMode(params.youtubeMode || false);
      setYoutubeApiKey(params.youtubeApiKey || "");
      setYoutubeLiveId(params.youtubeLiveId || "");
      setConversationContinuityMode(params.conversationContinuityMode || false);
      changeWebSocketMode(params.webSocketMode || false);
      setStylebertvits2ServerURL(params.stylebertvits2ServerUrl || "http://127.0.0.1:5000");
      setStylebertvits2ModelId(params.stylebertvits2ModelId || "0");
      setStylebertvits2Style(params.stylebertvits2Style || "Neutral");
      setDontShowIntroduction(params.dontShowIntroduction || false);
      setGSVITTSServerUrl(params.gsviTtsServerUrl || "http://127.0.0.1:5000/tts");
      setGSVITTSModelID(params.gsviTtsModelId || "");
      setGSVITTSBatchSize(params.gsviTtsBatchSize || 2);
      setGSVITTSSpeechRate(params.gsviTtsSpeechRate || 1.0);
    }
  }, []);

  useEffect(() => {
    const params = {
      systemPrompt,
      koeiroParam,
      chatLog,
      codeLog,
      selectAIService,
      selectAIModel,
      openAiKey,
      anthropicKey,
      googleKey,
      groqKey,
      difyKey,
      difyUrl,
      selectVoice,
      selectLanguage,
      selectVoiceLanguage,
      koeiromapKey,
      voicevoxSpeaker,
      googleTtsType,
      youtubeMode,
      youtubeApiKey,
      youtubeLiveId,
      conversationContinuityMode,
      webSocketMode,
      stylebertvits2ServerUrl,
      stylebertvits2ModelId,
      stylebertvits2Style,
      dontShowIntroduction,
      gsviTtsServerUrl,
      gsviTtsModelId,
      gsviTtsBatchSize,
      gsviTtsSpeechRate
    };
    process.nextTick(() =>
      window.localStorage.setItem(
        "chatVRMParams", JSON.stringify(params)
      )
    );
  }, [
    systemPrompt,
    koeiroParam,
    chatLog,
    codeLog,
    selectAIService,
    selectAIModel,
    openAiKey,
    anthropicKey,
    googleKey,
    groqKey,
    difyKey,
    difyUrl,
    selectVoice,
    selectLanguage,
    selectVoiceLanguage,
    koeiromapKey,
    voicevoxSpeaker,
    googleTtsType,
    youtubeMode,
    youtubeApiKey,
    youtubeLiveId,
    conversationContinuityMode,
    webSocketMode,
    stylebertvits2ServerUrl,
    stylebertvits2ModelId,
    stylebertvits2Style,
    dontShowIntroduction,
    gsviTtsServerUrl,
    gsviTtsModelId,
    gsviTtsBatchSize,
    gsviTtsSpeechRate
  ]);

  const handleChangeChatLog = useCallback(
    (targetIndex: number, text: string) => {
      const newChatLog = chatLog.map((v: Message, i) => {
        return i === targetIndex ? { role: v.role, content: text } : v;
      });

      setChatLog(newChatLog);
    },
    [chatLog]
  );

  const handleChangeCodeLog = useCallback(
    async (targetIndex: number, text: string) => {
      const newCodeLog = codeLog.map((v: Message, i) => {
        return i === targetIndex ? { role: v.role, content: text} : v;
      });

      setCodeLog(newCodeLog);
    },
    [codeLog]
  );

  /**
   * 文ごとに音声を直列でリクエストしながら再生する
   */
  const handleSpeakAi = useCallback(
    async (
      screenplay: Screenplay,
      onStart?: () => void,
      onEnd?: () => void
    ) => {
      speakCharacter(
        screenplay,
        viewer,
        selectVoice,
        selectLanguage,
        koeiromapKey,
        voicevoxSpeaker,
        googleTtsType,
        stylebertvits2ServerUrl,
        stylebertvits2ModelId,
        stylebertvits2Style,
        gsviTtsServerUrl,
        gsviTtsModelId,
        gsviTtsBatchSize,
        gsviTtsSpeechRate,
        onStart,
        onEnd
      );
    },
    [
      viewer,
      selectVoice,
      selectLanguage,
      koeiromapKey,
      voicevoxSpeaker,
      googleTtsType,
      stylebertvits2ServerUrl,
      stylebertvits2ModelId,
      stylebertvits2Style,
      gsviTtsServerUrl,
      gsviTtsModelId,
      gsviTtsBatchSize,
      gsviTtsSpeechRate
    ]
  );

  const wsRef = useRef<WebSocket | null>(null);
  /**
   * AIからの応答を処理する関数
   * @param currentChatLog ログに残るメッセージの配列
   * @param messages 解答生成に使用するメッセージの配列
   */
  const processAIResponse = useCallback(async (currentChatLog: Message[], messages: Message[]) => {
    setChatProcessing(true);
    let stream;

    const _openAiKey = openAiKey && openAiKey !== "" ? openAiKey : process.env.NEXT_PUBLIC_OPEN_AI_KEY || "";
    const _anthropicKey = anthropicKey && anthropicKey !== "" ? anthropicKey : process.env.NEXT_PUBLIC_ANTHROPIC_KEY || "";
    const _googleKey = googleKey && googleKey !== "" ? googleKey : process.env.NEXT_PUBLIC_GOOGLE_KEY || "";
    const _localLlmUrl = localLlmUrl && localLlmUrl !== "" ? localLlmUrl : process.env.NEXT_PUBLIC_LOCAL_LLM_URL || "";
    const _selectAIModel = selectAIModel && selectAIModel !== "" ? selectAIModel : process.env.NEXT_PUBLIC_LOCAL_LLM_MODEL || "";
    const _groqKey = groqKey && groqKey !== "" ? groqKey : process.env.NEXT_PUBLIC_GROQ_KEY || "";
    const _difyKey = difyKey && difyKey !== "" ? difyKey : process.env.NEXT_PUBLIC_DIFY_KEY || "";
    const _difyUrl = difyUrl && difyUrl !== "" ? difyUrl : process.env.NEXT_PUBLIC_DIFY_URL || "";

    try {
      if (selectAIService === "openai") {
        stream = await getOpenAIChatResponseStream(messages, _openAiKey, selectAIModel);
      } else if (selectAIService === "anthropic") {
        stream = await getAnthropicChatResponseStream(messages, _anthropicKey, selectAIModel);
      } else if (selectAIService === "google") {
        stream = await getGoogleChatResponseStream(messages, _googleKey, selectAIModel);
      } else if (selectAIService === "localLlm") {
        stream = await getLocalLLMChatResponseStream(messages, _localLlmUrl, _selectAIModel);
      } else if (selectAIService === "groq") {
        stream = await getGroqChatResponseStream(messages, _groqKey, selectAIModel);
      } else if (selectAIService === "dify") {
        stream = await getDifyChatResponseStream(messages, _difyKey, _difyUrl);
      }
    } catch (e) {
      console.error(e);
      stream = null;
    }
    if (stream == null) {
      setChatProcessing(false);
      return;
    }

    const reader = stream.getReader();
    let receivedMessage = "";
    let aiTextLog = "";
    let tag = "";
    const sentences = new Array<string>();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        receivedMessage += value;

        // 返答内容のタグ部分の検出
        const tagMatch = receivedMessage.match(/^\[(.*?)\]/);
        if (tagMatch && tagMatch[0]) {
          tag = tagMatch[0];
          receivedMessage = receivedMessage.slice(tag.length);
        }

        // 返答を一文単位で切り出して処理する
        const sentenceMatch = receivedMessage.match(
          /^(.+[。．！？\n]|.{10,}[、,])/
        );
        if (sentenceMatch && sentenceMatch[0]) {
          const sentence = sentenceMatch[0];
          sentences.push(sentence);
          receivedMessage = receivedMessage
            .slice(sentence.length)
            .trimStart();

          // 発話不要/不可能な文字列だった場合はスキップ
          if (
            !sentence.replace(
              /^[\s\[\(\{「［（【『〈《〔｛«‹〘〚〛〙›»〕》〉』】）］」\}\)\]]+$/g,
              ""
            )
          ) {
            continue;
          }

          const aiText = `${tag} ${sentence}`;
          const aiTalks = textsToScreenplay([aiText], koeiroParam);
          aiTextLog += aiText;

          // 文ごとに音声を生成 & 再生、返答を表示
          const currentAssistantMessage = sentences.join(" ");

          handleSpeakAi(aiTalks[0], () => {
            setAssistantMessage(currentAssistantMessage);
            incrementChatProcessingCount();
          }, () => {
            decrementChatProcessingCount();
          });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      reader.releaseLock();
    }

    // アシスタントの返答をログに追加
    const messageLogAssistant: Message[] = [
      ...currentChatLog,
      { role: "assistant", content: aiTextLog },
    ];
    setChatLog(messageLogAssistant);
    setChatProcessing(false);
  }, [selectAIService, openAiKey, selectAIModel, anthropicKey, googleKey, localLlmUrl, groqKey, difyKey, difyUrl, koeiroParam, handleSpeakAi]);

  const preProcessAIResponse = useCallback(async (messages: Message[]) => {
    await processAIResponse(chatLog, messages);
  }, [chatLog, processAIResponse]);

  /**
   * アシスタントとの会話を行う
   */
  const handleSendChat = useCallback(
    async (text: string, role?: string) => {
      const newMessage = text;

      if (newMessage == null) {
        return;
      }

      if (webSocketMode) {
        // 未メンテなので不具合がある可能性あり
        console.log("websocket mode: true")
        setChatProcessing(true);

        if (role !== undefined && role !== "user") {
          // WebSocketからの返答を処理

          if (role == "assistant") {
            let aiText = `${"[neutral]"} ${newMessage}`;
            try {
              const aiTalks = textsToScreenplay([aiText], koeiroParam);

              // 文ごとに音声を生成 & 再生、返答を表示
              handleSpeakAi(aiTalks[0], async () => {
                // アシスタントの返答をログに追加
                const updateLog: Message[] = [
                  ...codeLog,
                  { role: "assistant", content: newMessage },
                ];
                setChatLog(updateLog);
                setCodeLog(updateLog);

                setAssistantMessage(newMessage);
                setIsVoicePlaying(false);
                setChatProcessing(false);
              });
            } catch (e) {
              setIsVoicePlaying(false);
              setChatProcessing(false);
            }
          } else if (role == "code" || role == "output" || role == "executing"){ // コードコメントの処理
            // ループ完了後にAI応答をコードログに追加
            const updateLog: Message[] = [
              ...codeLog,
              { role: role, content: newMessage },
            ];
            setCodeLog(updateLog);
            setChatProcessing(false);
          } else { // その他のコメントの処理（現想定では使用されないはず）
            console.log("error role:", role)
          }
        } else {
          // WebSocketで送信する処理

          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            // ユーザーの発言を追加して表示
            const updateLog: Message[] = [
              ...codeLog,
              { role: "user", content: newMessage },
            ];
            setChatLog(updateLog);
            setCodeLog(updateLog);

            // WebSocket送信
            wsRef.current.send(JSON.stringify({content: newMessage, type: "chat"}));
          } else {
            setAssistantMessage(t('NotConnectedToExternalAssistant'));
            setChatProcessing(false);
          }
        }
      } else {
        // ChatVRM original mode
        if (selectAIService === "openai" && !openAiKey && !process.env.NEXT_PUBLIC_OPEN_AI_KEY ||
        selectAIService === "anthropic" && !anthropicKey && !process.env.NEXT_PUBLIC_ANTHROPIC_KEY ||
        selectAIService === "google" && !googleKey && !process.env.NEXT_PUBLIC_GOOGLE_KEY ||
        selectAIService === "groq" && !groqKey && !process.env.NEXT_PUBLIC_GROQ_KEY ||
        selectAIService === "dify" && !difyKey && !process.env.NEXT_PUBLIC_DIFY_KEY) {
          setAssistantMessage(t('APIKeyNotEntered'));
          return;
        }

        setChatProcessing(true);
        // ユーザーの発言を追加して表示
        const messageLog: Message[] = [
          ...chatLog,
          { role: "user", content: newMessage },
        ];
        setChatLog(messageLog);

        const messages: Message[] = [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messageLog.slice(-10),
        ];

        try {
          await processAIResponse(messageLog, messages);
        } catch (e) {
          console.error(e);
        }
  
        setChatProcessing(false);
      }
    },
    [webSocketMode, koeiroParam, handleSpeakAi, codeLog, t, selectAIService, openAiKey, anthropicKey, googleKey, groqKey, difyKey, chatLog, systemPrompt, processAIResponse]
  );

  ///取得したコメントをストックするリストの作成（tmpMessages）
  interface tmpMessage {
    text: string;
    role: string;
    emotion: string;
  }
  const [tmpMessages, setTmpMessages] = useState<tmpMessage[]>([]);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      console.log("WebSocket connection opened:", event);
    };
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message:", event.data);
      const jsonData = JSON.parse(event.data);
      setTmpMessages((prevMessages) => [...prevMessages, jsonData]);
    };
    const handleError = (event: Event) => {
      console.error("WebSocket error:", event);
    };
    const handleClose = (event: Event) => {
      console.log("WebSocket connection closed:", event);
    };

    function setupWebsocket() {
      const ws = new WebSocket("ws://localhost:8000/ws");
      ws.addEventListener("open", handleOpen);
      ws.addEventListener("message", handleMessage);
      ws.addEventListener("error", handleError);
      ws.addEventListener("close", handleClose);
      return ws;
    }
    let ws = setupWebsocket();
    wsRef.current = ws;

    const reconnectInterval = setInterval(() => {
      if (webSocketMode && ws.readyState !== WebSocket.OPEN && ws.readyState !== WebSocket.CONNECTING) {
        setChatProcessing(false);
        console.log("try reconnecting...");
        ws.close();
        ws = setupWebsocket();
        wsRef.current = ws;
      }
    }, 1000);

    return () => {
      clearInterval(reconnectInterval);
      ws.close();
    };
  }, [webSocketMode]);

  // WebSocketモード用の処理
  useEffect(() => {
    if (tmpMessages.length > 0 && !isVoicePlaying) {
      const message = tmpMessages[0];
      if (message.role == "assistant") { setIsVoicePlaying(true) };
      setTmpMessages((tmpMessages) => tmpMessages.slice(1));
      handleSendChat(message.text, message.role);
    }
  }, [tmpMessages, isVoicePlaying, handleSendChat]);

  // YouTubeコメントを取得する処理
  const fetchAndProcessCommentsCallback = useCallback(async() => {
    if (!openAiKey || !youtubeLiveId || !youtubeApiKey || chatProcessing || chatProcessingCount > 0) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, INTERVAL_MILL_SECONDS_RETRIEVING_COMMENTS));
    console.log("Call fetchAndProcessComments !!!");

    fetchAndProcessComments(
      systemPrompt,
      chatLog,
      openAiKey,
      selectAIModel,
      youtubeLiveId,
      youtubeApiKey,
      youtubeNextPageToken,
      setYoutubeNextPageToken,
      youtubeNoCommentCount,
      setYoutubeNoCommentCount,
      youtubeContinuationCount,
      setYoutubeContinuationCount,
      youtubeSleepMode,
      setYoutubeSleepMode,
      conversationContinuityMode,
      handleSendChat,
      preProcessAIResponse
    );
  }, [
    openAiKey,
    selectAIModel,
    youtubeLiveId,
    youtubeApiKey,
    chatProcessing,
    chatProcessingCount,
    systemPrompt,
    chatLog,
    youtubeNextPageToken,
    setYoutubeNextPageToken,
    youtubeNoCommentCount,
    setYoutubeNoCommentCount,
    youtubeContinuationCount,
    setYoutubeContinuationCount,
    youtubeSleepMode,
    setYoutubeSleepMode,
    conversationContinuityMode,
    handleSendChat,
    preProcessAIResponse
  ]);

  useEffect(() => {
    console.log("chatProcessingCount:", chatProcessingCount);
    fetchAndProcessCommentsCallback();
  }, [chatProcessingCount, youtubeLiveId, youtubeApiKey, conversationContinuityMode, fetchAndProcessCommentsCallback]);

  useEffect(() => {
    if (youtubeNoCommentCount < 1) return;
    console.log("youtubeSleepMode:", youtubeSleepMode);
    setTimeout(() => {
      fetchAndProcessCommentsCallback();
    }, INTERVAL_MILL_SECONDS_RETRIEVING_COMMENTS);
  }, [youtubeNoCommentCount, conversationContinuityMode, youtubeSleepMode, fetchAndProcessCommentsCallback]);

  return (
    <>
      <div className={"font-M_PLUS_2"} style={{ backgroundImage: `url(${buildUrl(backgroundImageUrl)})`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <Meta />
        {!dontShowIntroduction && (
          <Introduction
            dontShowIntroduction={dontShowIntroduction}
            onChangeDontShowIntroduction={setDontShowIntroduction}
            selectLanguage={selectLanguage}
            setSelectLanguage={setSelectLanguage}
            setSelectVoiceLanguage={setSelectVoiceLanguage}
          />
        )}
        <VrmViewer />
        <MessageInputContainer
          isChatProcessing={chatProcessing}
          onChatProcessStart={handleSendChat}
          selectVoiceLanguage={selectVoiceLanguage}
        />
        <Menu
          selectAIService={selectAIService}
          onChangeAIService={setSelectAIService}
          selectAIModel={selectAIModel}
          setSelectAIModel={setSelectAIModel}
          openAiKey={openAiKey}
          onChangeOpenAiKey={setOpenAiKey}
          anthropicKey={anthropicKey}
          onChangeAnthropicKey={setAnthropicKey}
          googleKey={googleKey}
          onChangeGoogleKey={setGoogleKey}
          groqKey={groqKey}
          onChangeGroqKey={setGroqKey}
          localLlmUrl={localLlmUrl}
          onChangeLocalLlmUrl={setLocalLlmUrl}
          difyKey={difyKey}
          onChangeDifyKey={setDifyKey}
          difyUrl={difyUrl}
          onChangeDifyUrl={setDifyUrl}
          systemPrompt={systemPrompt}
          chatLog={chatLog}
          codeLog={codeLog}
          koeiroParam={koeiroParam}
          assistantMessage={assistantMessage}
          koeiromapKey={koeiromapKey}
          voicevoxSpeaker={voicevoxSpeaker}
          googleTtsType={googleTtsType}
          stylebertvits2ServerUrl={stylebertvits2ServerUrl}
          stylebertvits2ModelId={stylebertvits2ModelId}
          stylebertvits2Style={stylebertvits2Style}
          youtubeMode={youtubeMode}
          youtubeApiKey={youtubeApiKey}
          youtubeLiveId={youtubeLiveId}
          conversationContinuityMode={conversationContinuityMode}
          onChangeSystemPrompt={setSystemPrompt}
          onChangeChatLog={handleChangeChatLog}
          onChangeCodeLog={handleChangeCodeLog}
          onChangeKoeiromapParam={setKoeiroParam}
          onChangeYoutubeMode={setYoutubeMode}
          onChangeYoutubeApiKey={setYoutubeApiKey}
          onChangeYoutubeLiveId={setYoutubeLiveId}
          onChangeConversationContinuityMode={setConversationContinuityMode}
          handleClickResetChatLog={() => setChatLog([])}
          handleClickResetCodeLog={() => setCodeLog([])}
          handleClickResetSystemPrompt={() => setSystemPrompt(SYSTEM_PROMPT)}
          onChangeKoeiromapKey={setKoeiromapKey}
          onChangeVoicevoxSpeaker={setVoicevoxSpeaker}
          onChangeGoogleTtsType={setGoogleTtsType}
          onChangeStyleBertVits2ServerUrl={setStylebertvits2ServerURL}
          onChangeStyleBertVits2ModelId={setStylebertvits2ModelId}
          onChangeStyleBertVits2Style={setStylebertvits2Style}
          webSocketMode={webSocketMode}
          changeWebSocketMode={changeWebSocketMode}
          selectVoice={selectVoice}
          setSelectVoice={setSelectVoice}
          selectLanguage={selectLanguage}
          setSelectLanguage={setSelectLanguage}
          setSelectVoiceLanguage={setSelectVoiceLanguage}
          setBackgroundImageUrl={setBackgroundImageUrl}
          gsviTtsServerUrl={gsviTtsServerUrl}
          onChangeGSVITtsServerUrl={setGSVITTSServerUrl}
          gsviTtsModelId={gsviTtsModelId}
          onChangeGSVITtsModelId={setGSVITTSModelID}
          gsviTtsBatchSize={gsviTtsBatchSize}
          onChangeGVITtsBatchSize={setGSVITTSBatchSize}
          gsviTtsSpeechRate={gsviTtsSpeechRate}
          onChangeGSVITtsSpeechRate={setGSVITTSSpeechRate}
        />
      </div>
    </>
  );
}
