// pages/api/check-env.js
// .envファイルから環境変数を読み込む
require('dotenv').config({ path: './config/.env' });

export default async function handler(req, res) {
  // GETリクエストのみを許可
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 環境変数の状態を確認
    const geminiApiKey = process.env.GEMINI_API_KEY ? true : false;
    const firebaseUrl = process.env.FIREBASE_DATABASE_URL ? true : false;

    // レスポンスを返す（実際のキー値は返さない）
    return res.status(200).json({
      geminiApiKey,
      firebaseUrl
    });
  } catch (error) {
    console.error('Check Environment Variables Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
