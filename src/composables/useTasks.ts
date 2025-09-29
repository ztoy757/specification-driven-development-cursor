import { ref, computed, readonly, watch, onMounted } from 'vue'
import type { Task, TaskFilter } from '@/types'
import { LocalStorageManager } from '@/utils/storage'

// UUID v4 生成関数
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function useTasks() {
  // Storage manager
  const storage = new LocalStorageManager()
  
  // State
  const tasks = ref<Task[]>([])
  const filter = ref<TaskFilter>('all')
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  // 初期データの作成（ストレージが空の場合）
  const createInitialData = (): Task[] => [
    {
      id: generateUUID(),
      title: 'Vue.js 3の学習',
      description: 'Composition APIとTypeScriptの組み合わせを学ぶ',
      completed: false,
      createdAt: new Date('2025-09-29T09:00:00'),
      updatedAt: new Date('2025-09-29T09:00:00')
    },
    {
      id: generateUUID(),
      title: 'Tailwind CSSでスタイリング',
      description: 'レスポンシブデザインを実装する',
      completed: true,
      createdAt: new Date('2025-09-29T08:00:00'),
      updatedAt: new Date('2025-09-29T10:00:00')
    },
    {
      id: generateUUID(),
      title: 'TODOアプリの設計',
      description: 'コンポーネント設計とデータフローを考える',
      completed: true,
      createdAt: new Date('2025-09-28T15:00:00'),
      updatedAt: new Date('2025-09-29T08:30:00')
    },
    {
      id: generateUUID(),
      title: 'ローカルストレージ実装',
      description: 'データ永続化機能を追加する',
      completed: false,
      createdAt: new Date('2025-09-29T11:00:00'),
      updatedAt: new Date('2025-09-29T11:00:00')
    }
  ]

  // Computed properties
  const filteredTasks = computed(() => {
    switch (filter.value) {
      case 'active':
        return tasks.value.filter(task => !task.completed)
      case 'completed':
        return tasks.value.filter(task => task.completed)
      default:
        return tasks.value
    }
  })

  const activeTasks = computed(() => 
    tasks.value.filter(task => !task.completed).length
  )

  const completedTasks = computed(() => 
    tasks.value.filter(task => task.completed).length
  )

  const totalTasks = computed(() => tasks.value.length)

  // Methods
  const addTask = (title: string, description?: string) => {
    const now = new Date()
    const newTask: Task = {
      id: generateUUID(),
      title: title.trim(),
      description: description?.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now
    }
    
    // 新しいタスクを配列の先頭に追加
    tasks.value.unshift(newTask)
  }

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        ...updates,
        updatedAt: new Date()
      }
    }
  }

  const deleteTask = (id: string) => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  const toggleTask = (id: string) => {
    const task = tasks.value.find(task => task.id === id)
    if (task) {
      updateTask(id, { completed: !task.completed })
    }
  }

  const clearCompleted = () => {
    tasks.value = tasks.value.filter(task => !task.completed)
  }

  const setFilter = (newFilter: TaskFilter) => {
    filter.value = newFilter
  }

  // データの保存
  const saveTasks = async () => {
    try {
      error.value = null
      storage.save(tasks.value)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'データの保存に失敗しました'
      console.error('Failed to save tasks:', err)
    }
  }

  // データの読み込み
  const loadTasks = async () => {
    try {
      isLoading.value = true
      error.value = null

      if (!storage.isAvailable()) {
        throw new Error('ローカルストレージが利用できません')
      }

      const loadedTasks = storage.load()
      
      if (loadedTasks.length === 0) {
        // 初回起動時は初期データを設定
        tasks.value = createInitialData()
        await saveTasks()
      } else {
        tasks.value = loadedTasks
      }
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'データの読み込みに失敗しました'
      console.error('Failed to load tasks:', err)
      
      // エラー時は初期データを使用
      tasks.value = createInitialData()
    } finally {
      isLoading.value = false
    }
  }

  // データのクリア
  const clearAllData = async () => {
    try {
      storage.clear()
      tasks.value = []
      error.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'データのクリアに失敗しました'
    }
  }

  // データのエクスポート
  const exportData = () => {
    try {
      const backup = storage.backup()
      if (backup) {
        const blob = new Blob([backup], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      error.value = 'データのエクスポートに失敗しました'
    }
  }

  // データのインポート
  const importData = (fileContent: string) => {
    try {
      if (storage.restore(fileContent)) {
        loadTasks()
        return true
      }
      return false
    } catch (err) {
      error.value = 'データのインポートに失敗しました'
      return false
    }
  }

  // 初期化処理
  onMounted(() => {
    loadTasks()
  })

  // タスクの変更を監視して自動保存
  watch(
    tasks,
    () => {
      if (!isLoading.value) {
        saveTasks()
      }
    },
    { deep: true }
  )

  return {
    // readonly state
    tasks: readonly(tasks),
    filter: readonly(filter),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // computed
    filteredTasks,
    activeTasks,
    completedTasks,
    totalTasks,
    
    // methods
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    setFilter,
    
    // storage methods
    loadTasks,
    saveTasks,
    clearAllData,
    exportData,
    importData
  }
}
