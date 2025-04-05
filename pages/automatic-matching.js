import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Play, RefreshCw, Check, X, Filter, Download, ChevronDown, ChevronUp } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function AutomaticMatching() {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [matchResults, setMatchResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minScore: 70,
    departments: [],
    skills: [],
    locations: []
  });

  // フィルター用のオプション（実際のアプリではAPIから取得）
  const filterOptions = {
    departments: ['営業部', '技術部', '人事部', 'マーケティング部', '経理部', '総務部'],
    skills: ['JavaScript', 'React', 'Python', 'データ分析', 'プロジェクト管理', 'UI/UX', 'マーケティング', '営業'],
    locations: ['東京', '大阪', '名古屋', '福岡', '札幌', 'リモート']
  };

  // マッチング実行のシミュレーション
  const runMatching = () => {
    setIsRunning(true);
    setProgress(0);
    setMatchResults([]);

    // プログレスバーのアニメーション
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          generateMatchResults();
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // マッチング結果の生成（デモ用）
  const generateMatchResults = () => {
    const demoResults = [
      {
        id: 1,
        candidateName: '山田 隆',
        candidateSkills: ['JavaScript', 'React', 'UI/UX'],
        jobTitle: 'フロントエンドエンジニア',
        department: '技術部',
        location: '東京',
        matchScore: 92,
        matchDetails: [
          { category: 'スキル', score: 95, note: 'スキルセットが求人要件と高く一致' },
          { category: '経験', score: 90, note: '類似プロジェクト経験あり' },
          { category: '勤務地', score: 100, note: '希望勤務地と一致' },
        ]
      },
      {
        id: 2,
        candidateName: '佐藤 美咲',
        candidateSkills: ['Python', 'データ分析', 'SQL'],
        jobTitle: 'データアナリスト',
        department: 'マーケティング部',
        location: '大阪',
        matchScore: 85,
        matchDetails: [
          { category: 'スキル', score: 90, note: '主要スキルが一致' },
          { category: '経験', score: 80, note: '関連分野の経験あり' },
          { category: '勤務地', score: 70, note: '通勤可能範囲内' },
        ]
      },
      {
        id: 3,
        candidateName: '伊藤 恵',
        candidateSkills: ['Excel', '事務処理', 'コミュニケーション'],
        jobTitle: '一般事務',
        department: '総務部',
        location: '東京',
        matchScore: 78,
        matchDetails: [
          { category: 'スキル', score: 85, note: '基本スキルが一致' },
          { category: '経験', score: 70, note: '類似業務経験あり' },
          { category: '勤務地', score: 100, note: '希望勤務地と一致' },
        ]
      },
      {
        id: 4,
        candidateName: '鈴木 太郎',
        candidateSkills: ['営業', 'プレゼンテーション', '顧客管理'],
        jobTitle: '営業担当',
        department: '営業部',
        location: '名古屋',
        matchScore: 73,
        matchDetails: [
          { category: 'スキル', score: 75, note: '基本スキルが一致' },
          { category: '経験', score: 65, note: '業界経験は少ないが適性あり' },
          { category: '勤務地', score: 90, note: '希望勤務地と近い' },
        ]
      },
      {
        id: 5,
        candidateName: '田中 花子',
        candidateSkills: ['接客', 'コミュニケーション', '英語'],
        jobTitle: 'カスタマーサポート',
        department: '営業部',
        location: '福岡',
        matchScore: 68,
        matchDetails: [
          { category: 'スキル', score: 70, note: '基本スキルは一致するが専門知識が不足' },
          { category: '経験', score: 60, note: '関連経験が限定的' },
          { category: '勤務地', score: 80, note: '通勤可能だが距離がある' },
        ]
      }
    ];

    // フィルターの適用
    const filteredResults = demoResults.filter(result => {
      // 最小スコアでフィルタリング
      if (result.matchScore < filters.minScore) return false;
      
      // 部署でフィルタリング（選択されている場合）
      if (filters.departments.length > 0 && !filters.departments.includes(result.department)) return false;
      
      // スキルでフィルタリング（選択されている場合）
      if (filters.skills.length > 0 && !result.candidateSkills.some(skill => filters.skills.includes(skill))) return false;
      
      // 勤務地でフィルタリング（選択されている場合）
      if (filters.locations.length > 0 && !filters.locations.includes(result.location)) return false;
      
      return true;
    });

    setMatchResults(filteredResults);
  };

  // フィルター変更のハンドラー
  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (type === 'minScore') {
        newFilters.minScore = parseInt(value);
      } else {
        // 配列の場合（チェックボックス）
        const index = newFilters[type].indexOf(value);
        if (index === -1) {
          newFilters[type] = [...newFilters[type], value];
        } else {
          newFilters[type] = newFilters[type].filter(item => item !== value);
        }
      }
      
      return newFilters;
    });
  };

  // フィルター適用
  const applyFilters = () => {
    generateMatchResults();
  };

  // フィルターリセット
  const resetFilters = () => {
    setFilters({
      minScore: 70,
      departments: [],
      skills: [],
      locations: []
    });
  };

  // マッチング結果のエクスポート
  const exportResults = () => {
    // 実際のアプリではCSVやExcelファイルの生成処理
    alert('マッチング結果をエクスポートしました');
  };

  // マッチング詳細の表示切り替え
  const toggleMatchDetails = (id) => {
    setMatchResults(prev => prev.map(match => {
      if (match.id === id) {
        return { ...match, showDetails: !match.showDetails };
      }
      return match;
    }));
  };

  return (
    <div className="page-container">
      <Head>
        <title>自動マッチング実行 | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - 自動マッチング実行" />
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
              <h1>自動マッチング実行</h1>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md flex items-center hover:bg-blue-200 transition-colors"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  フィルター {showFilters ? '非表示' : '表示'}
                </button>
                {matchResults.length > 0 && (
                  <button 
                    onClick={exportResults}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md flex items-center hover:bg-indigo-200 transition-colors"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    エクスポート
                  </button>
                )}
                <button 
                  onClick={runMatching}
                  disabled={isRunning}
                  className={`px-4 py-2 ${isRunning ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white rounded-md flex items-center transition-colors`}
                >
                  {isRunning ? (
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Play className="h-5 w-5 mr-2" />
                  )}
                  {isRunning ? 'マッチング実行中...' : 'マッチング実行'}
                </button>
              </div>
            </div>

            {/* フィルターパネル */}
            {showFilters && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">マッチングフィルター</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={resetFilters}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
                    >
                      リセット
                    </button>
                    <button 
                      onClick={applyFilters}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      適用
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* 最小スコア */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      最小マッチングスコア: {filters.minScore}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.minScore}
                      onChange={(e) => handleFilterChange('minScore', e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* 部署フィルター */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">部署</label>
                    <div className="max-h-32 overflow-y-auto">
                      {filterOptions.departments.map((dept, index) => (
                        <div key={index} className="flex items-center mb-1">
                          <input
                            type="checkbox"
                            id={`dept-${index}`}
                            checked={filters.departments.includes(dept)}
                            onChange={() => handleFilterChange('departments', dept)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                          <label htmlFor={`dept-${index}`} className="ml-2 text-sm text-gray-700">
                            {dept}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* スキルフィルター */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">スキル</label>
                    <div className="max-h-32 overflow-y-auto">
                      {filterOptions.skills.map((skill, index) => (
                        <div key={index} className="flex items-center mb-1">
                          <input
                            type="checkbox"
                            id={`skill-${index}`}
                            checked={filters.skills.includes(skill)}
                            onChange={() => handleFilterChange('skills', skill)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                          <label htmlFor={`skill-${index}`} className="ml-2 text-sm text-gray-700">
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 勤務地フィルター */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">勤務地</label>
                    <div className="max-h-32 overflow-y-auto">
                      {filterOptions.locations.map((location, index) => (
                        <div key={index} className="flex items-center mb-1">
                          <input
                            type="checkbox"
                            id={`location-${index}`}
                            checked={filters.locations.includes(location)}
                            onChange={() => handleFilterChange('locations', location)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                          <label htmlFor={`location-${index}`} className="ml-2 text-sm text-gray-700">
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* プログレスバー（マッチング実行中） */}
            {isRunning && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-medium text-gray-900">マッチング処理中...</h2>
                  <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">求人と求職者データを分析中です。しばらくお待ちください...</p>
              </div>
            )}

            {/* マッチング結果 */}
            {!isRunning && matchResults.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">マッチング結果</h2>
                  <p className="text-sm text-gray-500 mt-1">{matchResults.length}件のマッチングが見つかりました</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          求職者
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          求人
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          部署
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          勤務地
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          マッチスコア
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          アクション
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {matchResults.map((match) => (
                        <React.Fragment key={match.id}>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{match.candidateName}</div>
                              <div className="text-sm text-gray-500">
                                {match.candidateSkills.join(', ')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{match.jobTitle}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{match.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{match.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                match.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                                match.matchScore >= 80 ? 'bg-blue-100 text-blue-800' :
                                match.matchScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {match.matchScore}%
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => toggleMatchDetails(match.id)}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                              >
                                {match.showDetails ? '詳細を隠す' : '詳細を表示'}
                                {match.showDetails ? 
                                  <ChevronUp className="h-4 w-4 inline ml-1" /> : 
                                  <ChevronDown className="h-4 w-4 inline ml-1" />
                                }
                              </button>
                              <button
                                className="text-green-600 hover:text-green-900"
                                onClick={() => router.push('/new-interview')}
                              >
                                面談登録
                              </button>
                            </td>
                          </tr>
                          {match.showDetails && (
                            <tr className="bg-gray-50">
                              <td colSpan="6" className="px-6 py-4">
                                <div className="text-sm text-gray-900 font-medium mb-2">マッチング詳細</div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {match.matchDetails.map((detail, index) => (
                                    <div key={index} className="bg-white p-3 rounded-md border border-gray-200">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-700">{detail.category}</span>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                          detail.score >= 90 ? 'bg-green-100 text-green-800' :
                                          detail.score >= 80 ? 'bg-blue-100 text-blue-800' :
                                          detail.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-gray-100 text-gray-800'
                                        }`}>
                                          {detail.score}%
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-600">{detail.note}</p>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* マッチング結果がない場合 */}
            {!isRunning && matchResults.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <RefreshCw className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">マッチング結果はありません</h3>
                  <p className="text-gray-500 mb-4">「マッチング実行」ボタンをクリックして、求人と求職者のマッチングを開始してください。</p>
                  <button 
                    onClick={runMatching}
                    className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700 transition-colors"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    マッチング実行
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
