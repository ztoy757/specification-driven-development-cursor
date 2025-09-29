# TODOアプリ

Vue.js 3 + TypeScript + Tailwind CSSで構築されたシンプルなTODOタスク管理アプリケーションです。

## 機能

- タスクの追加・編集・削除
- タスクの完了状態管理
- タスクのフィルタリング（すべて・アクティブ・完了済み）
- ローカルストレージによるデータ永続化
- レスポンシブデザイン

## 技術スタック

- **フロントエンド**: Vue.js 3 (Composition API)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **ビルドツール**: Vite
- **テスト**: Vitest + Vue Test Utils

## 開発

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
