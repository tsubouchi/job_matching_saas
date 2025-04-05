# Cloud Runデプロイ手順

このドキュメントでは、Job Matching SaaSアプリケーションをCloud Runにデプロイする手順を説明します。

## 前提条件

- GCPプロジェクト「job-matching-saas」が作成済み
- Firebase Realtime Databaseが設定済み
- 必要なAPIが有効化済み
- Dockerfileとcloudbuild.yamlが作成済み

## デプロイ手順

### 1. 環境変数の設定

`.env.example`ファイルを参考に、以下の環境変数を設定します：

```bash
# .env.production
GEMINI_API_KEY=your-gemini-api-key-here
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=job-matching-saas.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=job-matching-saas
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=job-matching-saas.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
FIREBASE_DATABASE_URL=https://job-matching-saas-default-rtdb.asia-southeast1.firebasedatabase.app
NODE_ENV=production
PORT=8080
```

### 2. Cloud Buildを使用したデプロイ

以下のコマンドを実行して、Cloud Buildを使用してアプリケーションをビルドしデプロイします：

```bash
gcloud builds submit --config=cloudbuild.yaml
```

このコマンドは以下の処理を行います：
1. Dockerイメージのビルド
2. Container Registryへのイメージのプッシュ
3. Cloud Runへのデプロイ

### 3. 手動デプロイ（代替手段）

Cloud Buildを使用せずに手動でデプロイする場合は、以下の手順を実行します：

```bash
# Dockerイメージをビルド
docker build -t gcr.io/job-matching-saas/job-matching-saas:latest .

# Container Registryにイメージをプッシュ
docker push gcr.io/job-matching-saas/job-matching-saas:latest

# Cloud Runにデプロイ
gcloud run deploy job-matching-saas \
  --image=gcr.io/job-matching-saas/job-matching-saas:latest \
  --region=asia-northeast1 \
  --platform=managed \
  --allow-unauthenticated \
  --memory=512Mi \
  --set-env-vars=NODE_ENV=production
```

### 4. デプロイ後の確認

デプロイが完了すると、以下のようなURLが表示されます：
```
Service [job-matching-saas] revision [job-matching-saas-00001] has been deployed and is serving 100 percent of traffic.
Service URL: https://job-matching-saas-xxxxx-an.a.run.app
```

このURLにアクセスして、アプリケーションが正常に動作していることを確認します。

## トラブルシューティング

デプロイに問題がある場合は、以下を確認してください：

1. GCPプロジェクトの権限設定
2. 必要なAPIが有効化されているか
3. 環境変数が正しく設定されているか
4. Dockerfileに問題がないか
5. Cloud Buildのログを確認する

## 注意事項

- 本番環境では、適切なセキュリティ設定を行ってください
- 環境変数には機密情報が含まれるため、適切に管理してください
- 定期的にアプリケーションのバックアップを取得することをお勧めします
