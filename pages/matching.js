import React, { useState } from 'react';
import Head from 'next/head';
import { Search, Filter, ArrowUpDown, Check, X, MoreHorizontal, ExternalLink } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Matching() {
  const [matches, setMatches] = useState([
    {
      id: 'MATCH001',
      candidateName: '山田 太郎',
      candidatePosition: 'シニアエンジニア',
      jobTitle: 'フロントエンドエンジニア',
      jobDepartment: '開発部',
      matchScore: 92,
      status: '面談調整中',
      createdDate: '2025-03-20',
    },
    {
      id: 'MATCH002',
      candidateName: '佐藤 花子',
      candidatePosition: 'UIデザイナー',
      jobTitle: 'UIデザイナー',
      jobDepartment: 'デザイン部',
      matchScore: 88,
      status: '面談完了',
      createdDate: '2025-03-22',
    },
    {
      id: 'MATCH003',
      candidateName: '高橋 真理',
      candidatePosition: 'プロジェクトマネージャー',
      jobTitle: 'プロジェクトマネージャー',
      jobDepartment: '管理部',
      matchScore: 95,
      status: '内定',
      createdDate: '2025-03-25',
    },
    {
      id: 'MATCH004',
      candidateName: '渡辺 隆',
      candidatePosition: 'インフラエンジニア',
      jobTitle: 'インフラエンジニア',
      jobDepartment: '開発部',
      matchScore: 90,
      status: '面談調整中',
      createdDate: '2025-03-28',
    },
    {
      id: 'MATCH005',
      candidateName: '田中 健太',
      candidatePosition: 'バックエンドエンジニア',
      jobTitle: 'バックエンドエンジニア',
      jobDepartment: '開発部',
      matchScore: 82,
      status: '検討中',
      createdDate: '2025-03-30',
    },
    {
      id: 'MATCH006',
      candidateName: '小林 直子',
      candidatePosition: 'データサイエンティスト',
      jobTitle: 'データサイエンティスト',
      jobDepartment: '分析部',
      matchScore: 85,
      status: '辞退',
      createdDate: '2025-04-01',
    },
    {
      id: 'MATCH007',
      candidateName: '伊藤 美咲',
      candidatePosition: 'マーケティングスペシャリスト',
      jobTitle: 'マーケティングスペシャリスト',
      jobDepartment: 'マーケティング部',
      matchScore: 79,
      status: '面談完了',
      createdDate: '2025-04-02',
    },
    {
      id: 'MATCH008',
      candidateName: '鈴木 一郎',
      candidatePosition: 'セールスマネージャー',
      jobTitle: 'セールスマネージャー',
      jobDepartment: '営業部',
      matchScore: 75,
      status: '検討中',
      createdDate: '2025-04-03',
    },
  ]);

  // ステータスに応じたバッジのスタイルを返す関数
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case '面談調整中':
        return 'badge-blue';
      case '面談完了':
        return 'badge-purple';
      case '内定':
        return 'badge-green';
      case '辞退':
        return 'badge-red';
      case '検討中':
      default:
        return 'badge-yellow';
    }
  };

  return (
    <div className="page-container">
      <Head>
        <title>マッチング | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - マッチング" />
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
              <h1>マッチング</h1>
              <div className="flex space-x-2">
                <button 
                  onClick={() => window.location.href = '/automatic-matching/'}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md flex items-center hover:bg-orange-600 transition-colors"
                >
                  <Check className="h-5 w-5 mr-2" />
                  自動マッチング実行
                </button>
              </div>
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
                    placeholder="マッチングを検索..."
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

            {/* マッチングリスト */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-header-cell">ID</th>
                      <th className="table-header-cell">求職者</th>
                      <th className="table-header-cell">現在の役職</th>
                      <th className="table-header-cell">求人タイトル</th>
                      <th className="table-header-cell">部署</th>
                      <th className="table-header-cell">マッチスコア</th>
                      <th className="table-header-cell">ステータス</th>
                      <th className="table-header-cell">作成日</th>
                      <th className="table-header-cell">アクション</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {matches.map((match) => (
                      <tr key={match.id} className="table-row">
                        <td className="table-cell font-medium text-gray-900">{match.id}</td>
                        <td className="table-cell font-medium text-gray-900">{match.candidateName}</td>
                        <td className="table-cell">{match.candidatePosition}</td>
                        <td className="table-cell">{match.jobTitle}</td>
                        <td className="table-cell">{match.jobDepartment}</td>
                        <td className="table-cell">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  match.matchScore >= 90 ? 'bg-green-500' : 
                                  match.matchScore >= 80 ? 'bg-blue-500' : 
                                  match.matchScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${match.matchScore}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm">{match.matchScore}%</span>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className={`badge ${getStatusBadgeClass(match.status)}`}>
                            {match.status}
                          </span>
                        </td>
                        <td className="table-cell">{match.createdDate}</td>
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
                  全 {matches.length} 件中 1-{matches.length} 件を表示
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
