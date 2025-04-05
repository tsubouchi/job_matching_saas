// lib/firebase.js
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, push, update, remove } = require('firebase/database');

// Firebase設定
// 環境変数から設定を取得
const firebaseConfig = {
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://job-matching-saas-default-rtdb.asia-southeast1.firebasedatabase.app',
  // 本番環境では他の設定も追加
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * データを保存する関数
 * @param {string} path - データベースパス
 * @param {any} data - 保存するデータ
 * @returns {Promise<void>}
 */
async function saveData(path, data) {
  try {
    await set(ref(database, path), data);
    return { success: true };
  } catch (error) {
    console.error('Firebase Save Error:', error);
    throw new Error(`Firebase Save Error: ${error.message}`);
  }
}

/**
 * データを取得する関数
 * @param {string} path - データベースパス
 * @returns {Promise<any>} 取得したデータ
 */
async function getData(path) {
  try {
    const snapshot = await get(ref(database, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Firebase Get Error:', error);
    throw new Error(`Firebase Get Error: ${error.message}`);
  }
}

/**
 * 新しいデータをリストに追加する関数
 * @param {string} path - データベースパス
 * @param {any} data - 追加するデータ
 * @returns {Promise<string>} 生成されたキー
 */
async function pushData(path, data) {
  try {
    const newRef = push(ref(database, path));
    await set(newRef, data);
    return { success: true, key: newRef.key };
  } catch (error) {
    console.error('Firebase Push Error:', error);
    throw new Error(`Firebase Push Error: ${error.message}`);
  }
}

/**
 * データを更新する関数
 * @param {string} path - データベースパス
 * @param {any} data - 更新するデータ
 * @returns {Promise<void>}
 */
async function updateData(path, data) {
  try {
    await update(ref(database, path), data);
    return { success: true };
  } catch (error) {
    console.error('Firebase Update Error:', error);
    throw new Error(`Firebase Update Error: ${error.message}`);
  }
}

/**
 * データを削除する関数
 * @param {string} path - データベースパス
 * @returns {Promise<void>}
 */
async function removeData(path) {
  try {
    await remove(ref(database, path));
    return { success: true };
  } catch (error) {
    console.error('Firebase Remove Error:', error);
    throw new Error(`Firebase Remove Error: ${error.message}`);
  }
}

/**
 * チャットメッセージを保存する関数
 * @param {string} chatId - チャットID
 * @param {string} userId - ユーザーID
 * @param {string} message - メッセージ内容
 * @param {string} role - メッセージの役割（'user'または'assistant'）
 * @returns {Promise<string>} 生成されたメッセージID
 */
async function saveChatMessage(chatId, userId, message, role) {
  try {
    const timestamp = Date.now();
    const messageData = {
      userId,
      message,
      role,
      timestamp,
    };
    
    const result = await pushData(`chats/${chatId}/messages`, messageData);
    
    // 最終メッセージ情報を更新
    await updateData(`chats/${chatId}`, {
      lastMessage: message,
      lastMessageTimestamp: timestamp,
      lastMessageRole: role
    });
    
    return result;
  } catch (error) {
    console.error('Save Chat Message Error:', error);
    throw new Error(`Save Chat Message Error: ${error.message}`);
  }
}

/**
 * チャット履歴を取得する関数
 * @param {string} chatId - チャットID
 * @returns {Promise<Array>} チャットメッセージの配列
 */
async function getChatHistory(chatId) {
  try {
    const messages = await getData(`chats/${chatId}/messages`);
    if (!messages) return [];
    
    // オブジェクトを配列に変換して時系列順にソート
    return Object.entries(messages)
      .map(([id, data]) => ({
        id,
        ...data
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  } catch (error) {
    console.error('Get Chat History Error:', error);
    throw new Error(`Get Chat History Error: ${error.message}`);
  }
}

/**
 * 新しいチャットを作成する関数
 * @param {string} userId - ユーザーID
 * @param {string} title - チャットのタイトル
 * @returns {Promise<string>} 生成されたチャットID
 */
async function createChat(userId, title) {
  try {
    const timestamp = Date.now();
    const chatData = {
      title,
      createdAt: timestamp,
      updatedAt: timestamp,
      participants: {
        [userId]: true
      }
    };
    
    return await pushData('chats', chatData);
  } catch (error) {
    console.error('Create Chat Error:', error);
    throw new Error(`Create Chat Error: ${error.message}`);
  }
}

/**
 * ユーザーのチャット一覧を取得する関数
 * @param {string} userId - ユーザーID
 * @returns {Promise<Array>} チャット情報の配列
 */
async function getUserChats(userId) {
  try {
    const chats = await getData('chats');
    if (!chats) return [];
    
    // ユーザーが参加しているチャットのみをフィルタリング
    return Object.entries(chats)
      .filter(([_, data]) => data.participants && data.participants[userId])
      .map(([id, data]) => ({
        id,
        ...data
      }))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error('Get User Chats Error:', error);
    throw new Error(`Get User Chats Error: ${error.message}`);
  }
}

module.exports = {
  saveData,
  getData,
  pushData,
  updateData,
  removeData,
  saveChatMessage,
  getChatHistory,
  createChat,
  getUserChats
};
