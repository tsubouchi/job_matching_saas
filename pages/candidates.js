import React, { useState } from 'react';
import Head from 'next/head';
import { Search, Plus, Filter, ArrowUpDown, MoreHorizontal, ExternalLink } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Candidates() {
  const [candidates, setCandidates] = useState([
    {
      id: 'CAN001',
      name: '山田 太郎',
      department: '開発部',
      position: 'シニアエンジニア',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: '7年',
      status: '転職希望',
      matchScore: 92,
      lastUpdated: '2025-03-20',
    },
    {
      id: 'CAN002',
      name: '佐藤 花子',
      department: 'デザイン部',
      position: 'UIデザイナー',
      skills: ['Figma', 'Adobe XD', 'UI/UX'],
      experience: '5年',
      status: '転職希望',
      matchScore: 88,
      lastUpdated: '2025-03-22',
    },
    {
      id: 'CAN003',
      name: '鈴木 一郎',
      department: '営業部',
      position: 'セールスマネージャー',
      skills: ['営業', 'マネジメント', 'プレゼンテーション'],
      experience: '10年',
      status: '検討中',
      matchScore: 75,
      lastUpdated: '2025-03-25',
    },
    {
      id: 'CAN004',
      name: '高橋 真理',
      department: '管理部',
      position: 'プロジェクトマネージャー',
      skills: ['プロジェクト管理', 'リーダーシップ', 'Agile'],
      experience: '8年',
      status: '転職希望',
      matchScore: 95,
      lastUpdated: '2025-03-28',
    },
    {
      id: 'CAN005',
      name: '田中 健太',
      department: '開発部',
      position: 'バックエンドエンジニア',
      skills: ['Java', 'Spring', 'MySQL'],
      experience: '6年',
      status: '検討中',
      matchScore: 82,
      lastUpdated: '2025-03-30',
    },
    {
      id: 'CAN006',
      name: '伊藤 美咲',
      department: 'マーケティング部',
      position: 'マーケティングスペシャリスト',
      skills: ['デジタルマーケティング', 'SEO', 'コンテンツ制作'],
      experience: '4年',
      status: '転職希望',
      matchScore: 79,
      lastUpdated: '2025-04-01',
    },
    {
      id: 'CAN007',
      name: '渡辺 隆',
      department: '開発部',
      position: 'インフラエンジニア',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      experience: '5年',
      status: '転職希望',
      matchScore: 90,
      lastUpdated: '2025-04-02',
    },
    {
      id: 'CAN008',
      name: '小林 直子',
      department: '分析部',
      position: 'データサイエンティスト',
      skills: ['Python', 'R', '機械学習'],
      experience: '3年',
      status: '検討中',
      matchScore: 85,
      lastUpdated: '2025-04-03',
    },
  ]);

  return (
    <div className="page-container">
      <Head>
        <title>求職者 | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - 求職者" />
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
              <h1>求職者</h1>
              <button 
                onClick={() => window.location.href = '/new-candidate/'}
                className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                新規求職者登録
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
                    placeholder="求職者を検索..."
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

            {/* 求職者リスト */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-header-cell">ID</th>
                      <th className="table-header-cell">氏名</th>
                      <th className="table-header-cell">部署</th>
                      <th className="table-header-cell">役職</th>
                      <th className="table-header-cell">スキル</th>
                      <th className="table-header-cell">経験年数</th>
                      <th className="table-header-cell">ステータス</th>
                      <th className="table-header-cell">マッチスコア</th>
                      <th className="table-header-cell">最終更新日</th>
                      <th className="table-header-cell">アクション</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {candidates.map((candidate) => (
                      <tr key={candidate.id} className="table-row">
                        <td className="table-cell font-medium text-gray-900">{candidate.id}</td>
                        <td className="table-cell font-medium text-gray-900">{candidate.name}</td>
                        <td className="table-cell">{candidate.department}</td>
                        <td className="table-cell">{candidate.position}</td>
                        <td className="table-cell">
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.map((skill, index) => (
                              <span key={index} className="badge badge-blue">{skill}</span>
                            ))}
                          </div>
                        </td>
                        <td className="table-cell">{candidate.experience}</td>
                        <td className="table-cell">
                          <span className={`badge ${candidate.status === '転職希望' ? 'badge-purple' : 'badge-yellow'}`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  candidate.matchScore >= 90 ? 'bg-green-500' : 
                                  candidate.matchScore >= 80 ? 'bg-blue-500' : 
                                  candidate.matchScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${candidate.matchScore}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm">{candidate.matchScore}%</span>
                          </div>
                        </td>
                        <td className="table-cell">{candidate.lastUpdated}</td>
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
                  全 {candidates.length} 件中 1-{candidates.length} 件を表示
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
