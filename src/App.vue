<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <div class="max-w-2xl mx-auto py-8 px-4">
      <!-- ヘッダー -->
      <Header />
      
      <!-- メインコンテンツ -->
      <main class="bg-white rounded-lg shadow-sm border p-6">
        <!-- ローディング状態 -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <p class="mt-2 text-gray-500">データを読み込んでいます...</p>
        </div>
        
        <!-- エラー状態 -->
        <div v-else-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center gap-2 text-red-700">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">エラーが発生しました</span>
          </div>
          <p class="mt-1 text-red-600 text-sm">{{ error }}</p>
        </div>
        
        <!-- 通常の表示 -->
        <template v-else>
          <!-- タスク入力 -->
          <TaskInput
            @add-task="handleAddTask"
            :disabled="false"
          />
          
          <!-- フィルター -->
          <TaskFilter
            :current-filter="filter"
            :total-tasks="totalTasks"
            :active-tasks="activeTasks"
            :completed-tasks="completedTasks"
            @update-filter="handleUpdateFilter"
          />
          
          <!-- タスクリスト -->
          <TaskList
            :tasks="filteredTasks"
            @toggle-task="handleToggleTask"
            @delete-task="handleDeleteTask"
          />
          
          <!-- フッター -->
          <Footer
            :active-tasks="activeTasks"
            :completed-tasks="completedTasks"
            @clear-completed="handleClearCompleted"
          />
        </template>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import TaskInput from './components/TaskInput.vue'
import TaskFilter from './components/TaskFilter.vue'
import TaskList from './components/TaskList.vue'
import Footer from './components/Footer.vue'
import { useTasks } from './composables/useTasks'

// タスク管理機能
const {
  filteredTasks,
  filter,
  activeTasks,
  completedTasks,
  totalTasks,
  isLoading,
  error,
  addTask,
  toggleTask,
  deleteTask,
  clearCompleted,
  setFilter
} = useTasks()

// Event handlers
const handleAddTask = (title: string) => {
  addTask(title)
}

const handleToggleTask = (id: string) => {
  toggleTask(id)
}

const handleDeleteTask = (id: string) => {
  deleteTask(id)
}

const handleUpdateFilter = (newFilter: typeof filter.value) => {
  setFilter(newFilter)
}

const handleClearCompleted = () => {
  clearCompleted()
}
</script>
