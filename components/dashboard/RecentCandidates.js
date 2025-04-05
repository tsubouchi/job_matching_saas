import React from 'react';

const RecentCandidates = () => {
  return (
    <div className="card-container mb-8">
      <div className="card-header">
        <h2 className="card-title">最近の求職者</h2>
        <button className="view-all-button view-all-button-purple">
          すべて見る
        </button>
      </div>
      
      <div className="card-item border-b border-gray-200">
        <div className="card-item-content">
          <div>
            <div className="flex items-center">
              <h3 className="text-base font-medium text-gray-900">伊藤 恵</h3>
            </div>
            <div className="mt-1">
              <span className="badge badge-yellow mr-2">事務</span>
              <span className="text-sm text-gray-500">秋葉原駅</span>
            </div>
          </div>
          <button className="detail-button">
            詳細
          </button>
        </div>
      </div>
      
      <div className="card-item border-b border-gray-200">
        <div className="card-item-content">
          <div>
            <div className="flex items-center">
              <h3 className="text-base font-medium text-gray-900">山田 隆</h3>
            </div>
            <div className="mt-1">
              <span className="badge badge-purple mr-2">インバウンド</span>
              <span className="text-sm text-gray-500">横浜駅</span>
            </div>
          </div>
          <button className="detail-button">
            詳細
          </button>
        </div>
      </div>
      
      <div className="card-item">
        <div className="card-item-content">
          <div>
            <div className="flex items-center">
              <h3 className="text-base font-medium text-gray-900">鈴木 太郎</h3>
            </div>
            <div className="mt-1">
              <span className="badge badge-green mr-2">アウトバウンド</span>
              <span className="text-sm text-gray-500">新宿駅</span>
            </div>
          </div>
          <button className="detail-button">
            詳細
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentCandidates;
