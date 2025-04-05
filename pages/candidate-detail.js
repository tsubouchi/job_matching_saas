import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft, User, MapPin, Calendar, Briefcase, FileText, Edit, Trash2, Check, X, Mail, Phone, Download } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function CandidateDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 候補者データの取得（デモ用）
  useEffect(() => {
    if (id) {
      // 実際のアプリではAPIから取得
      setTimeout(() => {
        const demoCandidate = {
          id: id,
          name: '山田 隆',
          email: 'takashi.yamada@example.com',
          phone: '090-1234-5678',
          department: '技術部',
          position: 'シニアエンジニア',
          location: '東京',
          status: '転職活動中',
          registeredDate: '2025-03-10',
          skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'GraphQL'],
          experience: [
            {
              company: '株式会社テックイノベーション',
              position: 'フロントエンドエンジニア',
              period: '2020年4月 - 現在',
              description: 'Webアプリケーションのフロントエンド開発を担当。React/TypeScriptを使用した大規模SPA開発、パフォーマンス最適化、コンポーネント設計などを行う。'
            },
            {
              company: '株式会社デジタルソリューションズ',
              position: 'Webエンジニア',
              period: '2017年4月 - 2020年3月',
              description: 'ECサイトの開発・保守。HTML/CSS/JavaScriptを使用したフロントエンド実装、PHPによるバックエンド開発を担当。'
            }
          ],
          education: [
            {
              school: '東京工科大学',
              degree: '情報工学部 情報システム学科',
              period: '2013年4月 - 2017年3月',
              description: '情報システムの設計と実装について学ぶ。卒業研究ではWebアプリケーションのユーザビリティに関する研究を行った。'
            }
          ],
          certifications: [
            'AWS認定ソリューションアーキテクト - アソシエイト',
            'Google Cloud認定プロフェッショナルクラウドデベロッパー',
            'TOEIC 850点'
          ],
          bio: '5年以上のWeb開発経験を持つフロントエンドエンジニアです。モダンなJavaScriptフレームワークを使用した開発が得意で、特にReactとTypeScriptを用いたアプリケーション開発に強みがあります。ユーザー体験を重視したUI/UX設計と、保守性の高いコード実装を心がけています。',
          preferredWorkStyle: 'ハイブリッド（週2-3日リモート）',
          preferredLocation: '東京、神奈川',
          resumeUrl: '/resumes/yamada_takashi_resume.pdf'
        };
        setCandidate(demoCandidate);
        
        // マッチング求人データ（デモ用）
        const demoJobs = [
          {
            id: '1',
            title: 'フロントエンドエンジニア',
            department: '技術部',
            location: '東京本社',
            matchScore: 92,
            status: 'マッチング'
          },
          {
            id: '2',
            title: 'フルスタックエンジニア',
            department: '開発部',
            location: '横浜オフィス',
            matchScore: 85,
            status: '応募中'
          },
          {
            id: '3',
            title: 'Webアプリケーション開発者',
            department: 'プロダクト開発部',
            location: '東京本社',
            matchScore: 78,
            status: '検討中'
          }
        ];
        setJobs(demoJobs);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleEdit = () => {
    router.push(`/edit-candidate?id=${id}`);
  };

  const handleDelete = () => {
    // 実際のアプリではAPIを呼び出して削除
    console.log('Deleting candidate:', id);
    setShowDeleteConfirm(false);
    router.push('/candidates');
  };

  const handleBack = () => {
    router.push('/candidates');
  };

  const handleJobClick = (jobId) => {
    router.push(`/job-detail?id=${jobId}`);
  };

  const handleScheduleInterview = (jobId) => {
    router.push(`/new-interview?candidateId=${id}&jobId=${jobId}`);
  };

  const handleDownloadResume = () => {
    // 実際のアプリではファイルダウンロード処理
    alert('履歴書をダウンロードしました');
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

  if (!candidate) {
    return (
      <div className="page-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <main className="content-area">
            <div className="content-container">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-2">候補者が見つかりません</h2>
                <p className="text-gray-600 mb-4">指定された候補者情報は存在しないか、削除された可能性があります。</p>
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  候補者一覧に戻る
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
        <title>{candidate.name} | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content={`${candidate.name} - ${candidate.position} - 社内求人マッチングシステム`} />
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
                  onClick={handleDownloadResume}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  履歴書
                </button>
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

            {/* 候補者詳細 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  {/* プロフィール画像 */}
                  <div className="md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <User className="h-20 w-20 text-gray-400" />
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        candidate.status === '転職活動中' ? 'bg-green-100 text-green-800' :
                        candidate.status === '転職検討中' ? 'bg-yellow-100 text-yellow-800' :
                        candidate.status === '非公開' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                  </div>

                  {/* 基本情報 */}
                  <div className="md:w-3/4 md:pl-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{candidate.name}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-1 text-gray-500" />
                        <span>{candidate.department} - {candidate.position}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-1 text-gray-500" />
                        <span>{candidate.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-1 text-gray-500" />
                        <span>登録日: {new Date(candidate.registeredDate).toLocaleDateString('ja-JP')}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-gray-500" />
                        <span className="text-gray-700">{candidate.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-gray-500" />
                        <span className="text-gray-700">{candidate.phone}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-lg font-medium text-gray-900 mb-2">スキル</h2>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-lg font-medium text-gray-900 mb-2">自己紹介</h2>
                      <p className="text-gray-700 whitespace-pre-line">{candidate.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-2">希望勤務形態</h2>
                        <p className="text-gray-700">{candidate.preferredWorkStyle}</p>
                      </div>
                      <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-2">希望勤務地</h2>
                        <p className="text-gray-700">{candidate.preferredLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">職歴</h2>
                  <div className="space-y-4">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <h3 className="text-md font-medium text-gray-900">{exp.company}</h3>
                          <span className="text-sm text-gray-500">{exp.period}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-2">{exp.position}</p>
                        <p className="text-sm text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">学歴</h2>
                  <div className="space-y-4">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <h3 className="text-md font-medium text-gray-900">{edu.school}</h3>
                          <span className="text-sm text-gray-500">{edu.period}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-2">{edu.degree}</p>
                        <p className="text-sm text-gray-600">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {candidate.certifications.length > 0 && (
                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">資格・認定</h2>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {candidate.certifications.map((cert, index) => (
                        <li key={index}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* マッチング求人一覧 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">マッチング求人</h2>
              </div>
              {jobs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
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
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleJobClick(job.id)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {job.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {job.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              job.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                              job.matchScore >= 80 ? 'bg-blue-100 text-blue-800' :
                              job.matchScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {job.matchScore}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              job.status === 'マッチング' ? 'bg-green-100 text-green-800' :
                              job.status === '応募中' ? 'bg-blue-100 text-blue-800' :
                              job.status === '検討中' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleScheduleInterview(job.id);
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
                  <p>マッチングする求人はありません</p>
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">候補者を削除しますか？</h3>
            <p className="text-gray-600 mb-6">この操作は取り消せません。本当にこの候補者を削除しますか？</p>
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
