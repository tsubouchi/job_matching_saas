import React from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';

const RecentJobs = () => {
  return (
    <div className="card-container mb-8">
      <div className="card-header">
        <h2 className="card-title">最近の求人</h2>
        <button className="view-all-button view-all-button-red">
          すべて見る
        </button>
      </div>
      
      <div className="card-item border-b border-gray-200">
        <div className="card-item-content">
          <div>
            <div className="flex items-center">
              <h3 className="text-base font-medium text-gray-900">モバイルプランナー（一都三県）</h3>
            </div>
            <div className="mt-1">
              <span className="badge badge-red mr-2">未着手</span>
              <span className="badge badge-blue">モバイル</span>
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
              <h3 className="text-base font-medium text-gray-900">RSヘルプ（目黒）</h3>
            </div>
            <div className="mt-1">
              <span className="badge badge-red mr-2">未着手</span>
              <span className="badge badge-blue">モバイル</span>
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
              <h3 className="text-base font-medium text-gray-900">メール&受電OP（江戸川橋）</h3>
            </div>
            <div className="mt-1">
              <span className="badge badge-red mr-2">未着手</span>
              <span className="badge badge-purple">インバウンド</span>
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

export default RecentJobs;
