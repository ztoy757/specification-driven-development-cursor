# TODOアプリ

Vue.js 3 + TypeScript + Tailwind CSSで構築されたシンプルなTODOタスク管理アプリケーションです。

## 🚀 クイックスタート

### Dev Container（推奨）

このプロジェクトはDev Containerに対応しており、環境構築不要で即座に開発を始められます。

**前提条件:**
- Docker Desktop
- Visual Studio Code
- Dev Containers 拡張機能

**起動方法:**
1. VS Codeでプロジェクトを開く
2. 右下の通知 "Reopen in Container" をクリック
3. 自動でコンテナがビルドされ、開発サーバーが起動します
4. `http://localhost:5173` でアプリにアクセス

詳細は [.devcontainer/README.md](.devcontainer/README.md) をご覧ください。

### ローカル開発

Node.js 18以上が必要です。

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# テスト実行
npm run test
```

## ✨ 機能

- 📝 タスクの追加・編集・削除
- ✅ タスクの完了状態管理
- 🔍 タスクのフィルタリング（すべて・アクティブ・完了済み）
- 💾 ローカルストレージによるデータ永続化
- 📱 レスポンシブデザイン（PC・タブレット・モバイル対応）
- ⚡ スムーズなアニメーション効果
- 🎨 モダンなUI/UX

## 🛠️ 技術スタック

- **フロントエンド**: Vue.js 3 (Composition API)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **ビルドツール**: Vite
- **テスト**: Vitest + Vue Test Utils
- **開発環境**: Dev Container対応

## プロジェクト構成

```
todo-app/
├── src/
│   ├── components/     # Vueコンポーネント
│   ├── composables/    # Vue Composition API
│   ├── types/          # TypeScript型定義
│   ├── utils/          # ユーティリティ関数
│   └── App.vue         # メインアプリコンポーネント
├── .cursor_workflow/   # 設計・実装計画書
└── README.md
```

## 設計ドキュメント

- [要件定義書](.cursor_workflow/requirements.md)
- [設計書](.cursor_workflow/design.md)
- [実装計画書](.cursor_workflow/implementations.md)
