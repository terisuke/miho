import { IconButton } from "./iconButton";
import { Message } from "@/features/messages/messages";
import { KoeiroParam } from "@/features/constants/koeiroParam";
import { ChatLog } from "./chatLog";
import { CodeLog } from "./codeLog";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Settings } from "./settings";
import { ViewerContext } from "@/features/vrmViewer/viewerContext";
import { AssistantText } from "./assistantText";

type Props = {
  openAiKey: string;
  systemPrompt: string;
  chatLog: Message[];
  codeLog: Message[];
  koeiroParam: KoeiroParam;
  assistantMessage: string;
  koeiromapKey: string;
  googleTtsType: string;
  onChangeSystemPrompt: (systemPrompt: string) => void;
  onChangeAiKey: (key: string) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeCodeLog: (index: number, text: string) => void;
  onChangeKoeiromapParam: (param: KoeiroParam) => void;
  handleClickResetChatLog: () => void;
  handleClickResetCodeLog: () => void;
  handleClickResetSystemPrompt: () => void;
  onChangeKoeiromapKey: (key: string) => void;
  onChangeGoogleTtsType: (key: string) => void;
  webSocketMode: boolean;
  changeWebSocketMode: (show: boolean) => void;
  selectVoice: string;
  setselectVoice: (show: string) => void;
};
export const Menu = ({
  openAiKey,
  systemPrompt,
  chatLog,
  codeLog,
  koeiroParam,
  assistantMessage,
  koeiromapKey,
  googleTtsType,
  onChangeSystemPrompt,
  onChangeAiKey,
  onChangeChatLog,
  onChangeCodeLog,
  onChangeKoeiromapParam,
  handleClickResetChatLog,
  handleClickResetCodeLog,
  handleClickResetSystemPrompt,
  onChangeKoeiromapKey,
  onChangeGoogleTtsType,
  webSocketMode,
  changeWebSocketMode,
  selectVoice,
  setselectVoice,
}: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showChatLog, setShowChatLog] = useState(false);
  const { viewer } = useContext(ViewerContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeSystemPrompt = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChangeSystemPrompt(event.target.value);
    },
    [onChangeSystemPrompt]
  );

  const handleAiKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAiKey(event.target.value);
    },
    [onChangeAiKey]
  );

  const handleChangeKoeiromapKey = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeKoeiromapKey(event.target.value);
    },
    [onChangeKoeiromapKey]
  );

  const handleChangeGoogleTtsType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeGoogleTtsType(event.target.value);
    },
    [onChangeGoogleTtsType]
  );

  const handleChangeKoeiroParam = useCallback(
    (x: number, y: number) => {
      onChangeKoeiromapParam({
        speakerX: x,
        speakerY: y,
      });
    },
    [onChangeKoeiromapParam]
  );

  const handleClickOpenVrmFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleChangeVrmFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const file = files[0];
      if (!file) return;

      const file_type = file.name.split(".").pop();

      if (file_type === "vrm") {
        const blob = new Blob([file], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        viewer.loadVrm(url);
      }

      event.target.value = "";
    },
    [viewer]
  );

  return (
    <>
      <div className="absolute z-10 m-24">
        <div className="grid grid-flow-col gap-[8px]">
          <IconButton
            iconName="24/Menu"
            label="設定"
            isProcessing={false}
            onClick={() => setShowSettings(true)}
          ></IconButton>
          {showChatLog ? (
            <IconButton
              iconName="24/CommentOutline"
              label={webSocketMode ? "コードログ" : "会話ログ"}
              isProcessing={false}
              onClick={() => setShowChatLog(false)}
            />
          ) : (
            <IconButton
              iconName="24/CommentFill"
              label={webSocketMode ? "コードログ" : "会話ログ"}
              isProcessing={false}
              disabled={chatLog.length <= 0}
              onClick={() => setShowChatLog(true)}
            />
          )}
        </div>
      </div>
      {
        webSocketMode ? 
          (showChatLog && <CodeLog messages={codeLog} />) :
          (showChatLog && <ChatLog messages={chatLog} />)
      }
      {showSettings && (
        <Settings
          openAiKey={openAiKey}
          chatLog={chatLog}
          codeLog={codeLog}
          systemPrompt={systemPrompt}
          koeiroParam={koeiroParam}
          koeiromapKey={koeiromapKey}
          googleTtsType={googleTtsType}
          onClickClose={() => setShowSettings(false)}
          onChangeAiKey={handleAiKeyChange}
          onChangeSystemPrompt={handleChangeSystemPrompt}
          onChangeChatLog={onChangeChatLog}
          onChangeCodeLog={onChangeCodeLog}
          onChangeKoeiroParam={handleChangeKoeiroParam}
          onClickOpenVrmFile={handleClickOpenVrmFile}
          onClickResetChatLog={handleClickResetChatLog}
          onClickResetCodeLog={handleClickResetCodeLog}
          onClickResetSystemPrompt={handleClickResetSystemPrompt}
          onChangeKoeiromapKey={handleChangeKoeiromapKey}
          onChangeGoogleTtsType={handleChangeGoogleTtsType}
          webSocketMode={webSocketMode}
          changeWebSocketMode={changeWebSocketMode}
          selectVoice = {selectVoice}
          setselectVoice = {setselectVoice}
        />
      )}
      {!showChatLog && assistantMessage && (
        <AssistantText message={assistantMessage} />
      )}
      <input
        type="file"
        className="hidden"
        accept=".vrm"
        ref={fileInputRef}
        onChange={handleChangeVrmFile}
      />
    </>
  );
};
