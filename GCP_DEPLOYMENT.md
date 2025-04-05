# GCP上でのNext.jsアプリケーション実装ガイド

このガイドでは、Next.jsアプリケーションをGoogle Cloud Platform（GCP）上で正しく実装するための詳細な手順を説明します。特にクライアントサイドのルーティングが正常に機能するように設定する方法に焦点を当てています。

## 目次

1. [GCPデプロイオプションの比較](#gcp-デプロイオプションの比較)
2. [Cloud Runによる実装](#cloud-runによる実装)
3. [App Engineによる実装](#app-engineによる実装)
4. [クライアントサイドルーティングの問題解決](#クライアントサイドルーティングの問題解決)
5. [デプロイ後のテストと検証](#デプロイ後のテストと検証)

## GCP デプロイオプションの比較

Next.jsアプリケーションをGCP上でホスティングするための主な選択肢は以下の3つです：

| 機能 | Firebase Hosting | Cloud Run | App Engine |
|------|-----------------|-----------|------------|
| SSR対応 | 限定的（Functionsと組み合わせ） | ✅ 完全対応 | ✅ 完全対応 |
| API Routes | 限定的（Functionsと組み合わせ） | ✅ 完全対応 | ✅ 完全対応 |
| クライアントサイドルーティング | 設定が必要 | ✅ 完全対応 | ✅ 完全対応 |
| スケーラビリティ | 高 | 非常に高い | 非常に高い |
| コスト | 低（無料枠あり） | 使用量ベース（アイドル時は無料） | 使用量ベース（常時最小インスタンス） |
| デプロイの複雑さ | 低〜中 | 低 | 中 |

**推奨：** Cloud Run（最も柔軟でコスト効率が高く、Next.jsの全機能をサポート）

## Cloud Runによる実装

### 前提条件

- Google Cloudアカウント
- Google Cloud CLIのインストール
- Node.js 18.x以上

### 手順

1. **GCPプロジェクトの設定**

```bash
# GCPにログイン
gcloud auth login

# プロジェクトの作成（既存のプロジェクトを使用する場合はスキップ）
gcloud projects create [PROJECT_ID] --name="[PROJECT_NAME]"

# プロジェクトの選択
gcloud config set project [PROJECT_ID]

# 必要なAPIの有効化
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

2. **Next.jsプロジェクトの準備**

`package.json`に以下のスクリプトが含まれていることを確認します：

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

3. **Cloud Runへのデプロイ**

```bash
# プロジェクトのルートディレクトリで実行
gcloud run deploy --source .
```

プロンプトが表示されたら、以下の情報を入力します：
- サービス名（デフォルト：プロジェクトフォルダ名）
- リージョン（例：asia-northeast1）
- 未認証の呼び出しを許可するかどうか（通常はYes）

4. **カスタムドメインの設定（オプション）**

```bash
gcloud run domain-mappings create --service [SERVICE_NAME] --domain [YOUR_DOMAIN]
```

### 注意点

- Cloud Runは自動的にDockerfileを生成し、コンテナをビルドします
- デフォルトでは、Cloud Runはサーバーサイドレンダリングとクライアントサイドルーティングの両方をサポートします
- メモリ使用量が多い場合は、デプロイ時に`--memory`フラグを使用してメモリ割り当てを増やすことができます

## App Engineによる実装

### 前提条件

- Google Cloudアカウント
- Google Cloud CLIのインストール
- Node.js 18.x以上

### 手順

1. **GCPプロジェクトの設定**

```bash
# GCPにログイン
gcloud auth login

# プロジェクトの作成（既存のプロジェクトを使用する場合はスキップ）
gcloud projects create [PROJECT_ID] --name="[PROJECT_NAME]"

# プロジェクトの選択
gcloud config set project [PROJECT_ID]

# App Engine APIの有効化
gcloud services enable appengine.googleapis.com
```

2. **app.yamlファイルの作成**

プロジェクトのルートディレクトリに`app.yaml`ファイルを作成します：

```yaml
runtime: nodejs18

service: default

handlers:
  - url: /.*
    secure: always
    script: auto

env_variables:
  NODE_ENV: 'production'
```

3. **Next.jsプロジェクトの準備**

`package.json`に以下のスクリプトが含まれていることを確認します：

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

4. **App Engineへのデプロイ**

```bash
# プロジェクトのルートディレクトリで実行
gcloud app deploy
```

プロンプトが表示されたら、リージョンを選択します（初回のみ）。

### 注意点

- App Engineは初回デプロイ時にリージョンを選択する必要があり、後で変更できません
- デフォルトのサービス名は`default`です。複数のサービスを使用する場合は、`app.yaml`の`service`フィールドを変更します
- App Engineは自動的にスケールしますが、最小インスタンス数を設定することもできます

## クライアントサイドルーティングの問題解決

Next.jsアプリケーションでクライアントサイドルーティングが正しく機能するためには、以下の点に注意する必要があります：

### 1. Next.jsの設定

`next.config.js`ファイルで以下の設定を行います：

```javascript
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true,
  },
  // Cloud RunやApp Engineでのデプロイ時は不要
  // Firebase Hostingを使用する場合のみ必要
  // output: 'export',
  // trailingSlash: true,
};
```

### 2. クライアントサイドナビゲーションの実装

Next.jsの`Link`コンポーネントと`useRouter`フックを使用して、クライアントサイドナビゲーションを実装します：

```jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();
  
  return (
    <nav>
      <Link href="/">
        <a className={router.pathname === '/' ? 'active' : ''}>ホーム</a>
      </Link>
      <Link href="/jobs">
        <a className={router.pathname === '/jobs' ? 'active' : ''}>求人</a>
      </Link>
      
      {/* ボタンによるナビゲーション */}
      <button onClick={() => router.push('/new-job')}>
        新規求人登録
      </button>
    </nav>
  );
}
```

### 3. サーバーサイドの設定

#### Cloud Run

Cloud Runでは特別な設定は必要ありません。Next.jsのサーバーサイドレンダリングが自動的に処理されます。

#### App Engine

App Engineでも特別な設定は必要ありませんが、`app.yaml`ファイルで以下のように設定することで、すべてのリクエストをNext.jsアプリケーションにルーティングできます：

```yaml
handlers:
  - url: /.*
    secure: always
    script: auto
```

#### Firebase Hosting（静的エクスポートの場合）

Firebase Hostingを使用する場合は、`firebase.json`ファイルで以下のように設定します：

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## デプロイ後のテストと検証

デプロイ後は、以下の点を確認してアプリケーションが正しく機能しているか検証します：

1. **ページナビゲーションのテスト**
   - すべてのリンクとボタンをクリックして、正しいページに遷移するか確認
   - ブラウザの戻るボタンと進むボタンが正しく機能するか確認

2. **API Routesのテスト**
   - APIエンドポイントが正しく応答するか確認
   - データの取得と送信が正常に機能するか確認

3. **サーバーサイドレンダリングのテスト**
   - ページソースを表示して、サーバーサイドでレンダリングされたHTMLが含まれているか確認
   - SEO関連のメタタグが正しく設定されているか確認

4. **パフォーマンスのテスト**
   - Lighthouse等のツールを使用してパフォーマンスを測定
   - 初回読み込み時間とナビゲーション時間を確認

## トラブルシューティング

### クライアントサイドルーティングが機能しない場合

1. **Next.jsのバージョン確認**
   - Next.js 12以降を使用していることを確認

2. **ルーティング実装の確認**
   - `Link`コンポーネントが正しく使用されているか確認
   - `useRouter`フックが正しく実装されているか確認

3. **デプロイ設定の確認**
   - Cloud RunとApp Engineでは`next.config.js`で`output: 'export'`が設定されていないことを確認
   - Firebase Hostingでは`rewrites`設定が正しく行われているか確認

4. **ブラウザキャッシュのクリア**
   - ハード更新（Ctrl+F5）を実行してキャッシュをクリア

### サーバーサイドレンダリングが機能しない場合

1. **デプロイ設定の確認**
   - `next.config.js`で`output: 'export'`が設定されていないことを確認（静的エクスポートではSSRは機能しません）

2. **サーバーログの確認**
   - Cloud RunまたはApp Engineのログを確認して、エラーメッセージを特定

3. **メモリ制限の確認**
   - Cloud Runの場合、メモリ割り当てが不足している可能性があります。割り当てを増やしてみてください。
