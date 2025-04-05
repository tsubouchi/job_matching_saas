import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Save, X, Calendar, Clock, User, Briefcase, MessageSquare, Plus } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function NewInterview() {
  const router = useRouter();
  const { candidateId, jobId } = router.query;
  
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateId: '',
    jobTitle: '',
    jobId: '',
    interviewDate: '',
    interviewTime: '',
    interviewType: '対面',
    interviewLocation: '',
    interviewers: [''],
    notes: '',
    status: '予定'
  });

  // URLパラメータから候補者IDと求人IDを取得
  useEffect(() => {
    if (candidateId) {
      setFormData(prev => ({ ...prev, candidateId }));
      // 実際のアプリではAPIから候補者情報を取得
      fetchCandidateInfo(candidateId);
    }
    
    if (jobId) {
      setFormData(prev => ({ ...prev, jobId }));
      // 実際のアプリではAPIから求人情報を取得
      fetchJobInfo(jobId);
    }
  }, [candidateId, jobId]);

  // 候補者情報の取得（デモ用）
  const fetchCandidateInfo = (id) => {
    // 実際のアプリではAPIから取得
    const demoData = {
      '1': '山田 隆',
      '2': '佐藤 美咲',
      '3': '伊藤 恵',
      '4': '鈴木 太郎',
      '5': '田中 花子'
    };
    
    setFormData(prev => ({ 
      ...prev, 
      candidateName: demoData[id] || ''
    }));
  };

  // 求人情報の取得（デモ用）
  const fetchJobInfo = (id) => {
    // 実際のアプリではAPIから取得
    const demoData = {
      '1': 'フロントエンドエンジニア',
      '2': 'データアナリスト',
      '3': '一般事務',
      '4': '営業担当',
      '5': 'カスタマーサポート'
    };
    
    setFormData(prev => ({ 
      ...prev, 
      jobTitle: demoData[id] || ''
    }));
  };

  // 候補者の選択肢（デモ用）
  const candidateOptions = [
    { id: '1', name: '山田 隆' },
    { id: '2', name: '佐藤 美咲' },
    { id: '3', name: '伊藤 恵' },
    { id: '4', name: '鈴木 太郎' },
    { id: '5', name: '田中 花子' }
  ];

  // 求人の選択肢（デモ用）
  const jobOptions = [
    { id: '1', title: 'フロントエンドエンジニア' },
    { id: '2', title: 'データアナリスト' },
    { id: '3', title: '一般事務' },
    { id: '4', title: '営業担当' },
    { id: '5', title: 'カスタマーサポート' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCandidateChange = (e) => {
    const selectedId = e.target.value;
    const selectedCandidate = candidateOptions.find(c => c.id === selectedId);
    
    setFormData({
      ...formData,
      candidateId: selectedId,
      candidateName: selectedCandidate ? selectedCandidate.name : ''
    });
  };

  const handleJobChange = (e) => {
    const selectedId = e.target.value;
    const selectedJob = jobOptions.find(j => j.id === selectedId);
    
    setFormData({
      ...formData,
      jobId: selectedId,
      jobTitle: selectedJob ? selectedJob.title : ''
    });
  };

  const handleInterviewerChange = (index, value) => {
    const updatedInterviewers = [...formData.interviewers];
    updatedInterviewers[index] = value;
    setFormData({
      ...formData,
      interviewers: updatedInterviewers,
    });
  };

  const addInterviewer = () => {
    setFormData({
      ...formData,
      interviewers: [...formData.interviewers, ''],
    });
  };

  const removeInterviewer = (index) => {
    const updatedInterviewers = [...formData.interviewers];
    updatedInterviewers.splice(index, 1);
    setFormData({
      ...formData,
      interviewers: updatedInterviewers,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでフォームデータを処理（APIに送信など）
    console.log('Form submitted:', formData);
    
    // 送信後、面談一覧ページにリダイレクト
    router.push('/interviews');
  };

  const handleCancel = () => {
    router.push('/interviews');
  };

  return (
    <div className="page-container">
      <Head>
        <title>新規面談登録 | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - 新規面談登録" />
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
              <h1>新規面談登録</h1>
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
                  className="px-4 py-2 bg-pink-600 text-white rounded-md flex items-center hover:bg-pink-700 transition-colors"
                >
                  <Save className="h-5 w-5 mr-2" />
                  保存
                </button>
              </div>
            </div>

            {/* 登録フォーム */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 基本情報 */}
                  <div className="col-span-2">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">基本情報</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 候補者選択 */}
                      <div className="form-group">
                        <label htmlFor="candidateId" className="form-label">候補者 <span className="text-red-500">*</span></label>
                        <select
                          id="candidateId"
                          name="candidateId"
                          value={formData.candidateId}
                          onChange={handleCandidateChange}
                          className="form-select"
                          required
                        >
                          <option value="">候補者を選択</option>
                          {candidateOptions.map(candidate => (
                            <option key={candidate.id} value={candidate.id}>
                              {candidate.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 求人選択 */}
                      <div className="form-group">
                        <label htmlFor="jobId" className="form-label">求人 <span className="text-red-500">*</span></label>
                        <select
                          id="jobId"
                          name="jobId"
                          value={formData.jobId}
                          onChange={handleJobChange}
                          className="form-select"
                          required
                        >
                          <option value="">求人を選択</option>
                          {jobOptions.map(job => (
                            <option key={job.id} value={job.id}>
                              {job.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 面談日 */}
                      <div className="form-group">
                        <label htmlFor="interviewDate" className="form-label">面談日 <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="date"
                            id="interviewDate"
                            name="interviewDate"
                            value={formData.interviewDate}
                            onChange={handleChange}
                            className="form-input pl-10"
                            required
                          />
                        </div>
                      </div>

                      {/* 面談時間 */}
                      <div className="form-group">
                        <label htmlFor="interviewTime" className="form-label">面談時間 <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Clock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="time"
                            id="interviewTime"
                            name="interviewTime"
                            value={formData.interviewTime}
                            onChange={handleChange}
                            className="form-input pl-10"
                            required
                          />
                        </div>
                      </div>

                      {/* 面談タイプ */}
                      <div className="form-group">
                        <label htmlFor="interviewType" className="form-label">面談タイプ <span className="text-red-500">*</span></label>
                        <select
                          id="interviewType"
                          name="interviewType"
                          value={formData.interviewType}
                          onChange={handleChange}
                          className="form-select"
                          required
                        >
                          <option value="対面">対面</option>
                          <option value="オンライン">オンライン</option>
                          <option value="電話">電話</option>
                        </select>
                      </div>

                      {/* 面談場所 */}
                      <div className="form-group">
                        <label htmlFor="interviewLocation" className="form-label">面談場所</label>
                        <input
                          type="text"
                          id="interviewLocation"
                          name="interviewLocation"
                          value={formData.interviewLocation}
                          onChange={handleChange}
                          className="form-input"
                          placeholder={formData.interviewType === 'オンライン' ? 'Zoom URL等' : '会議室名等'}
                        />
                      </div>

                      {/* ステータス */}
                      <div className="form-group">
                        <label htmlFor="status" className="form-label">ステータス <span className="text-red-500">*</span></label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="form-select"
                          required
                        >
                          <option value="予定">予定</option>
                          <option value="完了">完了</option>
                          <option value="キャンセル">キャンセル</option>
                          <option value="延期">延期</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 面接官 */}
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">面接官</h2>
                      <button
                        type="button"
                        onClick={addInterviewer}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md flex items-center hover:bg-blue-200 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        面接官を追加
                      </button>
                    </div>
                    {formData.interviewers.map((interviewer, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={interviewer}
                            onChange={(e) => handleInterviewerChange(index, e.target.value)}
                            className="form-input pl-10"
                            placeholder="面接官の氏名"
                          />
                        </div>
                        {formData.interviewers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInterviewer(index)}
                            className="ml-2 p-1 text-red-500 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 備考 */}
                  <div className="col-span-2">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">備考</h2>
                    <div className="form-group">
                      <label htmlFor="notes" className="form-label">備考</label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          className="form-textarea pl-10 h-32"
                          placeholder="面談に関する備考や準備事項があれば入力してください"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6 space-x-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md flex items-center hover:bg-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5 mr-2" />
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-600 text-white rounded-md flex items-center hover:bg-pink-700 transition-colors"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
