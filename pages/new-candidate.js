import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Save, X, Plus, Trash2 } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function NewCandidate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    skills: [''],
    experience: '',
    status: '転職希望',
    currentLocation: '',
    preferredLocation: '',
    education: '',
    certifications: [''],
    resume: null,
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ''],
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  const handleCertificationChange = (index, value) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index] = value;
    setFormData({
      ...formData,
      certifications: updatedCertifications,
    });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, ''],
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications.splice(index, 1);
    setFormData({
      ...formData,
      certifications: updatedCertifications,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでフォームデータを処理（APIに送信など）
    console.log('Form submitted:', formData);
    
    // 送信後、求職者一覧ページにリダイレクト
    router.push('/candidates');
  };

  const handleCancel = () => {
    router.push('/candidates');
  };

  return (
    <div className="page-container">
      <Head>
        <title>新規求職者登録 | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - 新規求職者登録" />
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
              <h1>新規求職者登録</h1>
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
                  className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center hover:bg-purple-700 transition-colors"
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
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">氏名 <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="department" className="form-label">現在の部署</label>
                        <input
                          type="text"
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="position" className="form-label">現在の役職</label>
                        <input
                          type="text"
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="experience" className="form-label">経験年数</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="例: 5年"
                        />
                      </div>
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
                          <option value="転職希望">転職希望</option>
                          <option value="検討中">検討中</option>
                          <option value="内定">内定</option>
                          <option value="転職完了">転職完了</option>
                          <option value="辞退">辞退</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="currentLocation" className="form-label">現在の勤務地</label>
                        <input
                          type="text"
                          id="currentLocation"
                          name="currentLocation"
                          value={formData.currentLocation}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="preferredLocation" className="form-label">希望勤務地</label>
                        <input
                          type="text"
                          id="preferredLocation"
                          name="preferredLocation"
                          value={formData.preferredLocation}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="education" className="form-label">学歴</label>
                        <input
                          type="text"
                          id="education"
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* スキル */}
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">スキル</h2>
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md flex items-center hover:bg-blue-200 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        スキルを追加
                      </button>
                    </div>
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                          className="form-input flex-1"
                          placeholder="例: JavaScript, React, UI/UX"
                        />
                        {formData.skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="ml-2 p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 資格 */}
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">資格</h2>
                      <button
                        type="button"
                        onClick={addCertification}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md flex items-center hover:bg-blue-200 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        資格を追加
                      </button>
                    </div>
                    {formData.certifications.map((certification, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={certification}
                          onChange={(e) => handleCertificationChange(index, e.target.value)}
                          className="form-input flex-1"
                          placeholder="例: 基本情報技術者試験, TOEIC 800点"
                        />
                        {formData.certifications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCertification(index)}
                            className="ml-2 p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 履歴書 */}
                  <div className="col-span-2">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">履歴書</h2>
                    <div className="form-group">
                      <label htmlFor="resume" className="form-label">履歴書をアップロード</label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  {/* 備考 */}
                  <div className="col-span-2">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">備考</h2>
                    <div className="form-group">
                      <label htmlFor="notes" className="form-label">備考</label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="form-textarea h-32"
                        placeholder="その他の情報や特記事項があれば入力してください"
                      ></textarea>
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
                    className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center hover:bg-purple-700 transition-colors"
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
