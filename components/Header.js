import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bell, Settings, User, Search, Menu, X } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // 通知データ（実際のアプリではAPIから取得）
  const notifications = [
    {
      id: 1,
      type: 'match',
      title: '新しいマッチング',
      message: '山田 隆さんがフロントエンドエンジニアの求人に92%マッチしました',
      time: '10分前',
      read: false
    },
    {
      id: 2,
      type: 'interview',
      title: '面談リマインダー',
      message: '明日 14:00 から佐藤 美咲さんとの面談があります',
      time: '30分前',
      read: false
    },
    {
      id: 3,
      type: 'job',
      title: '新規求人',
      message: '新しい求人「データアナリスト」が登録されました',
      time: '2時間前',
      read: true
    },
    {
      id: 4,
      type: 'candidate',
      title: '新規候補者',
      message: '新しい候補者「伊藤 恵」が登録されました',
      time: '昨日',
      read: true
    },
    {
      id: 5,
      type: 'system',
      title: 'システム通知',
      message: 'システムメンテナンスが明日 22:00 から実施されます',
      time: '2日前',
      read: true
    }
  ];
  
  // 未読通知の数を計算
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // 通知をクリックしたときの処理
  const handleNotificationClick = (notification) => {
    // 実際のアプリでは通知を既読にする処理を実装
    console.log('Notification clicked:', notification);
    
    // 通知タイプに応じて適切なページに遷移
    switch(notification.type) {
      case 'match':
        router.push('/matching/');
        break;
      case 'interview':
        router.push('/interviews/');
        break;
      case 'job':
        router.push('/jobs/');
        break;
      case 'candidate':
        router.push('/candidates/');
        break;
      default:
        // デフォルトではダッシュボードに遷移
        router.push('/');
    }
    
    // 通知パネルを閉じる
    setShowNotifications(false);
  };
  
  // すべての通知を既読にする
  const markAllAsRead = (e) => {
    e.stopPropagation();
    // 実際のアプリではAPIを呼び出して通知を既読にする
    console.log('Mark all notifications as read');
  };

  return (
    <header className="header">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white">
        {/* モバイルメニューボタン */}
        <button
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* ロゴ（モバイル） */}
        <div className="md:hidden">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-green-600">JobMatch</span>
          </Link>
        </div>

        {/* 検索バー */}
        <div className="hidden md:flex flex-1 mx-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="求人・候補者を検索..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </div>

        {/* 右側のアイコン */}
        <div className="flex items-center space-x-3">
          {/* 通知ベル */}
          <div className="relative">
            <button
              className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* 通知パネル */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
                <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">通知</h3>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-green-600 hover:text-green-800"
                  >
                    すべて既読にする
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p>通知はありません</p>
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-gray-200 bg-gray-50">
                  <Link href="/notifications/" className="block text-center text-xs text-green-600 hover:text-green-800">
                    すべての通知を見る
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 設定ボタン */}
          <button
            className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => router.push('/settings/')}
          >
            <Settings className="h-6 w-6" />
          </button>

          {/* ユーザーアイコン */}
          <button
            className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => router.push('/profile/')}
          >
            <User className="h-6 w-6" />
          </button>

          {/* ユーザー名とドロップダウン（拡張可能） */}
          <button className="hidden md:flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
            <span>管理者</span>
          </button>
        </div>
      </div>
    </header>
  );
}
