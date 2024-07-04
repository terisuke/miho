exports.id=807,exports.ids=[807],exports.modules={8477:(e,o,t)=>{"use strict";t.a(e,async(e,n)=>{try{let c,l;t.d(o,{I:()=>c,db:()=>l});var i=t(3745),a=t(401),r=t(1492),s=e([i,a,r]);[i,a,r]=s.then?(await s)():s,n()}catch(e){n(e)}})},2640:(e,o,t)=>{"use strict";t.a(e,async(e,n)=>{try{t.d(o,{Z:()=>s});var i=t(2021),a=t(7987),r=e([i,a]);[i,a]=r.then?(await r)():r,i.default.use(a.initReactI18next).init({resources:{en:{translation:t(7551)},ja:{translation:t(2820)},zh:{translation:t(2834)}},lng:"ja",fallbackLng:"ja",interpolation:{escapeValue:!1}});let s=i.default;n()}catch(e){n(e)}})},4807:(e,o,t)=>{"use strict";t.a(e,async(e,n)=>{try{t.r(o),t.d(o,{default:()=>App});var i=t(997);t(108),t(4978);var a=t(6689),r=t(2640),s=t(1163),c=t(401),l=t(8477),I=e([r,c,l]);function App({Component:e,pageProps:o}){let t=(0,s.useRouter)();return(0,a.useEffect)(()=>{let e=(0,c.onAuthStateChanged)(l.I,e=>{e||"/login"===t.pathname||t.push("/login")});return()=>e()},[t]),(0,a.useEffect)(()=>{let e=window.localStorage.getItem("chatVRMParams");if(e){let o=JSON.parse(e);o.selectLanguage&&r.Z.changeLanguage(o.selectLanguage.toLowerCase())}else{let e=navigator.language,o=e.match(/^zh/i)?"zh":e.split("-")[0].toLowerCase();r.Z.changeLanguage(o)}},[]),(0,i.jsx)(e,{...o})}[r,c,l]=I.then?(await I)():I,n()}catch(e){n(e)}})},108:()=>{},7551:e=>{"use strict";e.exports=JSON.parse('{"Settings":"Settings","ExternalConnectionMode":"External Connection Mode (WebSocket)","YoutubeMode":"YouTube Mode","YoutubeInfo":"The first character of the comment is \'#\', it is ignored.","YoutubeAPIKey":"YouTube API Key","YoutubeLiveID":"YouTube Live ID","ConversationContinuityMode":"Conversation Continuity Mode (Beta)","ConversationContinuityModeInfo":"When there is no comment, AI tries to continue the conversation. Currently only OpenAI is supported.","ConversationContinuityModeInfo2":"One answer calls multiple times LLM, so API usage may be increased.","ConversationContinuityModeInfo3":"gpt-4o or gpt-4-turbo works well.","StatusOn":"Status: ON","StatusOff":"Status: OFF","SelectAIService":"Select AI Service","LocalLLM":"Local LLM","SelectModel":"Select Model","OpenAIAPIKeyLabel":"OpenAI API Key","AnthropicAPIKeyLabel":"Anthropic API Key","GoogleAPIKeyLabel":"Google Gemini API Key","GroqAPIKeyLabel":"Groq API Key","DifyAPIKeyLabel":"Dify API Key","APIKeyInstruction":"You can obtain the API key below. Enter the obtained API key into the form.","ChatGPTInfo":"ChatGPT API is accessed directly from the browser.","LocalLLMInfo":"Local LLM server must be running. Setup is as follows.","LocalLLMInfo2":"Please enter the URL of the local LLM server (including port number) and the model name.","GroqInfo":"Groq API is accessed directly from the browser.","DifyInfo":"Dify only supports chatbot type.","DifyInfo2":"However, due to the specifications of Dify, the conversation history is not saved, so please be careful.","DifyInfo3":"Example: http://localhost:81/v1/chat-messages","DifyInstruction":"If you are using Dify, the system prompt will not be used. Please set Dify chatbot.","EnterURL":"URL","CharacterModelLabel":"Character Model","OpenVRM":"Open VRM","BackgroundImage":"Background Image","ChangeBackgroundImage":"Change Background Image","CharacterSettingsPrompt":"Character Settings (System Prompt)","CharacterSettingsReset":"Reset Character Settings","SyntheticVoiceEngineChoice":"Choose Synthetic Voice Engine","VoiceAdjustment":"Voice Adjustment","VoiceEngineInstruction":"Select the synthetic voice engine you want to use.","UsingKoeiromap":"Koeiromap (Japanese Only)","UsingVoiceVox":"VOICEVOX (Japanese Only)","UsingGoogleTTS":"Google TTS","UsingStyleBertVITS2":"Style-Bert-VITS2","UserName":"User Name","StyleBertVITS2Info":"Using Style-Bert-VITS2. It uses a local API, you need to download and launch the app that suits your environment from the site below.","SpeakerSelection":"Speaker Selection","GoogleTTSInfo":"Using Google Cloud Text-to-Speech. It supports multiple languages.","AuthFileInstruction":"Obtain the authentication JSON file below and place it in the root folder of the repository as \'credentials.json\'.","LanguageModelURL":"Select the language model from the URL below.","LanguageChoice":"Language Choice","StyleBeatVITS2LocalServerURL":"Style-Bert-VITS2 Local Server URL","StyleBeatVITS2ModelID":"Style-Bert-VITS2 Model ID","StyleBeatVITS2Style":"Style-Bert-VITS2 Style","ConversationHistory":"Conversation History","ConversationHistoryInfo":"The latest 10 conversation texts are stored as memories.","ConversationHistoryReset":"Reset Conversation History","NotConnectedToExternalAssistant":"Not connected to an external assistant.","APIKeyNotEntered":"API key is not entered.","CodeLog":"Code Log","ChatLog":"Conversation Log","EnterYourQuestion":"Enter your question here","AboutThisApplication":"About This Application","AboutThisApplicationDescription":"Enjoy conversations with a 3D character right in your web browser, using microphone or text input and voice synthesis. You can also change the character (VRM), adjust its personality, and modify its voice.<br />Settings can be changed from the menu button in the top left.","TechnologyIntroduction":"Technology Introduction","TechnologyIntroductionDescription1":"This app was created by modifying pixiv\'s <b>ChatVRM</b>. The original source code can be found","TechnologyIntroductionLink1":"here","TechnologyIntroductionDescription2":".","TechnologyIntroductionDescription3":"For displaying and manipulating 3D models,","TechnologyIntroductionDescription4":"is used. For generating conversation text, various LLMs such as","TechnologyIntroductionDescription5":"are used. For speech synthesis, various TTS engines like","TechnologyIntroductionDescription6":"are utilized. For more details, please check out this","TechnologyIntroductionLink2":"explanatory article","TechnologyIntroductionDescription7":".","SourceCodeDescription1":"The source code for this app is publicly available on GitHub. Feel free to modify and adapt it as you like.","RepositoryURL":"Repository URL:","DontShowIntroductionNextTime":"Do not show this dialog next time","Close":"CLOSE","Language":"Language","UsingGSVITTS":"GSVI TTS","GSVITTSInfo":"GSVI TTS Settings","GSVITTSServerUrl":"GSVI TTS Endpoint API","GSVITTSModelID":"GSVI TTS Model ID","GSVITTSBatchSize":"GSVI TTS Batch Size (1 ~ 100 The larger the value, the faster the inference speed, but it might exhaust memory if too large.)","GSVITTSSpeechRate":"Speech Rate (0.5 ~ 2.0 The bigger the value, the faster it is.)","Login":"Login","Email":"Email","Password":"Password","Login with Google":"Login with Google","Don\'t have an account?":"Don\'t have an account?","Sign Up":"Sign Up","Already have an account?":"Already have an account?"}')},2820:e=>{"use strict";e.exports=JSON.parse('{"Settings":"設定","ExternalConnectionMode":"外部連携モード（WebSocket）","YoutubeMode":"YouTubeモード","YoutubeInfo":"先頭が「#」のコメントは無視されます。","YoutubeAPIKey":"YouTube API キー","YoutubeLiveID":"YouTube Live ID","ConversationContinuityMode":"会話継続モード（ベータ版）","ConversationContinuityModeInfo":"コメントが無いときにAIが自ら会話を継続しようとするモードです。現在OpenAIのみ対応しています。","ConversationContinuityModeInfo2":"一度の回答で複数回LLMを呼び出すため、API利用料が増える可能性があります。ご注意ください。","ConversationContinuityModeInfo3":"gpt-4o または gpt-4-turbo で比較的安定動作します。","StatusOn":"状態：ON","StatusOff":"状態：OFF","SelectAIService":"AIサービスを選択","LocalLLM":"ローカルLLM","SelectModel":"モデルを選択","OpenAIAPIKeyLabel":"OpenAI API キー","AnthropicAPIKeyLabel":"Anthropic API キー","GoogleAPIKeyLabel":"Google Gemini API キー","GroqAPIKeyLabel":"Groq API キー","DifyAPIKeyLabel":"Dify API キー","APIKeyInstruction":"APIキーは下記のリンクから取得できます。取得したAPIキーをフォームに入力してください。","ChatGPTInfo":"ChatGPT APIはブラウザから直接アクセスしています。","LocalLLMInfo":"ローカルLLM サーバーを起動している必要があります。","LocalLLMInfo2":"ローカルLLMのURL（ポート番号込み）とモデル名を入力してください。","GroqInfo":"Groq APIはブラウザから直接アクセスしています。","DifyInfo":"Difyでは、チャットボットタイプのみ対応しています。","DifyInfo2":"なお、Difyの仕様の都合上、会話履歴は保持されないのでその点に注意してください。","DifyInfo3":"例：http://localhost:81/v1/chat-messages","DifyInstruction":"Difyを使用している場合、このシステムプロンプトは使用されません。Difyチャットボットに設定してください。","EnterURL":"URLを入力","CharacterModelLabel":"キャラクターモデル","OpenVRM":"VRMを開く","BackgroundImage":"背景画像","ChangeBackgroundImage":"背景画像を変える","CharacterSettingsPrompt":"キャラクター設定（システムプロンプト）","CharacterSettingsReset":"キャラクター設定リセット","SyntheticVoiceEngineChoice":"合成音声エンジンの選択","VoiceAdjustment":"声の調整","VoiceEngineInstruction":"使用する合成音声エンジンを選択してください。","UsingKoeiromap":"Koeiromapを使用する（Japanese Only）","UsingVoiceVox":"VOICEVOXを使用する（Japanese Only）","UsingGoogleTTS":"Google TTSを使用する","UsingStyleBertVITS2":"Style-Bert-VITS2を使用する","UserName":"ユーザー名","StyleBertVITS2Info":"Style-Bert-VITS2を使用しています。ローカルAPIを使用するので下記のサイトから環境にあったアプリをダウンロードし、起動しておく必要があります。","SpeakerSelection":"ボイスタイプ選択","GoogleTTSInfo":"Google Cloud Text-to-Speechを使用しています。多言語に対応可能です。","AuthFileInstruction":"認証用のJSONファイルを下記から取得し、リポジトリのルートフォルダに credentials.json という名称で配置してください。","LanguageModelURL":"言語モデルは下記のURLから選択してください。","LanguageChoice":"言語選択","StyleBeatVITS2LocalServerURL":"Style-Bert-VITS2 ローカルサーバーURL","StyleBeatVITS2ModelID":"Style-Bert-VITS2 モデルID","StyleBeatVITS2Style":"Style-Bert-VITS2 スタイル","ConversationHistory":"会話履歴","ConversationHistoryInfo":"直近の10会話文が記憶として保持されます。","ConversationHistoryReset":"会話履歴リセット","NotConnectedToExternalAssistant":"外部アシスタントと接続されていません。","APIKeyNotEntered":"APIキーが入力されていません。","CodeLog":"コードログ","ChatLog":"会話ログ","EnterYourQuestion":"聞きたいことをいれてね","AboutThisApplication":"このアプリケーションについて","AboutThisApplicationDescription":"Webブラウザだけで3Dキャラクターとの会話を、マイクやテキスト入力、音声合成を用いて楽しめます。キャラクター（VRM）の変更や性格設定、音声調整もできます。<br />設定は左上のメニューボタンから変更できます。","TechnologyIntroduction":"技術紹介","TechnologyIntroductionDescription1":"このアプリはpixiv社の<b>ChatVRM</b>を改造して作成されています。元のソースコードは","TechnologyIntroductionLink1":"こちら","TechnologyIntroductionDescription2":"をご覧ください。","TechnologyIntroductionDescription3":"3Dモデルの表示や操作には","TechnologyIntroductionDescription4":"、 会話文生成には","TechnologyIntroductionDescription5":"などの各種LLM、 音声合成には","TechnologyIntroductionDescription6":"などの各種TTSを使用しています。 詳細はこちらの","TechnologyIntroductionLink2":"解説記事","TechnologyIntroductionDescription7":"をご覧ください。","SourceCodeDescription1":"このアプリのソースコードはGitHubで公開しています。自由に変更や改変可能です。","RepositoryURL":"リポジトリURL:","DontShowIntroductionNextTime":"次回からこのダイアログを表示しない","Close":"閉じる","Language":"言語設定","UsingGSVITTS":"GSVI TTSを使用する","GSVITTSInfo":"GSVI TTS設定","GSVITTSServerUrl":"GSVI TTSサーバーのURL","GSVITTSModelID":"GSVI TTS モデルID","GSVITTSBatchSize":"GSVI TTS バッチサイズ (1 ~ 100 数値が大きいほど推論速度は速くなりますが、大きすぎるとメモリを使い果たす可能性があります)","GSVITTSSpeechRate":"話速 (0.5 ~ 2.0 数値が大きいほど速い)","Email":"メールアドレス","Password":"パスワード","Login with Google":"Googleでログイン","Don\'t have an account?":"アカウントをお持ちでないですか？","Sign Up":"サインアップ","Already have an account?":"アカウントをお持ちですか？"}')},2834:e=>{"use strict";e.exports=JSON.parse('{"Settings":"設定","ExternalConnectionMode":"外部連線模式 (WebSocket)","YoutubeMode":"YouTube 模式","YoutubeInfo":"YouTube 直播 ID 是直播 ID 而不是頻道 ID","YoutubeAPIKey":"YouTube API 金鑰","YoutubeLiveID":"YouTube 直播 ID","ConversationContinuityMode":"會話持續模式（測試版）","ConversationContinuityModeInfo":"這是一個在沒有評論時，AI會自行嘗試繼續會話的模式。目前僅支援 OpenAI。","ConversationContinuityModeInfo2":"由於一次回答可能多次調用 LLM，因此 API 使用費用可能會增加，請注意。","ConversationContinuityModeInfo3":"在 gpt-4o 或 gpt-4-turbo 上能夠比較穩定地運行。","StatusOn":"狀態：開","StatusOff":"狀態：關","SelectAIService":"選擇 AI 服務","LocalLLM":"本地 LLM","SelectModel":"選擇模型","OpenAIAPIKeyLabel":"OpenAI API 金鑰","AnthropicAPIKeyLabel":"Anthropic API 金鑰","GoogleAPIKeyLabel":"Google Gemini API 金鑰","GroqAPIKeyLabel":"Groq API 金鑰","DifyAPIKeyLabel":"Dify API 金鑰","APIKeyInstruction":"您可以在下方獲取 API 金鑰。請將獲得的 API 金鑰輸入到表單中。","ChatGPTInfo":"ChatGPT API 直接從瀏覽器存取。","LocalLLMInfo":"Local LLM 伺服器必須正在運行。","LocalLLMInfo2":"Local LLM 伺服器URL 和 模型名 必須正確填寫。","GroqInfo":"Groq API 直接從瀏覽器存取。","DifyInfo":"Dify 只支援聊天機器人型態。","DifyInfo2":"此外，Dify 的規格限制下，對話歷史不會被保存，因此請注意。","DifyInfo3":"例：http://localhost:81/v1/chat-messages","DifyInstruction":"如果您正在使用 Dify，則此系統提示將不會被使用。請將 Dify 聊天機器人設定為系統提示。","EnterURL":"輸入 URL","CharacterModelLabel":"角色模型","OpenVRM":"開啟 VRM","BackgroundImage":"背景圖片","ChangeBackgroundImage":"更改背景圖片","CharacterSettingsPrompt":"角色設定 (系統提示)","CharacterSettingsReset":"重設角色設定","SyntheticVoiceEngineChoice":"選擇合成語音引擎","VoiceAdjustment":"語音調整","VoiceEngineInstruction":"選擇您要使用的合成音聲引擎。","UsingKoeiromap":"使用 Koeiromap（僅限日文）","UsingVoiceVox":"使用 VOICEVOX（僅限日文）","UsingGoogleTTS":"使用 Google TTS","UsingStyleBertVITS2":"使用 Style-Bert-VITS2","UserName":"使用者名稱","StyleBertVITS2Info":"使用 Style-Bert-VITS2。它使用本機 API，您需要從以下網站下載並啟動適合您環境的應用程式","SpeakerSelection":"選擇語音角色","GoogleTTSInfo":"使用 Google Cloud 文字轉語音。支援多種語言。","AuthFileInstruction":"在下方獲取認證 JSON 檔案，並將其放置於儲存庫的根目錄下，命名為 \'credentials.json\'。","LanguageModelURL":"從下方 URL 選擇語言模型。","LanguageChoice":"語言選擇","StyleBeatVITS2LocalServerURL":"Style-Bert-VITS2 本地伺服器URL","StyleBeatVITS2ModelID":"Style-Bert-VITS2 模型ID","StyleBeatVITS2Style":"Style-Bert-VITS2 風格","ConversationHistory":"聊天記錄","ConversationHistoryInfo":"最新的 10 個對話內容會被儲存為記憶。","ConversationHistoryReset":"重設聊天記錄","NotConnectedToExternalAssistant":"未連接外部助理。","APIKeyNotEntered":"尚未輸入 API 金鑰。","CodeLog":"程式碼日誌","ChatLog":"聊天記錄","EnterYourQuestion":"在此輸入您的問題","AboutThisApplication":"關於這個應用程式","AboutThisApplicationDescription":"只需使用網頁瀏覽器，即可通過麥克風或文字輸入、語音合成與 3D 角色對話。你可以更換角色（VRM）、設定性格和調整語音。<br />設定可以從左上角的選單按鈕進行更改。","TechnologyIntroduction":"技術介紹","TechnologyIntroductionDescription1":"這個應用程式是基於 pixiv 公司的 <b>ChatVRM</b> 改造而成。原始程式碼請參考","TechnologyIntroductionLink1":"這裡","TechnologyIntroductionDescription2":"。","TechnologyIntroductionDescription3":"3D 模型的顯示與操作使用","TechnologyIntroductionDescription4":"，對話生成使用了","TechnologyIntroductionDescription5":"等各種 LLM，語音合成使用了","TechnologyIntroductionDescription6":"等各種 TTS。詳細內容請參閱此","TechnologyIntroductionLink2":"解說文章","TechnologyIntroductionDescription7":"。","SourceCodeDescription1":"這個應用程式的源代碼在 GitHub 上公開，歡迎自由修改和改進。","RepositoryURL":"儲存庫 URL：","DontShowIntroductionNextTime":"下次不再顯示此對話框","Close":"關閉","Language":"語言設定","UsingGSVITTS":"使用 GSVI TTS","GSVITTSInfo":"GSVI TTS 設定","GSVITTSServerUrl":"語音推理端點URL","GSVITTSModelID":"GSVI TTS 模型ID","GSVITTSBatchSize":"GSVI TTS 批次大小 (1 ~ 100 數值越大推理速度越快，太大可能會用完記憶體)","GSVITTSSpeechRate":"語速 (0.5 ~ 2.0 數字越大越快)","Email":"電子郵件","Password":"密碼","Login with Google":"使用 Google 登入","Don\'t have an account?":"還沒有帳號？","Sign Up":"註冊","Already have an account?":"已經有帳號？"}')}};