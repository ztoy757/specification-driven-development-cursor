# TODOアプリ 設計書

## 1. システム概要

### 1.1 アーキテクチャ概要
- **アプリケーション種別**: シングルページアプリケーション（SPA）
- **アーキテクチャパターン**: MVVMパターン（Model-View-ViewModel）
- **実行環境**: Webブラウザ（フロントエンドのみ）
- **データ永続化**: ブラウザローカルストレージ

### 1.2 技術スタック選定

#### 1.2.1 メイン技術
- **フレームワーク**: Vue.js 3 (Composition API)
  - 理由: 学習コストが低く、小規模アプリに適している
  - リアクティブなデータバインディング
  - コンポーネントベースの設計
- **言語**: TypeScript
  - 理由: 型安全性の確保、開発効率の向上
- **ビルドツール**: Vite
  - 理由: 高速な開発サーバー、モダンなビルド環境

#### 1.2.2 スタイリング
- **CSSフレームワーク**: Tailwind CSS
  - 理由: ユーティリティファーストで効率的なスタイリング
  - レスポンシブデザインの容易な実装
- **アイコン**: Heroicons
  - 理由: Tailwind CSSと親和性が高い

#### 1.2.3 状態管理
- **状態管理**: Vue 3 Composition API + Pinia（必要に応じて）
  - 理由: シンプルなアプリのため、最初はComposition APIで十分
  - 複雑になった場合のみPiniaを導入

#### 1.2.4 データ管理
- **ローカルストレージライブラリ**: 自作のシンプルなWrapper
- **データ形式**: JSON

## 2. システム設計

### 2.1 データモデル設計

#### 2.1.1 Taskエンティティ
```typescript
interface Task {
  id: string;           // ユニークID（UUID v4）
  title: string;        // タスクのタイトル
  description?: string; // タスクの詳細説明（任意）
  completed: boolean;   // 完了状態（true: 完了, false: 未完了）
  createdAt: Date;      // 作成日時
  updatedAt: Date;      // 更新日時
}
```

#### 2.1.2 AppStateモデル
```typescript
interface AppState {
  tasks: Task[];        // タスクの配列
  filter: TaskFilter;   // 表示フィルター
}

type TaskFilter = 'all' | 'active' | 'completed';
```

### 2.2 コンポーネント設計

#### 2.2.1 コンポーネント構成図
```
App.vue
├── Header.vue                 // アプリタイトル
├── TaskInput.vue             // タスク追加フォーム
├── TaskList.vue              // タスク一覧表示
│   └── TaskItem.vue          // 個別タスク
├── TaskFilter.vue            // フィルタータブ
└── Footer.vue                // 統計表示
```

#### 2.2.2 各コンポーネントの責務

**App.vue**
- アプリケーション全体の状態管理
- ローカルストレージとの連携
- 子コンポーネントへのデータ・イベントの橋渡し

**Header.vue**
- アプリケーションのタイトル表示
- レスポンシブ対応のヘッダーレイアウト

**TaskInput.vue**
- 新規タスク入力フォーム
- バリデーション（空文字チェック）
- タスク追加イベントの発行

**TaskList.vue**
- タスクの一覧表示
- フィルター状態に応じた表示制御
- 空状態の表示

**TaskItem.vue**
- 個別タスクの表示・操作
- 完了状態の切り替え
- 編集・削除機能
- インライン編集機能

**TaskFilter.vue**
- フィルタータブの表示
- アクティブタブの状態管理

**Footer.vue**
- 残りタスク数の表示
- 完了タスクの一括削除機能

### 2.3 状態管理設計

#### 2.3.1 状態管理パターン
- **提供方法**: Vue 3 Composition API
- **状態の単方向データフロー**: Parent → Child
- **イベント通知**: Child → Parent (emit)

#### 2.3.2 主要な状態・操作
```typescript
// composables/useTasks.ts
export function useTasks() {
  // 状態
  const tasks = ref<Task[]>([]);
  const filter = ref<TaskFilter>('all');
  
  // 算出プロパティ
  const filteredTasks = computed(() => { /* フィルタロジック */ });
  const activeTasks = computed(() => { /* アクティブタスク数 */ });
  const completedTasks = computed(() => { /* 完了タスク数 */ });
  
  // 操作
  const addTask = (title: string) => { /* タスク追加 */ };
  const updateTask = (id: string, updates: Partial<Task>) => { /* タスク更新 */ };
  const deleteTask = (id: string) => { /* タスク削除 */ };
  const toggleTask = (id: string) => { /* 完了状態切り替え */ };
  const clearCompleted = () => { /* 完了タスク一括削除 */ };
  
  return {
    tasks: readonly(tasks),
    filter,
    filteredTasks,
    activeTasks,
    completedTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted
  };
}
```

### 2.4 ローカルストレージ設計

#### 2.4.1 データ永続化仕様
- **キー名**: `todo-app-tasks`
- **データ形式**: JSON文字列
- **保存タイミング**: タスクの変更時（追加・更新・削除）
- **読み込みタイミング**: アプリケーション起動時

#### 2.4.2 ストレージWrapper
```typescript
// utils/storage.ts
export class LocalStorageManager {
  private readonly key = 'todo-app-tasks';
  
  save(tasks: Task[]): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }
  
  load(): Task[] {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load tasks:', error);
      return [];
    }
  }
  
  clear(): void {
    localStorage.removeItem(this.key);
  }
}
```

