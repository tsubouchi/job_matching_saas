# Job Matching SaaS - 社内求人マッチングシステム

## プロジェクト概要

このプロジェクトは、社内の求人と求職者をマッチングするためのSaaSアプリケーションです。Next.jsとFirebase Realtime Databaseを使用して構築されており、Gemini APIを活用した高度なマッチング機能を提供します。

## 実装内容

### 技術スタック

- **フロントエンド**: Next.js, TailwindCSS
- **バックエンド**: Next.js API Routes
- **データベース**: Firebase Realtime Database
- **認証**: Firebase Authentication
- **AI機能**: Google Gemini API
- **ホスティング**: Firebase Hosting

### 主な機能

1. **ダッシュボード**
   - 求人総数、求職者総数、マッチング成立数、今週の面談数などの統計情報
   - 最近の求人、求職者、マッチングの一覧表示

2. **求人データベース**
   - 求人情報の登録・編集・検索
   - 求人のステータス管理

3. **求職者管理**
   - 求職者情報の登録・編集・検索
   - スキルや希望条件の管理

4. **マッチング機能**
   - Gemini APIを活用した高度なマッチングアルゴリズム
   - 求人と求職者の適合度評価

5. **面談管理**
   - 面談スケジュールの管理
   - 面談結果の記録

6. **レポート機能**
   - 各種統計データの可視化
   - マッチング効率の分析

### 実装したコンポーネント

1. **共通コンポーネント**
   - `Header.js`: アプリケーションのヘッダー部分
   - `Sidebar.js`: サイドナビゲーションメニュー

2. **ダッシュボードコンポーネント**
   - `DashboardStats.js`: 統計情報の表示
   - `RecentJobs.js`: 最近の求人一覧
   - `RecentCandidates.js`: 最近の求職者一覧
   - `RecentMatches.js`: 最近のマッチング一覧

3. **バックエンドAPI**
   - `/api/chat.js`: Gemini APIとの連携
   - `/api/resume-analysis.js`: 職務経歴書分析API
   - `/api/chat-history.js`: チャット履歴管理API
   - `/api/check-env.js`: 環境変数確認API
   - `/api/update-secrets.js`: シークレット更新API

4. **認証関連**
   - `auth.js`: Firebase Authentication連携
   - `AuthButtons.js`: ログイン/ログアウトボタン

## 実施内容

### 1. GitHubリポジトリのダウンロード
- GitHub PATを使用してリポジトリをクローン
- 基本設計書の確認と要件分析

### 2. GCPプロジェクトの初期化
- Firebase CLIを使用したプロジェクト作成
- Firebase Realtime Databaseの設定
- 必要なAPIの有効化

### 3. 代替シークレット管理の設定
- 環境変数を使用する方法の実装
- .env ファイルを使用する方法の実装（開発環境用）
- Firebase Realtime Databaseの保護されたノードの設定

### 4. バックエンドAPIの開発
- Gemini APIとの連携実装
- チャットメッセージ処理機能の実装
- APIエンドポイントの作成

### 5. フロントエンドインターフェースの開発
- チャットUIの実装
- メッセージ送受信機能の実装
- シークレット管理確認画面の実装

### 6. 認証機能の実装
- OAuth 2.0認証の設定
- ログイン/ログアウト機能の実装
- 認証状態の管理

### 7. Firebase Hostingへのデプロイ
- ビルド設定の構成
- Firebase Hostingの設定
- デプロイと動作確認

## セットアップ手順

### 前提条件
- Node.js 18.x以上
- npm 9.x以上
- Firebase CLIのインストール

### ローカル開発環境のセットアップ

1. リポジトリのクローン
```bash
git clone https://github.com/yourusername/job_matching_saas.git
cd job_matching_saas
```

2. 依存パッケージのインストール
```bash
npm install
```

3. 環境変数の設定
`.env.example`ファイルを`.env.local`にコピーし、必要な環境変数を設定します。
```bash
cp .env.example .env.local
```

4. 開発サーバーの起動
```bash
npm run dev
```

### Firebase Hostingへのデプロイ

1. Firebaseにログイン
```bash
firebase login
```

2. プロジェクトの初期化（初回のみ）
```bash
firebase init
```

3. アプリケーションのビルド
```bash
npm run build
```

4. Firebaseへのデプロイ
```bash
firebase deploy --only hosting
```

## デプロイ先

- **Firebase Hosting**: https://job-matching-saas.web.app

## GCP上での実装オプション

Next.jsアプリケーションはFirebase Hosting以外にも、GCPの以下のサービスにデプロイすることができます：

### 1. Cloud Run（推奨）

Cloud Runは、Next.jsアプリケーションをコンテナ化して実行するサーバーレスプラットフォームです。

**メリット：**
- サーバーサイドレンダリング（SSR）とAPI Routesを完全にサポート
- クライアントサイドのルーティングが正常に機能
- スケーラビリティが高く、トラフィックに応じて自動的にスケールアップ/ダウン
- 使用した分だけ課金（アイドル状態では課金なし）

**基本的なデプロイコマンド：**
```bash
gcloud run deploy --source .
```

### 2. App Engine

App Engineは、フルマネージドのアプリケーションプラットフォームです。

**メリット：**
- サーバーサイドレンダリング（SSR）とAPI Routesをサポート
- クライアントサイドのルーティングが正常に機能
- スケーラビリティが高い
- `app.yaml`ファイルによる詳細な設定が可能

**基本的なデプロイコマンド：**
```bash
gcloud app deploy
```

詳細な実装手順、クライアントサイドルーティングの問題解決方法、およびデプロイ後のテスト方法については、[GCP_DEPLOYMENT.md](GCP_DEPLOYMENT.md)を参照してください。

## 今後の展望

1. **UI/UXの改善**
   - モバイル対応の強化
   - アクセシビリティの向上

2. **機能拡張**
   - 高度な検索フィルター
   - レコメンデーション機能の強化
   - 自動マッチングアラート

3. **インテグレーション**
   - カレンダーシステムとの連携
   - 社内チャットツールとの連携
   - 人事システムとの連携

4. **Cloud Runへの移行**
   - Google Cloud CLIのセットアップと構成
   - Dockerfileの最適化
   - Cloud Runサービスの設定（メモリ、CPU、スケーリング）
   - 継続的デプロイパイプラインの構築（Cloud Build）
   - カスタムドメインとSSL証明書の設定
   - 監視とロギングの実装（Cloud Monitoring, Cloud Logging）
   - パフォーマンス最適化とコスト管理

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。

## 謝辞

このプロジェクトは以下の技術・サービスを使用しています：
- Next.js
- Firebase
- TailwindCSS
- Google Gemini API
