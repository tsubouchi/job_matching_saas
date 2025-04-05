// pages/api/resume-analysis.js
import { analyzeResumeMatch } from '../../lib/gemini';

// .envファイルから環境変数を読み込む
require('dotenv').config({ path: './config/.env' });

export default async function handler(req, res) {
  // POSTリクエストのみを許可
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { resume, jobDescription } = req.body;

    // 必須パラメータのチェック
    if (!resume || !jobDescription) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // 職務経歴書と求人情報のマッチング分析を実行
    const analysisResult = await analyzeResumeMatch(resume, jobDescription);

    // レスポンスを返す
    return res.status(200).json(analysisResult);
  } catch (error) {
    console.error('Resume Analysis API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
