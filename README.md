# Job Matching SaaS

AIを活用した求人マッチングサービス。Gemini APIを使用したチャットアシスタントと職務経歴書分析機能を提供します。

## プロジェクト概要

このプロジェクトは、Next.jsフレームワークを使用し、GCP Firebase (Realtime Database) とCloud Runを活用したサーバーレスアーキテクチャで構築されています。Gemini APIを利用したAIチャットアシスタントにより、ユーザーは求人情報や職務経歴書に関する質問をすることができます。

## 実装内容

### 1. GitHubリポジトリのダウンロード
- リポジトリのクローンと構造確認
- 基本設計書の分析

### 2. GCPプロジェクトの初期化
- Firebase CLIを使用したGCPプロジェクト「job-matching-saas」の作成
- Firebase Realtime Databaseの設定
- 必要なAPIの有効化

### 3. シークレット管理の設定
- 環境変数を使用する方法の実装
- .env ファイルを使用する方法の実装（開発環境用）
- Firebase Realtime Databaseの保護されたノードの設定
- セキュリティルールの設定

### 4. バックエンドAPIの開発
- Gemini APIとの連携実装
  - テキスト生成機能
  - チャット履歴を使用した対話機能
  - 職務経歴書の分析機能
- Firebase Realtime Databaseとの連携実装
  - データの保存・取得・更新・削除
  - チャットメッセージの管理
  - ユーザーチャットの管理
- APIエンドポイントの作成
  - チャット機能のAPIエンドポイント
  - チャット履歴取得APIエンドポイント
  - 職務経歴書分析APIエンドポイント
  - シークレット管理APIエンドポイント

### 5. フロントエンドインターフェースの開発
- チャットUIの実装
  - メッセージ表示コンポーネント
  - 入力フォームコンポーネント
  - ローディング表示
- メッセージ送受信機能の実装
  - WebSocketを使用したリアルタイム通信
  - エラーハンドリング
- シークレット管理確認画面の実装
  - APIキー設定フォーム
  - 環境変数確認機能

### 6. 認証機能の実装
- Firebase Authenticationを使用したOAuth 2.0認証の設定
- Googleアカウントでのログイン/ログアウト機能の実装
- 認証状態の管理
  - ユーザーセッション管理
  - 認証状態に基づいたUI表示の切り替え

### 7. Cloud Runへのデプロイ準備
- Dockerfileの作成
  - Node.js環境の設定
  - 依存関係のインストール
  - アプリケーションのビルド
- ビルド設定の構成
  - Cloud Build設定ファイルの作成
  - 環境変数の設定
- Next.js設定の最適化
  - Cloud Run環境での実行に最適化

## 技術スタック

- **フロントエンド**: Next.js, React
- **バックエンド**: Next.js API Routes
- **データベース**: Firebase Realtime Database
- **認証**: Firebase Authentication
- **AI**: Google Gemini API
- **デプロイ**: Docker, Cloud Run
- **CI/CD**: Cloud Build

## 環境構築

### 前提条件
- Node.js 20.x以上
- npm 10.x以上
- Docker
- Google Cloud SDK
- Firebase CLI

### ローカル開発環境のセットアップ

1. リポジトリのクローン
```bash
git clone https://github.com/yourusername/job_matching_saas.git
cd job_matching_saas
```

2. 依存関係のインストール
```bash
npm install
```

3. 環境変数の設定
`.env.example`ファイルを`.env`にコピーし、必要な環境変数を設定します。

4. 開発サーバーの起動
```bash
npm run dev
```

## デプロイ方法

詳細なデプロイ手順は[DEPLOY.md](./DEPLOY.md)を参照してください。

1. 環境変数の設定
2. Cloud Buildを使用したデプロイ
```bash
gcloud builds submit --config=cloudbuild.yaml
```

## 動作確認

デプロイ後の動作確認手順は[VERIFICATION.md](./VERIFICATION.md)を参照してください。

## プロジェクト構造

```
job_matching_saas/
├── components/           # Reactコンポーネント
│   ├── AuthButtons.js    # 認証ボタンコンポーネント
│   ├── ChatInterface.js  # チャットインターフェースコンポーネント
│   ├── SecretManager.js  # シークレット管理コンポーネント
│   └── ui/               # UIコンポーネント
├── config/               # 設定ファイル
│   ├── .env.example      # 環境変数の例
│   └── env.example.js    # 環境変数設定ファイルの例
├── lib/                  # ユーティリティ関数
│   ├── auth.js           # 認証関連の関数
│   ├── firebase.js       # Firebase連携関数
│   └── gemini.js         # Gemini API連携関数
├── pages/                # Next.jsページ
│   ├── api/              # APIエンドポイント
│   │   ├── chat.js       # チャットAPI
│   │   ├── chat-history.js # チャット履歴API
│   │   ├── check-env.js  # 環境変数確認API
│   │   ├── resume-analysis.js # 職務経歴書分析API
│   │   └── update-secrets.js # シークレット更新API
│   ├── _app.js           # アプリケーションのルートコンポーネント
│   └── index.js          # メインページ
├── public/               # 静的ファイル
├── styles/               # スタイルシート
├── .dockerignore         # Dockerビルド時に除外するファイル
├── .env.example          # 環境変数の例
├── cloudbuild.yaml       # Cloud Build設定ファイル
├── database.rules.json   # Firebase Realtime Databaseのルール
├── DEPLOY.md             # デプロイ手順書
├── Dockerfile            # Dockerビルド設定
├── next.config.js        # Next.js設定ファイル
├── package.json          # プロジェクト依存関係
├── README.md             # プロジェクト説明書
└── VERIFICATION.md       # 動作確認手順書
```

## 機能一覧

1. **ユーザー認証**
   - Googleアカウントでのログイン/ログアウト
   - 認証状態の管理

2. **チャットアシスタント**
   - AIを活用したチャット機能
   - チャット履歴の保存と表示
   - リアルタイムメッセージ送受信

3. **職務経歴書分析**
   - 職務経歴書と求人情報のマッチング分析
   - スキルギャップの分析
   - 改善提案

4. **シークレット管理**
   - APIキーの安全な管理
   - 環境変数の確認と更新

## 今後の展望

1. **UI/UXの改善**
   - モバイル対応の強化
   - アクセシビリティの向上

2. **機能拡張**
   - 複数の職務経歴書の比較機能
   - 求人情報の自動収集機能
   - レコメンデーション機能の強化

3. **パフォーマンス最適化**
   - キャッシュ機能の実装
   - データベースクエリの最適化

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](./LICENSE)ファイルを参照してください。

## 謝辞

- このプロジェクトは[tsubouchi/job_matching_saas](https://github.com/tsubouchi/job_matching_saas)をベースに開発されました。
- Google Gemini APIを提供してくださったGoogleに感謝します。
