# Dockerfile
FROM node:20-alpine

# アプリケーションディレクトリを作成
WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install --legacy-peer-deps

# アプリケーションのソースをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# 環境変数の設定
ENV NODE_ENV=production
ENV PORT=8080

# ポートの公開
EXPOSE 8080

# アプリケーションの起動
CMD ["npm", "start"]
