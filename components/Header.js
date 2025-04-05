import React from 'react';
import { Search, Bell, Settings, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="search-container">
            <div className="search-box">
              <div className="search-icon">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="search-input"
                placeholder="求人・候補者を検索..."
                type="search"
              />
            </div>
          </div>
          <div className="header-actions">
            <button className="header-button header-button-green">
              <Bell className="h-6 w-6" />
            </button>
            <button className="header-button header-button-red">
              <Settings className="h-6 w-6" />
            </button>
            <button className="admin-button">
              <User className="h-5 w-5" />
              <span>管理者</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
