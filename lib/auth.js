// lib/auth.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  signOut, 
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';

// Firebase設定
// 環境変数から設定を取得
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://job-matching-saas-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'job-matching-saas',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Firebaseの初期化（クライアントサイドのみ）
let app;
let auth;
let googleProvider;

if (typeof window !== 'undefined') {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

/**
 * Googleアカウントでログインする関数
 * @returns {Promise<Object>} ログイン結果
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      success: true,
      user: result.user
    };
  } catch (error) {
    console.error('Google Sign In Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * ログアウトする関数
 * @returns {Promise<Object>} ログアウト結果
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign Out Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * 現在のユーザー情報を取得する関数
 * @returns {Object|null} ユーザー情報またはnull
 */
export const getCurrentUser = () => {
  return auth?.currentUser || null;
};

/**
 * 認証状態の変更を監視する関数
 * @param {Function} callback - 認証状態が変更されたときに呼び出されるコールバック関数
 * @returns {Function} 監視を解除する関数
 */
export const onAuthStateChange = (callback) => {
  if (!auth) return () => {};
  
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

/**
 * ユーザーのIDトークンを取得する関数
 * @returns {Promise<string|null>} IDトークンまたはnull
 */
export const getUserIdToken = async () => {
  const user = getCurrentUser();
  if (!user) return null;
  
  try {
    return await user.getIdToken();
  } catch (error) {
    console.error('Get ID Token Error:', error);
    return null;
  }
};