## 3. UI/UX設計

### 3.1 デザインシステム

#### 3.1.1 カラーパレット
- **プライマリ**: Blue (Tailwind blue-500: #3B82F6)
- **セカンダリ**: Gray (Tailwind gray-500: #6B7280)
- **成功**: Green (Tailwind green-500: #10B981)
- **警告**: Yellow (Tailwind yellow-500: #F59E0B)
- **エラー**: Red (Tailwind red-500: #EF4444)
- **背景**: White/Gray-50 (#F9FAFB)

#### 3.1.2 タイポグラフィ
- **見出し**: text-xl, text-lg (font-semibold)
- **本文**: text-base (font-normal)
- **キャプション**: text-sm (font-normal)

#### 3.1.3 スペーシング
- **コンポーネント間**: space-y-4 (16px)
- **要素間**: space-y-2 (8px)
- **パディング**: p-4 (16px), p-2 (8px)

### 3.2 レスポンシブデザイン

#### 3.2.1 ブレークポイント戦略
- **モバイル**: < 640px (デフォルト)
- **タブレット**: 640px ~ 1024px (sm:, md:)
- **デスクトップ**: > 1024px (lg:, xl:)

#### 3.2.2 レイアウト調整
- **モバイル**: 単一カラム、タッチフレンドリーなボタンサイズ
- **タブレット**: 単一カラム、若干の余白調整
- **デスクトップ**: 中央寄せ、最大幅制限 (max-w-2xl)

### 3.3 インタラクション設計

#### 3.3.1 ユーザー操作フロー
1. **タスク追加**: 入力フィールド → Enter or 追加ボタン → 即座にリストに反映
2. **タスク完了**: チェックボックスクリック → 即座に状態変更 → ストライクスルー表示
3. **タスク編集**: ダブルクリック → インライン編集モード → Enter or フォーカスアウトで確定
4. **タスク削除**: 削除ボタンクリック → 即座に削除（確認ダイアログなし）

#### 3.3.2 フィードバック
- **操作成功**: 即座に画面に反映（楽観的アップデート）
- **入力エラー**: リアルタイムバリデーション表示
- **読み込み状態**: 必要に応じてローディング表示

## 4. パフォーマンス設計

### 4.1 最適化戦略
- **仮想スクロール**: 当初は不要（1000タスク以下想定）
- **遅延読み込み**: 単一ページのため不要
- **バンドルサイズ**: Tree Shakingによる最適化
- **キャッシュ戦略**: ローカルストレージによる永続化

### 4.2 メモリ管理
- **リアクティブ参照**: 適切なref/reactiveの使い分け
- **イベントリスナー**: onUnmountedでの適切なクリーンアップ
- **ウォッチャー**: 必要最小限のwatcherの使用

## 5. セキュリティ設計

### 5.1 入力検証
- **XSS対策**: Vue.jsの自動エスケープを活用
- **入力サニタイゼーション**: HTMLタグの除去
- **文字数制限**: タスクタイトル最大500文字

### 5.2 データ保護
- **ローカルストレージ**: ドメイン内でのアクセス制限
- **データ暗号化**: 個人利用のため当初は不要

## 6. エラーハンドリング設計

### 6.1 エラー分類と対応
- **ストレージエラー**: コンソールログ + ユーザー通知
- **入力検証エラー**: リアルタイムフィードバック
- **予期しないエラー**: エラーバウンダリーによるキャッチ

### 6.2 エラー表示
- **トースト通知**: 一時的なエラーメッセージ
- **インライン表示**: フォーム検証エラー
- **フォールバック**: エラー時の代替表示

## 7. テスト設計

### 7.1 テスト戦略
- **単体テスト**: Vitest + Vue Test Utils
- **E2Eテスト**: Playwright（必要に応じて）
- **手動テスト**: ブラウザでの動作確認

### 7.2 テスト対象
- **コンポーネント**: 主要コンポーネントのレンダリング・操作
- **ユーティリティ**: ストレージWrapper、ヘルパー関数
- **統合**: タスクのCRUD操作フロー

## 8. ディレクトリ構成

```
todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── TaskInput.vue
│   │   ├── TaskList.vue
│   │   ├── TaskItem.vue
│   │   ├── TaskFilter.vue
│   │   └── Footer.vue
│   ├── composables/
│   │   └── useTasks.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── storage.ts
│   │   └── helpers.ts
│   ├── App.vue
│   └── main.ts
├── tests/
│   ├── components/
│   └── utils/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 9. 開発環境設定

### 9.1 必要なパッケージ
```json
{
  "dependencies": {
    "vue": "^3.3.0",
    "@vueuse/core": "^10.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.3.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vitest": "^0.32.0",
    "@vue/test-utils": "^2.4.0"
  }
}
```

### 9.2 設定ファイル
- **Vite設定**: TypeScript、Vue、開発サーバー設定
- **Tailwind設定**: カスタムカラー、レスポンシブ設定
- **TypeScript設定**: 厳密な型チェック設定

---

**文書作成日**: 2025年9月29日  
**作成者**: 開発者  
**バージョン**: 1.0
