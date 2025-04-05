import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Save, X, Plus, Trash2 } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function NewJob() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: '正社員',
    status: '募集中',
    description: '',
    requirements: [''],
    preferredSkills: [''],
    salary: '',
    benefits: '',
    startDate: '',
    deadline: '',
    contactPerson: '',
    contactEmail: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: updatedRequirements,
    });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ''],
    });
  };

  const removeRequirement = (index) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements.splice(index, 1);
    setFormData({
      ...formData,
      requirements: updatedRequirements,
    });
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.preferredSkills];
    updatedSkills[index] = value;
    setFormData({
      ...formData,
      preferredSkills: updatedSkills,
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      preferredSkills: [...formData.preferredSkills, ''],
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.preferredSkills];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      preferredSkills: updatedSkills,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでフォームデータを処理（APIに送信など）
    console.log('Form submitted:', formData);
    
    // 送信後、求人一覧ページにリダイレクト
    router.push('/jobs');
  };

  const handleCancel = () => {
    router.push('/jobs');
  };

  return (
    <div className="page-container">
      <Head>
        <title>新規求人登録 | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - 新規求人登録" />
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
              <h1>新規求人登録</h1>
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
                  className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700 transition-colors"
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
                        <label htmlFor="title" className="form-label">求人タイトル <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="department" className="form-label">部署 <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="location" className="form-label">勤務地 <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="type" className="form-label">雇用形態 <span className="text-red-500">*</span></label>
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="form-select"
                          required
                        >
                          <option value="正社員">正社員</option>
                          <option value="契約社員">契約社員</option>
                          <option value="パートタイム">パートタイム</option>
                          <option value="インターン">インターン</option>
                          <option value="その他">その他</option>
                        </select>
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
                          <option value="募集中">募集中</option>
                          <option value="一時停止">一時停止</option>
                          <option value="締切">締切</option>
                          <option value="採用完了">採用完了</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="salary" className="form-label">給与</label>
                        <input
                          type="text"
                          id="salary"
                          name="salary"
                          value={formData.salary}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="例: 年収500万円〜700万円"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="startDate" className="form-label">開始日</label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="deadline" className="form-label">応募締切日</label>
                        <input
                          type="date"
                          id="deadline"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 職務内容 */}
                  <div className="col-span-2">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">職務内容</h2>
                    <div className="form-group">
                      <label htmlFor="description" className="form-label">職務内容 <span className="text-red-500">*</span></label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-textarea h-32"
                        required
                        placeholder="職務内容の詳細を入力してください"
                      ></textarea>
                    </div>
                  </div>

                  {/* 応募要件 */}
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">応募要件</h2>
                      <button
                        type="button"
                        onClick={addRequirement}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md flex items-center hover:bg-blue-200 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        要件を追加
                      </button>
                    </div>
                    {formData.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => handleRequirementChange(index, e.target.value)}
                          className="form-input flex-1"
                          placeholder="例: 3年以上のプロジェクト管理経験"
                        />
                        {formData.requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="ml-2 p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 歓迎スキル */}
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">歓迎スキル</h2>
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md flex items-center hover:bg-blue-200 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        スキルを追加
                      </button>
                    </div>
                    {formData.preferredSkills.map((skill, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                          className="form-input flex-1"
                          placeholder="例: JavaScript, React, UI/UX"
                        />
                        {formData.preferredSkills.length > 1 && (
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

                  {/* 福利厚生 */}
                  <div className="col-span-2">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">福利厚生</h2>
                    <div className="form-group">
                      <label htmlFor="benefits" className="form-label">福利厚生</label>
                      <textarea
                        id="benefits"
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                        className="form-textarea h-24"
                        placeholder="福利厚生の詳細を入力してください"
                      ></textarea>
                    </div>
                  </div>

                  {/* 連絡先情報 */}
                  <div className="col-span-2">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">連絡先情報</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="contactPerson" className="form-label">担当者名</label>
                        <input
                          type="text"
                          id="contactPerson"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contactEmail" className="form-label">連絡先メールアドレス</label>
                        <input
                          type="email"
                          id="contactEmail"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
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
                        className="form-textarea h-24"
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
                    className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700 transition-colors"
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
