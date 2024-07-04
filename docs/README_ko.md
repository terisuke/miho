<h1 align="center">AITuber 키트</h1>

<p align="center">
  <img style="max-width: 100%;" src="https://github.com/tegnike/aituber-kit/assets/35606144/04e073de-ef99-4585-8bfa-aaf936409e79">
</p>

<p align="center">
   <a href="https://github.com/tegnike/aituber-kit"><img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/tegnike/aituber-kit"></a>
   <a href="https://github.com/tegnike/aituber-kit"><img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/tegnike/aituber-kit"></a>
   <img alt="GitHub Tag" src="https://img.shields.io/github/v/tag/tegnike/aituber-kit?sort=semver&color=orange">
   <a href="https://discord.gg/T96PTvrs"><img alt="Discord" src="https://img.shields.io/badge/Discord-AITuberKit-7289DA?logo=discord&style=flat&logoColor=white"/></a>
   <a href="https://github.com/sponsors/tegnike"><img alt="GitHub Sponsor" src="https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=flat&logo=github"/></a>
</p>

<h3 align="center">
   <a href="../README.md">【일본어】</a>｜
   <a href="./README_en.md">【영어】</a>｜
   <a href="./README_zh.md">【중국어】</a>
</h3>

## 개요

이 저장소에는 다음과 같은 3가지 기능이 있습니다.

1. AI 캐릭터와 대화
2. AITuber 스트리밍
3. 외부 통합 모드

아래 기사에 자세한 사용 방법을 작성했습니다.

