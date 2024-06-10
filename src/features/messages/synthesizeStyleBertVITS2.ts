export async function synthesizeStyleBertVITS2Api(
  message: string,
  stylebertvits2ServerUrl: string,
  stylebertvits2ModelId: string,
  stylebertvits2Style: string,
  selectLanguage: string
) {
  const body = {
    message: message,
    stylebertvits2ServerUrl: stylebertvits2ServerUrl,
    stylebertvits2ModelId: stylebertvits2ModelId,
    stylebertvits2Style: stylebertvits2Style,
    selectLanguage: selectLanguage,
    type: "stylebertvits2",
  };

  try {
    const res = await fetch("/api/stylebertvits2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`APIからの応答が異常です。ステータスコード: ${res.status}`);
    }

    const buffer = await res.arrayBuffer();
    return buffer;
  } catch (error: any) {
    throw new Error(`APIリクエスト中にエラーが発生しました: ${error.message}`);
  }
}
