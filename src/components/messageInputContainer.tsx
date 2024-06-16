import { MessageInput } from "@/components/messageInput";
import { useState, useEffect, useCallback, useRef } from "react";

type Props = {
  isChatProcessing: boolean;
  onChatProcessStart: (text: string) => void;
  selectVoiceLanguage: string;
};

/**
 * テキスト入力と音声入力を提供する
 *
 * 音声認識の完了時は自動で送信し、返答文の生成中は入力を無効化する
 *
 */
export const MessageInputContainer = ({
  isChatProcessing,
  onChatProcessStart,
  selectVoiceLanguage
}: Props) => {
  console.log("MessageInputContainer コンポーネントがレンダリングされました。");
  const [userMessage, setUserMessage] = useState("");
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  const [isMicRecording, setIsMicRecording] = useState(false);
  const silenceTimeout = useRef<NodeJS.Timeout | null>(null);

  const SILENCE_DURATION = 5000; // 5秒の無音で終了とする

  const onChatProcessStartRef = useRef(onChatProcessStart);
  const isChatProcessingRef = useRef(isChatProcessing);

  useEffect(() => {
    console.log("onChatProcessStart が更新されました。");
    onChatProcessStartRef.current = onChatProcessStart;
  }, [onChatProcessStart]);

  useEffect(() => {
    console.log("isChatProcessing が更新されました。");
    isChatProcessingRef.current = isChatProcessing;
  }, [isChatProcessing]);

  // 無音タイマーをリセットする関数
  const resetSilenceTimer = useCallback(() => {
    console.log("無音タイマーをリセットします。");
    if (silenceTimeout.current) {
      clearTimeout(silenceTimeout.current);
    }
    silenceTimeout.current = setTimeout(() => {
      if (speechRecognition) {
        speechRecognition.stop();
      }
    }, SILENCE_DURATION);
  }, [speechRecognition]);

  // 音声認識の結果を処理する
  const handleRecognitionResult = useCallback((event: SpeechRecognitionEvent) => {
    console.log("音声認識の結果を処理します。");
    const text = event.results[0][0].transcript;
    setUserMessage(text);

    // 発言の終了時
    if (event.results[0].isFinal) {
      setUserMessage(text);
      // 返答文の生成を開始
      onChatProcessStartRef.current(text);
    }
    resetSilenceTimer(); // 無音タイマーをリセット
  }, [resetSilenceTimer]);

  // 無音が続いた場合も終了する
  const handleRecognitionEnd = useCallback(() => {
    console.log("音声認識が終了しました。");
    setIsMicRecording(false);

    // 一定時間無音が続いた場合に再度音声認識を開始する
    if (!isChatProcessingRef.current && speechRecognition) {
      setTimeout(() => {
        if (speechRecognition) {
          speechRecognition.start();
          setIsMicRecording(true);
        }
      }, SILENCE_DURATION);
    }
  }, [speechRecognition]);

  const handleClickMicButton = useCallback(() => {
    console.log("マイクボタンがクリックされました。");
    if (isMicRecording && speechRecognition) {
      speechRecognition.abort();
      setIsMicRecording(false);
      if (silenceTimeout.current) {
        clearTimeout(silenceTimeout.current);
      }
      return;
    }

    if (speechRecognition) {
      speechRecognition.start();
      setIsMicRecording(true);
      resetSilenceTimer(); // 無音タイマーを開始
    }
  }, [isMicRecording, speechRecognition, resetSilenceTimer]);

  const handleClickSendButton = useCallback(() => {
    console.log("送信ボタンがクリックされました。");
    onChatProcessStart(userMessage);
  }, [onChatProcessStart, userMessage]);

  useEffect(() => {
    console.log("SpeechRecognition を設定します。");
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectVoiceLanguage;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.addEventListener("result", handleRecognitionResult);
    recognition.addEventListener("end", handleRecognitionEnd);

    setSpeechRecognition(recognition);

    return () => {
      recognition.removeEventListener("result", handleRecognitionResult);
      recognition.removeEventListener("end", handleRecognitionEnd);
    };
  }, [selectVoiceLanguage]);

  useEffect(() => {
    console.log("isChatProcessing が変更されました。");
    if (!isChatProcessing) {
      setUserMessage("");
    }
  }, [isChatProcessing]);

  return (
    <MessageInput
      userMessage={userMessage}
      isChatProcessing={isChatProcessing}
      isMicRecording={isMicRecording}
      onChangeUserMessage={(e) => setUserMessage(e.target.value)}
      onClickMicButton={handleClickMicButton}
      onClickSendButton={handleClickSendButton}
    />
  );
};
