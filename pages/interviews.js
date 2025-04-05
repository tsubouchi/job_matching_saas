import React, { useState } from 'react';
import Head from 'next/head';
import { Search, Plus, Filter, ArrowUpDown, Calendar, Clock, MoreHorizontal, ExternalLink } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Interviews() {
  const [interviews, setInterviews] = useState([
    {
      id: 'INT001',
      candidateName: '山田 太郎',
      jobTitle: 'フロントエンドエンジニア',
      department: '開発部',
      interviewer: '鈴木 部長',
      date: '2025-04-10',
      time: '13:00-14:00',
      location: 'オンライン (Zoom)',
      status: '予定',
      feedback: null,
    },
    {
      id: 'INT002',
      candidateName: '佐藤 花子',
      jobTitle: 'UIデザイナー',
      department: 'デザイン部',
      interviewer: '田中 課長',
      date: '2025-04-08',
      time: '10:00-11:00',
      location: '会議室A',
      status: '完了',
      feedback: 'ポジティブ',
    },
    {
      id: 'INT003',
      candidateName: '高橋 真理',
      jobTitle: 'プロジェクトマネージャー',
      department: '管理部',
      interviewer: '伊藤 部長',
      date: '2025-04-05',
      time: '15:00-16:00',
      location: '会議室B',
      status: '完了',
      feedback: 'ポジティブ',
    },
    {
      id: 'INT004',
      candidateName: '渡辺 隆',
      jobTitle: 'インフラエンジニア',
      department: '開発部',
      interviewer: '佐々木 課長',
      date: '2025-04-12',
      time: '14:00-15:00',
      location: 'オンライン (Teams)',
      status: '予定',
      feedback: null,
    },
    {
      id: 'INT005',
      candidateName: '田中 健太',
      jobTitle: 'バックエンドエンジニア',
      department: '開発部',
      interviewer: '山本 部長',
      date: '2025-04-15',
      time: '11:00-12:00',
      location: '会議室C',
      status: '予定',
      feedback: null,
    },
    {
      id: 'INT006',
      candidateName: '小林 直子',
      jobTitle: 'データサイエンティスト',
      department: '分析部',
      interviewer: '中村 課長',
      date: '2025-04-07',
      time: '16:00-17:00',
      location: 'オンライン (Zoom)',
      status: '完了',
      feedback: 'ニュートラル',
    },
    {
      id: 'INT007',
      candidateName: '伊藤 美咲',
      jobTitle: 'マーケティングスペシャリスト',
      department: 'マーケティング部',
      interviewer: '加藤 部長',
      date: '2025-04-06',
      time: '13:30-14:30',
      location: '会議室A',
      status: '完了',
      feedback: 'ポジティブ',
    },
    {
      id: 'INT008',
      candidateName: '鈴木 一郎',
      jobTitle: 'セールスマネージャー',
      department: '営業部',
      interviewer: '吉田 部長',
      date: '2025-04-18',
      time: '10:30-11:30',
      location: '会議室B',
      status: '予定',
      feedback: null,
    },
  ]);

  // ステータスに応じたバッジのスタイルを返す関数
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case '予定':
        return 'badge-blue';
      case '完了':
        return 'badge-green';
      case 'キャンセル':
        return 'badge-red';
      default:
        return 'badge-yellow';
    }
  };

  // フィードバックに応じたバッジのスタイルを返す関数
  const getFeedbackBadgeClass = (feedback) => {
    if (!feedback) return '';
    
    switch (feedback) {
      case 'ポジティブ':
        return 'badge-green';
      case 'ニュートラル':
        return 'badge-yellow';
      case 'ネガティブ':
        return 'badge-red';
      default:
        return 'badge-gray';
    }
  };

  return (
    <div className="page-container">
      <Head>
        <title>面談DB | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - 面談DB" />
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
              <h1>面談DB</h1>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                新規面談登録
              </button>
            </div>

            {/* 検索・フィルターエリア */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="面談を検索..."
                    className="form-input pl-10"
                  />
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center hover:bg-gray-50 transition-colors">
                    <Filter className="h-5 w-5 mr-2 text-gray-500" />
                    フィルター
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center hover:bg-gray-50 transition-colors">
                    <ArrowUpDown className="h-5 w-5 mr-2 text-gray-500" />
                    並び替え
                  </button>
                </div>
              </div>
            </div>

            {/* 面談リスト */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-header-cell">ID</th>
                      <th className="table-header-cell">候補者</th>
                      <th className="table-header-cell">求人タイトル</th>
                      <th className="table-header-cell">部署</th>
                      <th className="table-header-cell">面接官</th>
                      <th className="table-header-cell">日付</th>
                      <th className="table-header-cell">時間</th>
                      <th className="table-header-cell">場所</th>
                      <th className="table-header-cell">ステータス</th>
                      <th className="table-header-cell">フィードバック</th>
                      <th className="table-header-cell">アクション</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {interviews.map((interview) => (
                      <tr key={interview.id} className="table-row">
                        <td className="table-cell font-medium text-gray-900">{interview.id}</td>
                        <td className="table-cell font-medium text-gray-900">{interview.candidateName}</td>
                        <td className="table-cell">{interview.jobTitle}</td>
                        <td className="table-cell">{interview.department}</td>
                        <td className="table-cell">{interview.interviewer}</td>
                        <td className="table-cell">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                            {interview.date}
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            {interview.time}
                          </div>
                        </td>
                        <td className="table-cell">{interview.location}</td>
                        <td className="table-cell">
                          <span className={`badge ${getStatusBadgeClass(interview.status)}`}>
                            {interview.status}
                          </span>
                        </td>
                        <td className="table-cell">
                          {interview.feedback ? (
                            <span className={`badge ${getFeedbackBadgeClass(interview.feedback)}`}>
                              {interview.feedback}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                              <ExternalLink className="h-4 w-4" />
                            </button>
                            <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* ページネーション */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  全 {interviews.length} 件中 1-{interviews.length} 件を表示
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    前へ
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    次へ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
