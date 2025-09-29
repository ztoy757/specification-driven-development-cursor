import type { Task } from '@/types'

export class LocalStorageManager {
  private readonly key = 'todo-app-tasks'
  private readonly version = '1.0'
  private readonly versionKey = 'todo-app-version'

  /**
   * タスクをローカルストレージに保存
   */
  save(tasks: Task[]): void {
    try {
      const data = {
        version: this.version,
        timestamp: new Date().toISOString(),
        tasks: tasks.map(task => ({
          ...task,
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString()
        }))
      }
      
      localStorage.setItem(this.key, JSON.stringify(data))
      localStorage.setItem(this.versionKey, this.version)
      
      console.log(`[Storage] Saved ${tasks.length} tasks to localStorage`)
    } catch (error) {
      console.error('[Storage] Failed to save tasks:', error)
      throw new Error('タスクの保存に失敗しました')
    }
  }

  /**
   * ローカルストレージからタスクを読み込み
   */
  load(): Task[] {
    try {
      const data = localStorage.getItem(this.key)
      
      if (!data) {
        console.log('[Storage] No data found in localStorage')
        return []
      }

      const parsed = JSON.parse(data)
      
      // バージョンチェック
      if (parsed.version !== this.version) {
        console.warn('[Storage] Version mismatch, migrating data...')
        return this.migrateData(parsed)
      }

      // タスクデータの復元
      const tasks: Task[] = parsed.tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      }))

      console.log(`[Storage] Loaded ${tasks.length} tasks from localStorage`)
      return tasks
      
    } catch (error) {
      console.error('[Storage] Failed to load tasks:', error)
      
      // 破損したデータをクリア
      this.clear()
      return []
    }
  }

  /**
   * ローカルストレージをクリア
   */
  clear(): void {
    try {
      localStorage.removeItem(this.key)
      localStorage.removeItem(this.versionKey)
      console.log('[Storage] Cleared localStorage')
    } catch (error) {
      console.error('[Storage] Failed to clear localStorage:', error)
    }
  }

  /**
   * ストレージの使用可能性をチェック
   */
  isAvailable(): boolean {
    try {
      const testKey = '__storage_test__'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  }

  /**
   * ストレージ使用量を取得（概算）
   */
  getUsage(): { used: number; total: number; percentage: number } {
    try {
      const data = localStorage.getItem(this.key)
      const used = data ? new Blob([data]).size : 0
      const total = 5 * 1024 * 1024 // 5MB (一般的なブラウザの制限)
      
      return {
        used,
        total,
        percentage: Math.round((used / total) * 100)
      }
    } catch {
      return { used: 0, total: 0, percentage: 0 }
    }
  }

  /**
   * データの自動バックアップ
   */
  backup(): string | null {
    try {
      const data = localStorage.getItem(this.key)
      if (data) {
        const backup = {
          ...JSON.parse(data),
          backupTimestamp: new Date().toISOString()
        }
        return JSON.stringify(backup)
      }
      return null
    } catch (error) {
      console.error('[Storage] Failed to create backup:', error)
      return null
    }
  }

  /**
   * バックアップからの復元
   */
  restore(backupData: string): boolean {
    try {
      const data = JSON.parse(backupData)
      
      // バックアップデータの検証
      if (!data.tasks || !Array.isArray(data.tasks)) {
        throw new Error('Invalid backup data format')
      }

      localStorage.setItem(this.key, JSON.stringify(data))
      console.log('[Storage] Restored from backup')
      return true
      
    } catch (error) {
      console.error('[Storage] Failed to restore from backup:', error)
      return false
    }
  }

  /**
   * 古いバージョンのデータを新バージョンに移行
   */
  private migrateData(oldData: any): Task[] {
    try {
      console.log('[Storage] Migrating data from older version...')
      
      // 古いバージョンのデータ形式に対応
      if (Array.isArray(oldData)) {
        // v0.x format: 単純な配列
        return oldData.map((task: any, index: number) => ({
          id: task.id || `migrated-${index}`,
          title: task.title || '',
          description: task.description,
          completed: Boolean(task.completed),
          createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
          updatedAt: task.updatedAt ? new Date(task.updatedAt) : new Date()
        }))
      }

      // その他の形式は空で返す
      return []
      
    } catch (error) {
      console.error('[Storage] Data migration failed:', error)
      return []
    }
  }
}