[![오늘부터 당신도 AITuber 개발자｜니케짱](https://github.com/tegnike/aituber-kit/assets/35606144/a958f505-72f9-4665-ab6c-b57b692bb166)](https://note.com/nike_cha_n/n/ne98acb25e00f)

## 공통 사전 준비

1. 패키지를 설치합니다.
```bash
npm install
```

2. 개발 모드에서 애플리케이션을 시작합니다.

```bash
npm run dev
```

3. URL을 엽니다. [http://localhost:3000](http://localhost:3000)

## AI 캐릭터와 대화

- AI 캐릭터와 대화할 수 있는 기능입니다.
- 이 저장소의 기반이 되는 [pixiv/ChatVRM](https://github.com/pixiv/ChatVRM)의 기능입니다.
- 다양한 LLM의 API 키만 있으면 비교적 쉽게 시도해볼 수 있습니다.
- 최근 10개의 대화 문장이 기억으로 보존됩니다. (숫자는 향후 업데이트에서 지정할 수 있습니다)

### 사용 방법

1. 설정 화면에서 다양한 LLM의 API 키를 입력합니다.
   - OpenAI
   - Anthropic
   - Google Gemini
   - Groq
   - Local LLM (API 키는 필요 없지만 로컬 API 서버를 실행해야 합니다.)
   - Dify Chatbot (API 키는 필요 없지만 로컬 API 서버를 실행해야 합니다.)
2. 필요한 경우 캐릭터의 설정 프롬프트를 편집합니다.
3. 필요한 경우 VRM 파일을 로드합니다.
4. 음성 합성 엔진을 선택하고 필요한 경우 음성 설정을 구성합니다.
   - VOICEVOX의 경우 여러 옵션에서 스피커를 선택할 수 있습니다. 사전에 VOICEVOX 앱을 실행해야 합니다.
   - Koeiromap의 경우 음성을 세밀하게 조정할 수 있습니다. API 키가 필요합니다.
   - Google TTS의 경우 일본어 외의 언어도 선택할 수 있습니다. 자격 증명 정보가 필요합니다.
   - Style-Bert-VITS2의 경우 로컬 API 서버를 실행해야 합니다.
   - GSVI TTS의 경우 로컬 API 서버를 실행해야 합니다.
5. 입력 양식에서 캐릭터와 대화를 시작합니다. 마이크 입력도 가능합니다.

## AITuber 스트리밍

- YouTube 스트리밍 댓글을 가져와서 캐릭터가 말하도록 할 수 있습니다.
- YouTube API 키가 필요합니다.
- '#'로 시작하는 댓글은 읽히지 않습니다. (향후 업데이트에서 문자열을 지정할 수 있습니다)

### 사용 방법

1. 설정 화면에서 YouTube 모드를 켭니다.
2. YouTube API 키와 YouTube Live ID를 입력합니다.
3. 다른 설정은 "AI 캐릭터와 대화"와 동일한 방식으로 구성합니다.
4. YouTube에서 스트리밍을 시작하고 캐릭터가 댓글에 반응하는지 확인합니다.
5. 대화 연속 모드를 켜면 댓글이 없어도 AI가 스스로 발언할 수 있습니다.

## 외부 통합 모드

- WebSocket을 통해 서버 앱에 메시지를 보내고 응답을 받을 수 있습니다.
- 위의 두 가지와 달리 프론트엔드 앱 내에서 완료되지 않으므로 난이도가 약간 높습니다.

### 사용 방법

1. 서버 앱을 시작하고 `ws://127.0.0.1:8000/ws` 엔드포인트를 엽니다.
2. 설정 화면에서 WebSocket 모드를 켭니다.
3. 다른 설정은 "AI 캐릭터와 대화"와 동일한 방식으로 구성합니다.
4. 서버 앱에서 메시지를 기다리고 캐릭터가 반응하는지 확인합니다.

### 관련 사항

- 내가 만든 서버 앱 저장소로 시도해볼 수 있습니다. [tegnike/aituber-server](https://github.com/tegnike/aituber-server)
- 자세한 설정은 "[아름다운 소녀와 함께 개발해 보자!! 【Open Interpreter】](https://note.com/nike_cha_n/n/nabcfeb7aaf3f)"를 읽어보세요.

## 팁

### VRM 모델 및 배경 고정 방법

- `public/AvatarSample_B.vrm`에서 VRM 모델 데이터를 변경합니다. 이름은 변경하지 마십시오.
- `public/bg-c.jpg`에서 배경 이미지를 변경합니다. 이름은 변경하지 마십시오.

### 환경 변수 설정

- 일부 구성 값은 `.env` 파일 내용에서 참조할 수 있습니다.
- 설정 화면에 입력된 경우 해당 값이 우선적으로 적용됩니다.

### 기타

- 대화 내역은 설정 화면에서 재설정할 수 있습니다.
- 다양한 설정 항목은 브라우저에 저장됩니다.
- 코드 블록으로 둘러싸인 요소는 TTS에서 읽히지 않습니다.

## 스폰서 모집

개발을 지속하기 위해 스폰서를 모집하고 있습니다.<br>
여러분의 지원은 AITuber 키트의 개발과 개선에 크게 기여합니다.

[![GitHub Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=for-the-badge&logo=github)](https://github.com/sponsors/tegnike)

### 협력자 여러분 (지원해 주신 순서)

<p>
  <a href="https://github.com/morioki3" title="morioki3">
    <img src="https://github.com/morioki3.png" width="40" height="40" alt="morioki3">
  </a>
  <a href="https://github.com/hodachi-axcxept" title="hodachi-axcxept">
    <img src="https://github.com/hodachi-axcxept.png" width="40" height="40" alt="hodachi-axcxept">
  </a>
  <a href="https://github.com/coderabbitai" title="coderabbitai">
    <img src="https://github.com/coderabbitai.png" width="40" height="40" alt="coderabbitai">
  </a>
  <a href="https://github.com/ai-bootcamp-tokyo" title="ai-bootcamp-tokyo">
    <img src="https://github.com/ai-bootcamp-tokyo.png" width="40" height="40" alt="ai-bootcamp-tokyo">
  </a>
  <a href="https://github.com/wmoto-ai" title="wmoto-ai">
    <img src="https://github.com/wmoto-ai.png" width="40" height="40" alt="wmoto-ai">
  </a>
  <a href="https://github.com/JunzoKamahara" title="JunzoKamahara">
    <img src="https://github.com/JunzoKamahara.png" width="40" height="40" alt="JunzoKamahara">
  </a>
  <a href="https://github.com/darkgaldragon" title="darkgaldragon">
    <img src="https://github.com/darkgaldragon.png" width="40" height="40" alt="darkgaldragon">
  </a>
  <a href="https://github.com/usagi917" title="usagi917">
    <img src="https://github.com/usagi917.png" width="40" height="40" alt="usagi917">
  </a>
  <a href="https://github.com/ochisamu" title="ochisamu">
    <img src="https://github.com/ochisamu.png" width="40" height="40" alt="ochisamu">
  </a>
  <a href="https://github.com/mo0013" title="mo0013">
    <img src="https://github.com/mo0013.png" width="40" height="40" alt="mo0013">
  </a>
</p>

그 외, 비공개 스폰서 1명

## 이용 약관

- 라이선스는 [pixiv/ChatVRM](https://github.com/pixiv/ChatVRM)을 준수하며 MIT 라이선스를 사용합니다.
- [로고 이용 약관](./logo_licence_ko.md)
- [VRM 모델 이용 약관](./vrm_licence_ko.md)
