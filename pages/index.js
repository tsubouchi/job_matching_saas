import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// コンポーネントのインポート
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentJobs from '../components/dashboard/RecentJobs';
import RecentCandidates from '../components/dashboard/RecentCandidates';
import RecentMatches from '../components/dashboard/RecentMatches';

export default function Home() {
  const router = useRouter();

  return (
    <div className="page-container">
      <Head>
        <title>JobMatch - 社内求人マッチングシステム</title>
        <meta name="description" content="社内求人マッチングシステム" />
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
            <h1 className="mb-6">ダッシュボード</h1>
            
            {/* 統計情報 */}
            <DashboardStats />
            
            {/* 最近の求人・求職者・マッチング */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <RecentJobs />
              <RecentCandidates />
            </div>
            
            {/* 最近のマッチング */}
            <div className="mt-6">
              <RecentMatches />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
