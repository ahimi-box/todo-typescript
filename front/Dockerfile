# Node.js 22 をベースに使用
FROM node:22

# 作業ディレクトリを指定
WORKDIR /var/www/html

# package.json と package-lock.json を先にコピー（キャッシュ効率UP）
COPY package*.json ./

# 依存パッケージをインストール
RUN npm install || true

# ポート開放
EXPOSE 5173

# デフォルトコマンド
CMD ["npm", "run", "dev", "--", "--host"]