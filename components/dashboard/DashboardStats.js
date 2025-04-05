import React from 'react';
import { Briefcase, Users, GitMerge, Calendar } from 'lucide-react';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="stat-card">
        <div className="flex items-center">
          <div className="stat-icon stat-icon-blue">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <div className="text-3xl font-bold">42</div>
            <div className="text-sm text-gray-500">求人総数</div>
            <div className="text-xs text-gray-500">先週比 +5 (13.5%)</div>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex items-center">
          <div className="stat-icon stat-icon-purple">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <div className="text-3xl font-bold">128</div>
            <div className="text-sm text-gray-500">求職者総数</div>
            <div className="text-xs text-gray-500">先週比 +12 (10.3%)</div>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex items-center">
          <div className="stat-icon stat-icon-green">
            <GitMerge className="h-6 w-6" />
          </div>
          <div>
            <div className="text-3xl font-bold">24</div>
            <div className="text-sm text-gray-500">マッチング成立</div>
            <div className="text-xs text-gray-500">先週比 +8 (50%)</div>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex items-center">
          <div className="stat-icon stat-icon-yellow">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <div className="text-3xl font-bold">18</div>
            <div className="text-sm text-gray-500">今週の面談</div>
            <div className="text-xs text-gray-500">先週比 +3 (20%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
