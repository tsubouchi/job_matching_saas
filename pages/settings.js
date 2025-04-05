import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Save, X, Shield, Bell, Moon, Sun, Globe, Database, Key, HelpCircle } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Settings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  
  const [generalSettings, setGeneralSettings] = useState({
    language: 'ja',
    theme: 'light',
    notificationsEnabled: true,
    emailNotifications: true,
    autoLogout: 30,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk-*****************************',
    webhookUrl: '',
    maxRequests: 100,
  });

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleApiChange = (e) => {
    const { name, value } = e.target;
    setApiSettings({
      ...apiSettings,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここで設定を保存（APIに送信など）
    console.log('Settings saved:', {
      general: generalSettings,
      security: securitySettings,
      api: apiSettings,
    });
    
    // 保存成功メッセージを表示
    alert('設定が保存されました');
  };

  const handleCancel = () => {
    router.push('/');
  };

  const regenerateApiKey = () => {
    // 実際のアプリではAPIキーを再生成する処理
    setApiSettings({
      ...apiSettings,
      apiKey: 'sk-' + Math.random().toString(36).substring(2, 15),
    });
  };

  return (
    <div className="page-container">
      <Head>
        <title>設定 | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - 設定" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* サイドバー */}
      <Sidebar />

      {/* メインコンテンツ */}
      <div className="main-content">
        {/* ヘッダー */}
        <Header />

        {/* メインコンテンツエリア */}
        <main className="content-area">
          <div className="content-container">
            <div className="flex justify-between items-center mb-6">
              <h1>設定</h1>
              <div className="flex space-x-2">
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md flex items-center hover:bg-gray-600 transition-colors"
                >
                  <X className="h-5 w-5 mr-2" />
                  キャンセル
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-5 w-5 mr-2" />
                  保存
                </button>
              </div>
            </div>

            {/* 設定タブ */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'general'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Globe className="h-5 w-5 inline-block mr-2" />
                    一般設定
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'security'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Shield className="h-5 w-5 inline-block mr-2" />
                    セキュリティ
                  </button>
                  <button
                    onClick={() => setActiveTab('api')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'api'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Database className="h-5 w-5 inline-block mr-2" />
                    API設定
                  </button>
                  <button
                    onClick={() => setActiveTab('help')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'help'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <HelpCircle className="h-5 w-5 inline-block mr-2" />
                    ヘルプ
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* 一般設定 */}
                {activeTab === 'general' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">一般設定</h2>
                    <div className="space-y-6">
                      {/* 言語設定 */}
                      <div className="form-group">
                        <label htmlFor="language" className="form-label">言語</label>
                        <select
                          id="language"
                          name="language"
                          value={generalSettings.language}
                          onChange={handleGeneralChange}
                          className="form-select"
                        >
                          <option value="ja">日本語</option>
                          <option value="en">English</option>
                          <option value="zh">中文</option>
                          <option value="ko">한국어</option>
                        </select>
                      </div>

                      {/* テーマ設定 */}
                      <div className="form-group">
                        <label className="form-label">テーマ</label>
                        <div className="mt-2 flex space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="light"
                              checked={generalSettings.theme === 'light'}
                              onChange={handleGeneralChange}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <Sun className="h-5 w-5 ml-2 mr-1 text-gray-600" />
                            <span className="ml-2 text-gray-700">ライト</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="dark"
                              checked={generalSettings.theme === 'dark'}
                              onChange={handleGeneralChange}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <Moon className="h-5 w-5 ml-2 mr-1 text-gray-600" />
                            <span className="ml-2 text-gray-700">ダーク</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="system"
                              checked={generalSettings.theme === 'system'}
                              onChange={handleGeneralChange}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-gray-700">システム設定に合わせる</span>
                          </label>
                        </div>
                      </div>

                      {/* 通知設定 */}
                      <div className="form-group">
                        <label className="form-label">通知設定</label>
                        <div className="mt-2 space-y-2">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              name="notificationsEnabled"
                              checked={generalSettings.notificationsEnabled}
                              onChange={handleGeneralChange}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-gray-700">アプリ内通知を有効にする</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              name="emailNotifications"
                              checked={generalSettings.emailNotifications}
                              onChange={handleGeneralChange}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-gray-700">メール通知を有効にする</span>
                          </label>
                        </div>
                      </div>

                      {/* 自動ログアウト */}
                      <div className="form-group">
                        <label htmlFor="autoLogout" className="form-label">自動ログアウト時間（分）</label>
                        <select
                          id="autoLogout"
                          name="autoLogout"
                          value={generalSettings.autoLogout}
                          onChange={handleGeneralChange}
                          className="form-select"
                        >
                          <option value="15">15分</option>
                          <option value="30">30分</option>
                          <option value="60">1時間</option>
                          <option value="120">2時間</option>
                          <option value="0">無効</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* セキュリティ設定 */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">セキュリティ設定</h2>
                    <div className="space-y-6">
                      {/* 二要素認証 */}
                      <div className="form-group">
                        <div className="flex justify-between items-center">
                          <label htmlFor="twoFactorAuth" className="form-label">二要素認証</label>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                              type="checkbox"
                              name="twoFactorAuth"
                              id="twoFactorAuth"
                              checked={securitySettings.twoFactorAuth}
                              onChange={handleSecurityChange}
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                              htmlFor="twoFactorAuth"
                              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                                securitySettings.twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            ></label>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          ログイン時に追加の認証コードを要求します
                        </p>
                      </div>

                      {/* セッションタイムアウト */}
                      <div className="form-group">
                        <label htmlFor="sessionTimeout" className="form-label">セッションタイムアウト（分）</label>
                        <select
                          id="sessionTimeout"
                          name="sessionTimeout"
                          value={securitySettings.sessionTimeout}
                          onChange={handleSecurityChange}
                          className="form-select"
                        >
                          <option value="15">15分</option>
                          <option value="30">30分</option>
                          <option value="60">1時間</option>
                          <option value="120">2時間</option>
                        </select>
                      </div>

                      {/* パスワード有効期限 */}
                      <div className="form-group">
                        <label htmlFor="passwordExpiry" className="form-label">パスワード有効期限（日）</label>
                        <select
                          id="passwordExpiry"
                          name="passwordExpiry"
                          value={securitySettings.passwordExpiry}
                          onChange={handleSecurityChange}
                          className="form-select"
                        >
                          <option value="30">30日</option>
                          <option value="60">60日</option>
                          <option value="90">90日</option>
                          <option value="180">180日</option>
                          <option value="0">無期限</option>
                        </select>
                      </div>

                      {/* パスワード変更ボタン */}
                      <div className="form-group">
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                          onClick={() => router.push('/change-password')}
                        >
                          <Key className="h-5 w-5 mr-2" />
                          パスワードを変更
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* API設定 */}
                {activeTab === 'api' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">API設定</h2>
                    <div className="space-y-6">
                      {/* APIキー */}
                      <div className="form-group">
                        <label htmlFor="apiKey" className="form-label">APIキー</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="apiKey"
                            id="apiKey"
                            value={apiSettings.apiKey}
                            readOnly
                            className="form-input flex-1"
                          />
                          <button
                            type="button"
                            onClick={regenerateApiKey}
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            再生成
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          このキーは外部アプリケーションからのAPIアクセスに使用されます
                        </p>
                      </div>

                      {/* Webhook URL */}
                      <div className="form-group">
                        <label htmlFor="webhookUrl" className="form-label">Webhook URL</label>
                        <input
                          type="url"
                          name="webhookUrl"
                          id="webhookUrl"
                          value={apiSettings.webhookUrl}
                          onChange={handleApiChange}
                          placeholder="https://example.com/webhook"
                          className="form-input"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          イベント発生時に通知を受け取るURLを指定します
                        </p>
                      </div>

                      {/* API制限 */}
                      <div className="form-group">
                        <label htmlFor="maxRequests" className="form-label">1日あたりの最大リクエスト数</label>
                        <input
                          type="number"
                          name="maxRequests"
                          id="maxRequests"
                          value={apiSettings.maxRequests}
                          onChange={handleApiChange}
                          min="1"
                          max="1000"
                          className="form-input"
                        />
                      </div>

                      {/* APIドキュメントへのリンク */}
                      <div className="form-group">
                        <a
                          href="/api-docs"
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <Database className="h-5 w-5 mr-2" />
                          APIドキュメントを表示
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* ヘルプ */}
                {activeTab === 'help' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">ヘルプとサポート</h2>
                    <div className="space-y-6">
                      {/* よくある質問 */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-md font-medium text-gray-900 mb-2">よくある質問</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>
                            <a href="#" className="text-blue-600 hover:text-blue-800">
                              JobMatchの使い方について
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-blue-600 hover:text-blue-800">
                              マッチングアルゴリズムの仕組み
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-blue-600 hover:text-blue-800">
                              データのインポート/エクスポート方法
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-blue-600 hover:text-blue-800">
                              アカウント設定の変更方法
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* サポート情報 */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-md font-medium text-gray-900 mb-2">サポート</h3>
                        <p className="text-sm text-gray-700 mb-2">
                          技術的な問題やご質問がある場合は、以下の方法でサポートチームにお問い合わせください。
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center">
                            <span className="font-medium mr-2">メール:</span>
                            <a href="mailto:support@jobmatch.example.com" className="text-blue-600 hover:text-blue-800">
                              support@jobmatch.example.com
                            </a>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium mr-2">電話:</span>
                            <a href="tel:+81-3-1234-5678" className="text-blue-600 hover:text-blue-800">
                              03-1234-5678
                            </a>
                            <span className="text-gray-500 ml-2">(平日 9:00-18:00)</span>
                          </li>
                        </ul>
                      </div>

                      {/* システム情報 */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-md font-medium text-gray-900 mb-2">システム情報</h3>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li className="flex justify-between">
                            <span>バージョン:</span>
                            <span className="font-medium">1.0.0</span>
                          </li>
                          <li className="flex justify-between">
                            <span>最終更新日:</span>
                            <span className="font-medium">2025年4月5日</span>
                          </li>
                          <li className="flex justify-between">
                            <span>データベース:</span>
                            <span className="font-medium">Firebase Realtime Database</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #10B981;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #10B981;
        }
        .toggle-checkbox {
          right: 0;
          z-index: 1;
          border-color: #D1D5DB;
          transition: all 0.3s;
        }
        .toggle-label {
          transition: all 0.3s;
        }
      `}</style>
    </div>
  );
}
