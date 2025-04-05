import React, { useState } from 'react';
import Head from 'next/head';
import { Search, Filter, Download, BarChart2, PieChart, TrendingUp, Calendar } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Reports() {
  const [reportPeriod, setReportPeriod] = useState('month');

  return (
    <div className="page-container">
      <Head>
        <title>レポート | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - レポート" />
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
              <h1>レポート</h1>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md flex items-center hover:bg-gray-700 transition-colors">
                <Download className="h-5 w-5 mr-2" />
                レポートをエクスポート
              </button>
            </div>

            {/* 期間選択 */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-2">期間</div>
                  <div className="flex space-x-2">
                    <button 
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        reportPeriod === 'week' 
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setReportPeriod('week')}
                    >
                      週次
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        reportPeriod === 'month' 
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setReportPeriod('month')}
                    >
                      月次
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        reportPeriod === 'quarter' 
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setReportPeriod('quarter')}
                    >
                      四半期
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        reportPeriod === 'year' 
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setReportPeriod('year')}
                    >
                      年次
                    </button>
                  </div>
                </div>
                <div className="flex items-end space-x-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="2025年4月"
                      className="form-input pl-10"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* サマリーカード */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="stat-card">
                <div className="flex items-center">
                  <div className="stat-icon stat-icon-blue">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">42</div>
                    <div className="text-sm text-gray-500">新規求人</div>
                    <div className="text-xs text-green-500">前月比 +15%</div>
                  </div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="flex items-center">
                  <div className="stat-icon stat-icon-purple">
                    <PieChart className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">128</div>
                    <div className="text-sm text-gray-500">新規求職者</div>
                    <div className="text-xs text-green-500">前月比 +8%</div>
                  </div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="flex items-center">
                  <div className="stat-icon stat-icon-green">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">24</div>
                    <div className="text-sm text-gray-500">マッチング成立</div>
                    <div className="text-xs text-green-500">前月比 +20%</div>
                  </div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="flex items-center">
                  <div className="stat-icon stat-icon-yellow">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">85%</div>
                    <div className="text-sm text-gray-500">面談完了率</div>
                    <div className="text-xs text-green-500">前月比 +5%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* グラフエリア */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* 求人・求職者推移グラフ */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">求人・求職者推移</h2>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded border border-gray-200">
                  <div className="text-gray-400 flex flex-col items-center">
                    <BarChart2 className="h-12 w-12 mb-2" />
                    <span>グラフ表示エリア</span>
                  </div>
                </div>
              </div>

              {/* マッチング成立率グラフ */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">マッチング成立率</h2>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded border border-gray-200">
                  <div className="text-gray-400 flex flex-col items-center">
                    <PieChart className="h-12 w-12 mb-2" />
                    <span>グラフ表示エリア</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 部署別データ */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">部署別データ</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-header-cell">部署</th>
                      <th className="table-header-cell">求人数</th>
                      <th className="table-header-cell">求職者数</th>
                      <th className="table-header-cell">マッチング数</th>
                      <th className="table-header-cell">マッチング率</th>
                      <th className="table-header-cell">面談完了率</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">開発部</td>
                      <td className="table-cell">18</td>
                      <td className="table-cell">42</td>
                      <td className="table-cell">12</td>
                      <td className="table-cell">28.6%</td>
                      <td className="table-cell">91.7%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">デザイン部</td>
                      <td className="table-cell">8</td>
                      <td className="table-cell">15</td>
                      <td className="table-cell">5</td>
                      <td className="table-cell">33.3%</td>
                      <td className="table-cell">80.0%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">営業部</td>
                      <td className="table-cell">10</td>
                      <td className="table-cell">22</td>
                      <td className="table-cell">7</td>
                      <td className="table-cell">31.8%</td>
                      <td className="table-cell">85.7%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">管理部</td>
                      <td className="table-cell">6</td>
                      <td className="table-cell">18</td>
                      <td className="table-cell">4</td>
                      <td className="table-cell">22.2%</td>
                      <td className="table-cell">75.0%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">マーケティング部</td>
                      <td className="table-cell">5</td>
                      <td className="table-cell">12</td>
                      <td className="table-cell">3</td>
                      <td className="table-cell">25.0%</td>
                      <td className="table-cell">100.0%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">分析部</td>
                      <td className="table-cell">4</td>
                      <td className="table-cell">9</td>
                      <td className="table-cell">2</td>
                      <td className="table-cell">22.2%</td>
                      <td className="table-cell">100.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* スキル別マッチング */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">スキル別マッチング</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-header-cell">スキル</th>
                      <th className="table-header-cell">求人数</th>
                      <th className="table-header-cell">求職者数</th>
                      <th className="table-header-cell">マッチング数</th>
                      <th className="table-header-cell">マッチング率</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">JavaScript</td>
                      <td className="table-cell">15</td>
                      <td className="table-cell">28</td>
                      <td className="table-cell">10</td>
                      <td className="table-cell">35.7%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">React</td>
                      <td className="table-cell">12</td>
                      <td className="table-cell">20</td>
                      <td className="table-cell">8</td>
                      <td className="table-cell">40.0%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">UI/UX</td>
                      <td className="table-cell">8</td>
                      <td className="table-cell">15</td>
                      <td className="table-cell">5</td>
                      <td className="table-cell">33.3%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">Java</td>
                      <td className="table-cell">10</td>
                      <td className="table-cell">18</td>
                      <td className="table-cell">6</td>
                      <td className="table-cell">33.3%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">Python</td>
                      <td className="table-cell">7</td>
                      <td className="table-cell">12</td>
                      <td className="table-cell">4</td>
                      <td className="table-cell">33.3%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">プロジェクト管理</td>
                      <td className="table-cell">6</td>
                      <td className="table-cell">14</td>
                      <td className="table-cell">4</td>
                      <td className="table-cell">28.6%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">AWS</td>
                      <td className="table-cell">9</td>
                      <td className="table-cell">16</td>
                      <td className="table-cell">5</td>
                      <td className="table-cell">31.3%</td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell font-medium text-gray-900">マーケティング</td>
                      <td className="table-cell">5</td>
                      <td className="table-cell">10</td>
                      <td className="table-cell">3</td>
                      <td className="table-cell">30.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
