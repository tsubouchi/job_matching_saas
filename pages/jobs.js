import React, { useState } from 'react';
import Head from 'next/head';
import { Search, Plus, Filter, ArrowUpDown, MoreHorizontal, ExternalLink } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Jobs() {
  const [jobs, setJobs] = useState([
    {
      id: 'JOB001',
      title: 'フロントエンドエンジニア',
      department: '開発部',
      location: '東京',
      type: '正社員',
      experience: '3年以上',
      status: '募集中',
      applicants: 12,
      postedDate: '2025-03-15',
    },
    {
      id: 'JOB002',
      title: 'バックエンドエンジニア',
      department: '開発部',
      location: '大阪',
      type: '正社員',
      experience: '5年以上',
      status: '募集中',
      applicants: 8,
      postedDate: '2025-03-18',
    },
    {
      id: 'JOB003',
      title: 'プロジェクトマネージャー',
      department: '管理部',
      location: '東京',
      type: '正社員',
      experience: '7年以上',
      status: '募集中',
      applicants: 5,
      postedDate: '2025-03-20',
    },
    {
      id: 'JOB004',
      title: 'UIデザイナー',
      department: 'デザイン部',
      location: '東京',
      type: '正社員',
      experience: '2年以上',
      status: '募集中',
      applicants: 15,
      postedDate: '2025-03-22',
    },
    {
      id: 'JOB005',
      title: 'データサイエンティスト',
      department: '分析部',
      location: '福岡',
      type: '正社員',
      experience: '4年以上',
      status: '募集中',
      applicants: 6,
      postedDate: '2025-03-25',
    },
    {
      id: 'JOB006',
      title: 'インフラエンジニア',
      department: '開発部',
      location: '東京',
      type: '正社員',
      experience: '3年以上',
      status: '募集中',
      applicants: 9,
      postedDate: '2025-03-28',
    },
    {
      id: 'JOB007',
      title: 'セールスマネージャー',
      department: '営業部',
      location: '大阪',
      type: '正社員',
      experience: '5年以上',
      status: '募集中',
      applicants: 4,
      postedDate: '2025-03-30',
    },
    {
      id: 'JOB008',
      title: 'マーケティングスペシャリスト',
      department: 'マーケティング部',
      location: '東京',
      type: '正社員',
      experience: '3年以上',
      status: '募集中',
      applicants: 7,
      postedDate: '2025-04-01',
    },
  ]);

  return (
    <div className="page-container">
      <Head>
        <title>求人データベース | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - 求人データベース" />
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
              <h1>求人データベース</h1>
              <button 
                onClick={() => window.location.href = '/new-job/'}
                className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                新規求人登録
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
                    placeholder="求人を検索..."
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

            {/* 求人リスト */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-header-cell">ID</th>
                      <th className="table-header-cell">求人タイトル</th>
                      <th className="table-header-cell">部署</th>
                      <th className="table-header-cell">勤務地</th>
                      <th className="table-header-cell">雇用形態</th>
                      <th className="table-header-cell">経験</th>
                      <th className="table-header-cell">ステータス</th>
                      <th className="table-header-cell">応募者数</th>
                      <th className="table-header-cell">投稿日</th>
                      <th className="table-header-cell">アクション</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {jobs.map((job) => (
                      <tr key={job.id} className="table-row">
                        <td className="table-cell font-medium text-gray-900">{job.id}</td>
                        <td className="table-cell font-medium text-gray-900">{job.title}</td>
                        <td className="table-cell">{job.department}</td>
                        <td className="table-cell">{job.location}</td>
                        <td className="table-cell">{job.type}</td>
                        <td className="table-cell">{job.experience}</td>
                        <td className="table-cell">
                          <span className="badge badge-green">{job.status}</span>
                        </td>
                        <td className="table-cell text-center">{job.applicants}</td>
                        <td className="table-cell">{job.postedDate}</td>
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
                  全 {jobs.length} 件中 1-{jobs.length} 件を表示
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
