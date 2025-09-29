// タスクの型定義
export interface Task {
  id: string;           // ユニークID（UUID v4）
  title: string;        // タスクのタイトル
  description?: string; // タスクの詳細説明（任意）
  completed: boolean;   // 完了状態（true: 完了, false: 未完了）
  createdAt: Date;      // 作成日時
  updatedAt: Date;      // 更新日時
}

// タスクフィルターの型定義
export type TaskFilter = 'all' | 'active' | 'completed';

// アプリケーション状態の型定義
export interface AppState {
  tasks: Task[];        // タスクの配列
  filter: TaskFilter;   // 表示フィルター
}
