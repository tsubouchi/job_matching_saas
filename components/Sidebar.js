import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Database, Users, GitMerge, Calendar, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  const router = useRouter();
  
  // ルートパスの比較関数 - トレイリングスラッシュを考慮
  const isActivePath = (path) => {
    // ルートパスの場合の特別処理
    if (path === '/') {
      return router.pathname === '/' || router.pathname === '';
    }
    
    // トレイリングスラッシュを考慮した比較
    return router.pathname === path || 
           router.pathname === `${path}/` || 
           router.pathname.startsWith(`${path}/`);
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <Link href="/" passHref>
          <a className="sidebar-brand-link">
            <Home className="mr-2 h-6 w-6" />
            JobMatch
          </a>
        </Link>
      </div>
      <nav className="sidebar-nav">
        <Link href="/" passHref>
          <a className={`sidebar-link ${isActivePath('/') ? 'active' : ''}`}>
            <div className="sidebar-icon">
              <Home className="h-5 w-5" />
            </div>
            ダッシュボード
          </a>
        </Link>
        <Link href="/jobs/" passHref>
          <a className={`sidebar-link ${isActivePath('/jobs') ? 'active' : ''}`}>
            <div className="sidebar-icon">
              <Database className="h-5 w-5" />
            </div>
            求人データベース
          </a>
        </Link>
        <Link href="/candidates/" passHref>
          <a className={`sidebar-link ${isActivePath('/candidates') ? 'active' : ''}`}>
            <div className="sidebar-icon">
              <Users className="h-5 w-5" />
            </div>
            求職者
          </a>
        </Link>
        <Link href="/matching/" passHref>
          <a className={`sidebar-link ${isActivePath('/matching') ? 'active' : ''}`}>
            <div className="sidebar-icon">
              <GitMerge className="h-5 w-5" />
            </div>
            マッチング
          </a>
        </Link>
        <Link href="/interviews/" passHref>
          <a className={`sidebar-link ${isActivePath('/interviews') ? 'active' : ''}`}>
            <div className="sidebar-icon">
              <Calendar className="h-5 w-5" />
            </div>
            面談DB
          </a>
        </Link>
        <Link href="/reports/" passHref>
          <a className={`sidebar-link ${isActivePath('/reports') ? 'active' : ''}`}>
            <div className="sidebar-icon">
              <BarChart2 className="h-5 w-5" />
            </div>
            レポート
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
