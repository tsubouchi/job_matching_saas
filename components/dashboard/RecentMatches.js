import React from 'react';
import { Check } from 'lucide-react';

const RecentMatches = () => {
  return (
    <div className="card-container mb-8">
      <div className="card-header">
        <h2 className="card-title">最近のマッチング</h2>
        <button className="view-all-button view-all-button-orange">
          すべて見る
        </button>
      </div>
      
      <div className="card-item border-b border-gray-200">
        <div className="card-item-content">
          <div>
            <div className="flex items-center">
              <h3 className="text-base font-medium text-gray-900">伊藤 恵</h3>
              <Check className="match-success-icon" />
              <span className="ml-2 text-sm text-gray-600">金融系事務（新宿）</span>
            </div>
            <div className="mt-1">
              <span className="badge badge-yellow mr-2">事務</span>
              <span className="text-sm text-gray-500">2025年3月28日</span>
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
              <Check className="match-success-icon" />
              <span className="ml-2 text-sm text-gray-600">メール&受電OP（江戸川橋）</span>
            </div>
            <div className="mt-1">
              <span className="badge badge-purple mr-2">インバウンド</span>
              <span className="text-sm text-gray-500">2025年3月27日</span>
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
              <h3 className="text-base font-medium text-gray-900">田中 花子</h3>
              <Check className="match-success-icon" />
              <span className="ml-2 text-sm text-gray-600">金融系事務（新宿）</span>
            </div>
            <div className="mt-1">
              <span className="badge badge-pink mr-2">接客業</span>
              <span className="text-sm text-gray-500">2025年3月26日</span>
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

export default RecentMatches;
