import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  audio?: Buffer;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body; // JSON.parse を削除
  const message = body.message;
  const stylebertvits2ModelId = body.stylebertvits2ModelId;
  const stylebertvits2ServerUrl = body.stylebertvits2ServerUrl;
  const stylebertvits2Style = body.stylebertvits2Style;

  const queryParams = new URLSearchParams({ text: message, model_id: stylebertvits2ModelId, style: stylebertvits2Style });

  try {
    const voice = await fetch(`${stylebertvits2ServerUrl}/voice?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "audio/wav",
      },
    });

    if (!voice.ok) {
      throw new Error(`サーバーからの応答が異常です。ステータスコード: ${voice.status}`);
    }

    const arrayBuffer = await voice.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.writeHead(200, {
      'Content-Type': 'audio/wav',
      'Content-Length': buffer.length
    });
    res.end(buffer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
