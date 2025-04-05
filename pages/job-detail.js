import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft, User, MapPin, Calendar, Clock, Briefcase, FileText, Edit, Trash2, Check, X } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 求人データの取得（デモ用）
  useEffect(() => {
    if (id) {
      // 実際のアプリではAPIから取得
      setTimeout(() => {
        const demoJob = {
          id: id,
          title: 'フロントエンドエンジニア',
          department: '技術部',
          location: '東京本社',
          type: '正社員',
          status: '募集中',
          postedDate: '2025-03-15',
          deadline: '2025-05-15',
          description: 'Webアプリケーションのフロントエンド開発を担当していただきます。最新のJavaScriptフレームワークを使用した開発経験がある方を募集しています。',
          requirements: [
            'JavaScript/TypeScriptの実務経験3年以上',
            'React, Vue, Angularいずれかのフレームワーク経験',
            'HTML/CSS/SCSSの実装経験',
            'GitHubを使用した開発経験',
            'チームでの開発経験'
          ],
          preferredSkills: [
            'Next.js, Nuxt.jsなどのフレームワーク経験',
            'GraphQLの使用経験',
            'UIデザインの知識',
            'パフォーマンス最適化の経験',
            'アクセシビリティへの理解'
          ],
          salary: '年収600万円〜800万円',
          benefits: '社会保険完備、交通費支給、リモートワーク可、書籍購入補助、技術勉強会参加費補助',
          contactPerson: '採用担当：鈴木',
          contactEmail: 'recruit@example.com'
        };
        setJob(demoJob);
        
        // 応募者データ（デモ用）
        const demoCandidates = [
          {
            id: '1',
            name: '山田 隆',
            skills: ['JavaScript', 'React', 'TypeScript'],
            experience: '5年',
            matchScore: 92,
            status: '面談調整中'
          },
          {
            id: '2',
            name: '佐藤 美咲',
            skills: ['JavaScript', 'Vue.js', 'CSS'],
            experience: '3年',
            matchScore: 85,
            status: '書類選考中'
          },
          {
            id: '3',
            name: '伊藤 恵',
            skills: ['React', 'HTML', 'SCSS'],
            experience: '2年',
            matchScore: 78,
            status: '応募'
          }
        ];
        setCandidates(demoCandidates);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleEdit = () => {
    router.push(`/edit-job?id=${id}`);
  };

  const handleDelete = () => {
    // 実際のアプリではAPIを呼び出して削除
    console.log('Deleting job:', id);
    setShowDeleteConfirm(false);
    router.push('/jobs');
  };

  const handleBack = () => {
    router.push('/jobs');
  };

  const handleCandidateClick = (candidateId) => {
    router.push(`/candidate-detail?id=${candidateId}`);
  };

  const handleScheduleInterview = (candidateId) => {
    router.push(`/new-interview?candidateId=${candidateId}&jobId=${id}`);
  };

  if (loading) {
    return (
      <div className="page-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <main className="content-area">
            <div className="content-container">
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="page-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <main className="content-area">
            <div className="content-container">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-2">求人が見つかりません</h2>
                <p className="text-gray-600 mb-4">指定された求人情報は存在しないか、削除された可能性があります。</p>
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  求人一覧に戻る
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Head>
        <title>{job.title} | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content={`${job.title} - ${job.department} - 社内求人マッチングシステム`} />
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
              <button
                onClick={handleBack}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md flex items-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                戻る
              </button>
              <div className="flex space-x-2">
                <button 
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  編集
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  削除
                </button>
              </div>
            </div>

            {/* 求人詳細 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-1 text-gray-500" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-1 text-gray-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-1 text-gray-500" />
                        <span>掲載日: {new Date(job.postedDate).toLocaleDateString('ja-JP')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-1 text-gray-500" />
                        <span>締切: {new Date(job.deadline).toLocaleDateString('ja-JP')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      job.status === '募集中' ? 'bg-green-100 text-green-800' :
                      job.status === '一時停止' ? 'bg-yellow-100 text-yellow-800' :
                      job.status === '締切' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                    <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-3">職務内容</h2>
                  <p className="text-gray-700 whitespace-pre-line mb-6">{job.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-3">応募要件</h2>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-3">歓迎スキル</h2>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        {job.preferredSkills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-3">給与</h2>
                      <p className="text-gray-700">{job.salary}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-3">福利厚生</h2>
                      <p className="text-gray-700 whitespace-pre-line">{job.benefits}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">連絡先</h2>
                    <div className="text-gray-700">
                      <p>{job.contactPerson}</p>
                      <p>{job.contactEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 応募者一覧 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">応募者一覧</h2>
              </div>
              {candidates.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          候補者
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          スキル
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          経験
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          マッチ度
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ステータス
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          アクション
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {candidates.map((candidate) => (
                        <tr key={candidate.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleCandidateClick(candidate.id)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {candidate.experience}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              candidate.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                              candidate.matchScore >= 80 ? 'bg-blue-100 text-blue-800' :
                              candidate.matchScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {candidate.matchScore}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              candidate.status === '面談調整中' ? 'bg-purple-100 text-purple-800' :
                              candidate.status === '書類選考中' ? 'bg-yellow-100 text-yellow-800' :
                              candidate.status === '応募' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {candidate.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleScheduleInterview(candidate.id);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              面談登録
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p>この求人にはまだ応募者がいません</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* 削除確認モーダル */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">求人を削除しますか？</h3>
            <p className="text-gray-600 mb-6">この操作は取り消せません。本当にこの求人を削除しますか？</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center hover:bg-gray-300 transition-colors"
              >
                <X className="h-5 w-5 mr-2" />
                キャンセル
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700 transition-colors"
              >
                <Check className="h-5 w-5 mr-2" />
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
