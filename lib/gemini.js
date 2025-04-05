// lib/gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 環境変数からAPIキーを取得
const apiKey = process.env.GEMINI_API_KEY || 'your-gemini-api-key-here';

// Gemini APIクライアントの初期化
const genAI = new GoogleGenerativeAI(apiKey);

// Geminiモデルの設定
const modelName = 'gemini-pro';
const model = genAI.getGenerativeModel({ model: modelName });

/**
 * Gemini APIを使用してテキスト生成を行う関数
 * @param {string} prompt - 生成のためのプロンプト
 * @param {Object} options - 生成オプション
 * @returns {Promise<string>} 生成されたテキスト
 */
async function generateText(prompt, options = {}) {
  try {
    const generationConfig = {
      temperature: options.temperature || 0.7,
      topK: options.topK || 40,
      topP: options.topP || 0.95,
      maxOutputTokens: options.maxOutputTokens || 1024,
      ...options
    };

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    });

    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Gemini API Error: ${error.message}`);
  }
}

/**
 * チャット履歴を使用してGemini APIでチャットを行う関数
 * @param {Array} history - チャット履歴の配列 [{role: 'user'|'model', content: string}]
 * @param {Object} options - 生成オプション
 * @returns {Promise<string>} 生成された応答
 */
async function chatWithHistory(history, options = {}) {
  try {
    const generationConfig = {
      temperature: options.temperature || 0.7,
      topK: options.topK || 40,
      topP: options.topP || 0.95,
      maxOutputTokens: options.maxOutputTokens || 1024,
      ...options
    };

    // チャット用のモデルを取得
    const chatModel = genAI.getGenerativeModel({ model: modelName });
    
    // チャットセッションを開始
    const chat = chatModel.startChat({
      generationConfig,
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }))
    });

    // 最後のユーザーメッセージを取得
    const lastUserMessage = history.filter(msg => msg.role === 'user').pop();
    
    if (!lastUserMessage) {
      throw new Error('User message not found in history');
    }

    // 応答を生成
    const result = await chat.sendMessage(lastUserMessage.content);
    return result.response.text();
  } catch (error) {
    console.error('Gemini Chat API Error:', error);
    throw new Error(`Gemini Chat API Error: ${error.message}`);
  }
}

/**
 * 職務経歴書を分析して求人とのマッチング度を評価する関数
 * @param {string} resume - 職務経歴書のテキスト
 * @param {string} jobDescription - 求人情報のテキスト
 * @returns {Promise<Object>} マッチング結果と分析情報
 */
async function analyzeResumeMatch(resume, jobDescription) {
  try {
    const prompt = `
あなたは求人と職務経歴書のマッチング評価を行う専門家です。
以下の職務経歴書と求人情報を分析し、マッチング度を評価してください。

【職務経歴書】
${resume}

【求人情報】
${jobDescription}

以下の形式でJSON形式で回答してください：
{
  "matchScore": 0-100の数値（マッチング度）,
  "strengths": [強みの箇条書き],
  "weaknesses": [弱みの箇条書き],
  "recommendations": [改善提案の箇条書き],
  "summary": "全体的な評価の要約"
}
`;

    const result = await generateText(prompt, { temperature: 0.2 });
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      return {
        matchScore: 0,
        strengths: [],
        weaknesses: ['応答の解析に失敗しました'],
        recommendations: ['もう一度試してください'],
        summary: '応答の解析に失敗しました',
        rawResponse: result
      };
    }
  } catch (error) {
    console.error('Resume Analysis Error:', error);
    throw new Error(`Resume Analysis Error: ${error.message}`);
  }
}

module.exports = {
  generateText,
  chatWithHistory,
  analyzeResumeMatch
};
