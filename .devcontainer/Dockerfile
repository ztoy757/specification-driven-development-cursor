# Node.js 18を使用（LTS版）
FROM node:18-bullseye

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    nano \
    zsh \
    && rm -rf /var/lib/apt/lists/*

# oh-my-zshのインストール（開発体験向上）
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" || true

# グローバルなnpmパッケージをインストール
RUN npm install -g \
    @vue/cli \
    vite \
    typescript \
    npm-check-updates

# 作業ディレクトリを設定
WORKDIR /workspace

# ユーザーの権限設定
RUN chown -R node:node /workspace

# ユーザーをnodeに切り替え
USER node

# デフォルトシェルをzshに設定
ENV SHELL /bin/zsh

# デフォルトコマンド
CMD ["sleep", "infinity"]
