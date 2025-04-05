import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Save, X, Mail, Phone, MapPin, Briefcase, Calendar, Edit, Upload, User } from 'lucide-react';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '山田 太郎',
    email: 'taro.yamada@example.com',
    phone: '03-1234-5678',
    department: '人事部',
    position: '採用マネージャー',
    location: '東京本社',
    joinDate: '2020-04-01',
    bio: '人事部で採用業務を担当しています。社内の人材配置最適化と新規採用の両面からHR戦略を推進しています。',
    skills: ['人材採用', '面接', 'HR戦略', 'タレントマネジメント', 'コミュニケーション'],
    avatar: '/placeholder-user.jpg'
  });

  const [formData, setFormData] = useState({...profileData});

  // 編集モードに切り替えたときにフォームデータを初期化
  useEffect(() => {
    if (isEditing) {
      setFormData({...profileData});
    }
  }, [isEditing, profileData]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでフォームデータを処理（APIに送信など）
    console.log('Form submitted:', formData);
    
    // プロフィールデータを更新
    setProfileData({...formData});
    
    // 編集モードを終了
    setIsEditing(false);
  };

  const handleCancel = () => {
    // 編集をキャンセルして元の状態に戻す
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 実際のアプリではファイルアップロード処理を実装
      // ここではプレビュー表示のみ
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-container">
      <Head>
        <title>マイプロフィール | JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム - マイプロフィール" />
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
              <h1>マイプロフィール</h1>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  編集
                </button>
              ) : (
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    保存
                  </button>
                </div>
              )}
            </div>

            {/* プロフィール表示/編集 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {!isEditing ? (
                // プロフィール表示モード
                <div className="p-6">
                  <div className="flex flex-col md:flex-row">
                    {/* プロフィール画像 */}
                    <div className="md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
                      <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
                        <img 
                          src={profileData.avatar} 
                          alt={profileData.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* プロフィール情報 */}
                    <div className="md:w-3/4 md:pl-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Briefcase className="h-5 w-5 mr-2" />
                        <span>{profileData.department} - {profileData.position}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{profileData.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Mail className="h-5 w-5 mr-2" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Phone className="h-5 w-5 mr-2" />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>入社日: {new Date(profileData.joinDate).toLocaleDateString('ja-JP')}</span>
                      </div>

                      <div className="border-t border-gray-200 pt-4 mb-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">自己紹介</h3>
                        <p className="text-gray-700">{profileData.bio}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">スキル</h3>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // プロフィール編集モード
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="flex flex-col md:flex-row">
                    {/* プロフィール画像編集 */}
                    <div className="md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
                      <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 group">
                        <img 
                          src={formData.avatar} 
                          alt={formData.name} 
                          className="w-full h-full object-cover"
                        />
                        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <Upload className="h-8 w-8 text-white" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleAvatarChange}
                          />
                        </label>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">クリックして画像を変更</p>
                    </div>

                    {/* プロフィール情報編集 */}
                    <div className="md:w-3/4 md:pl-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                          <label htmlFor="name" className="form-label">氏名</label>
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
                          <label htmlFor="email" className="form-label">メールアドレス</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone" className="form-label">電話番号</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="department" className="form-label">部署</label>
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
                          <label htmlFor="position" className="form-label">役職</label>
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
                          <label htmlFor="location" className="form-label">勤務地</label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="joinDate" className="form-label">入社日</label>
                          <input
                            type="date"
                            id="joinDate"
                            name="joinDate"
                            value={formData.joinDate}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group mb-4">
                        <label htmlFor="bio" className="form-label">自己紹介</label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          className="form-textarea h-24"
                          placeholder="自己紹介を入力してください"
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <div className="flex justify-between items-center mb-2">
                          <label className="form-label">スキル</label>
                          <button
                            type="button"
                            onClick={addSkill}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
                          >
                            + スキルを追加
                          </button>
                        </div>
                        {formData.skills.map((skill, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) => handleSkillChange(index, e.target.value)}
                              className="form-input flex-1"
                              placeholder="スキルを入力"
                            />
                            {formData.skills.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="ml-2 p-1 text-red-500 hover:text-red-700"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* アクティビティ履歴 */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">最近のアクティビティ</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">候補者「山田 隆」を登録しました</p>
                      <p className="text-xs text-gray-500">2025年4月4日 14:30</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
                      <Briefcase className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">求人「フロントエンドエンジニア」を更新しました</p>
                      <p className="text-xs text-gray-500">2025年4月3日 10:15</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 rounded-full p-2 mr-3">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">面談「佐藤 美咲 - データアナリスト」を登録しました</p>
                      <p className="text-xs text-gray-500">2025年4月2日 16:45</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
