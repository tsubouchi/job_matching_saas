// pages/api/chat-history.js
import { getChatHistory } from '../../lib/firebase';

// .envファイルから環境変数を読み込む
require('dotenv').config({ path: './config/.env' });

export default async function handler(req, res) {
  // GETリクエストのみを許可
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { chatId } = req.query;

    // 必須パラメータのチェック
    if (!chatId) {
      return res.status(400).json({ error: 'Missing required parameter: chatId' });
    }

    // チャット履歴を取得
    const history = await getChatHistory(chatId);

    // レスポンスを返す
    return res.status(200).json(history);
  } catch (error) {
    console.error('Chat History API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
