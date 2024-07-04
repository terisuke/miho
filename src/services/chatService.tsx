import { Message } from "@/features/messages/messages";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";

interface ChatLog {
  userId: string;
  messages: Message[];
  timestamp: number;
}

export const saveChatLog = async (userId: string, messages: Message[]) => {
  try {
    const chatLog: ChatLog = {
      userId,
      messages,
      timestamp: Date.now(),
    };

    await addDoc(collection(db, "chatLogs"), chatLog);
    console.log("チャットログが保存されました");
  } catch (error) {
    console.error("チャットログの保存に失敗しました", error);
  }
};

export const getChatLogs = async (userId: string, limitCount: number = 50): Promise<Message[]> => {
  const q = query(
    collection(db, "chatLogs"),
    orderBy("timestamp", "desc"),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  const chatLogs: Message[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as ChatLog;
    chatLogs.push(...data.messages);
  });
  
  return chatLogs.reverse();
};