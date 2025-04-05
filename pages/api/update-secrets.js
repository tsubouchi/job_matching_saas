// pages/api/update-secrets.js
import { saveData } from '../../lib/firebase';

// .envファイルから環境変数を読み込む
require('dotenv').config({ path: './config/.env' });

export default async function handler(req, res) {
  // POSTリクエストのみを許可
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { geminiApiKey } = req.body;

    // 必須パラメータのチェック
    if (!geminiApiKey) {
      return res.status(400).json({ error: 'Missing required parameter: geminiApiKey' });
    }

    // Firebase Realtime Databaseの保護されたノードにAPIキーを保存
    await saveData('secrets/geminiApiKey', { 
      value: geminiApiKey,
      updatedAt: Date.now()
    });

    // 環境変数を更新（実際の環境では再起動が必要な場合があります）
    process.env.GEMINI_API_KEY = geminiApiKey;

    // レスポンスを返す
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Update Secrets API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
