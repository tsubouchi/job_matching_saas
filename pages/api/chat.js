// pages/api/chat.js
import { chatWithHistory } from '../../lib/gemini';
import { saveChatMessage, getChatHistory, createChat } from '../../lib/firebase';

// .envファイルから環境変数を読み込む
require('dotenv').config({ path: './config/.env' });

export default async function handler(req, res) {
  // POSTリクエストのみを許可
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, chatId, userId, title } = req.body;

    // 必須パラメータのチェック
    if (!message || !userId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    let currentChatId = chatId;

    // チャットIDがない場合は新しいチャットを作成
    if (!currentChatId) {
      const chatTitle = title || `Chat ${new Date().toLocaleString()}`;
      const result = await createChat(userId, chatTitle);
      currentChatId = result.key;
    }

    // ユーザーメッセージを保存
    await saveChatMessage(currentChatId, userId, message, 'user');

    // チャット履歴を取得
    const history = await getChatHistory(currentChatId);
    
    // Gemini APIの入力形式に変換
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      content: msg.message
    }));

    // Gemini APIでレスポンスを生成
    const response = await chatWithHistory(formattedHistory);

    // アシスタントの応答を保存
    await saveChatMessage(currentChatId, 'assistant', response, 'assistant');

    // レスポンスを返す
    return res.status(200).json({
      chatId: currentChatId,
      message: response
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
