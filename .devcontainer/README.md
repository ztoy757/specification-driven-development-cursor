# Vue.js TODOアプリ - Dev Container

このプロジェクトは、Vue.js + TypeScript + Tailwind CSSで構築されたTODOアプリの開発環境をDev Containerとして提供します。

## 🚀 クイックスタート

### 前提条件
- Docker Desktop がインストールされていること
- Visual Studio Code がインストールされていること
- Dev Containers 拡張機能がインストールされていること

### 起動方法

1. **VS Codeでプロジェクトを開く**
   ```bash
   code .
   ```

2. **Dev Containerで再オープン**
   - VS Codeの右下に表示される通知 "Reopen in Container" をクリック
   - または、コマンドパレット（Ctrl+Shift+P）で "Dev Containers: Reopen in Container" を実行

3. **自動セットアップ**
   - コンテナのビルドと依存関係のインストールが自動実行されます
   - 開発サーバーが自動起動します

4. **アプリケーションにアクセス**
   - ブラウザで `http://localhost:5173` にアクセス
   - VS Codeのポートタブからワンクリックでアクセス可能

## 📦 含まれる機能

### 開発環境
- **Node.js 18** (LTS)
- **npm** パッケージマネージャー
- **Git** バージョン管理
- **oh-my-zsh** 快適なターミナル環境

### VS Code拡張機能
- **Vue.js開発支援**
  - Vue Language Features (Volar)
  - TypeScript Vue Plugin
- **TypeScript開発支援**
- **Tailwind CSS IntelliSense**
- **ESLint & Prettier**
- **GitLens**
- その他開発支援ツール

### 自動化機能
- 依存関係の自動インストール
- 開発サーバーの自動起動
- ポートフォワーディング設定
- ホットリロード対応

## 🛠️ 開発コマンド

```bash
# 開発サーバー起動（通常は自動起動済み）
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# テスト実行
npm run test

# 依存関係更新
npm update
```

## 📁 プロジェクト構成

```
todo-app/
├── .devcontainer/          # Dev Container設定
│   ├── devcontainer.json   # VS Code Dev Container設定
│   ├── docker-compose.yml  # Docker Compose設定
│   ├── Dockerfile          # コンテナイメージ定義
│   └── README.md           # このファイル
├── src/                    # ソースコード
│   ├── components/         # Vueコンポーネント
│   ├── composables/        # Composition API
│   ├── types/              # TypeScript型定義
│   ├── utils/              # ユーティリティ
│   ├── App.vue            # メインアプリ
│   └── main.ts            # エントリーポイント
├── public/                 # 静的ファイル
├── package.json           # 依存関係定義
├── vite.config.ts         # Vite設定
├── tailwind.config.js     # Tailwind CSS設定
└── tsconfig.json          # TypeScript設定
```

## 🔧 カスタマイズ

### ポート変更
`.devcontainer/devcontainer.json` の `forwardPorts` と `vite.config.ts` の `server.port` を変更してください。

### 拡張機能追加
`.devcontainer/devcontainer.json` の `extensions` 配列に追加したい拡張機能のIDを追加してください。

### Node.jsバージョン変更
`.devcontainer/Dockerfile` の `FROM node:18-bullseye` の部分を変更してください。

## 🐛 トラブルシューティング

### ポートが使用中の場合
```bash
# ポート5173が使用中の場合、別のポートを使用
npm run dev -- --port 5174
```

### キャッシュクリア
```bash
# npm キャッシュクリア
npm clean-install

# Vite キャッシュクリア
rm -rf node_modules/.vite
```

### コンテナの再構築
VS Codeコマンドパレットで "Dev Containers: Rebuild Container" を実行

## 📝 開発のヒント

1. **ホットリロード**: ファイル保存時に自動的にブラウザが更新されます
2. **TypeScript**: 型エラーは VS Code 上でリアルタイムに表示されます
3. **Tailwind CSS**: クラス名の補完とプレビューが利用できます
4. **デバッグ**: Vue DevTools をブラウザ拡張機能として使用してください

## 🎯 このDev Containerの特徴

- **即座に開発開始**: セットアップ不要で開発を始められます
- **一貫した環境**: チーム全員が同じ開発環境を使用できます
- **最適化済み**: Vue.js開発に必要なツールがすべて含まれています
- **拡張可能**: 簡単にカスタマイズや機能追加ができます
