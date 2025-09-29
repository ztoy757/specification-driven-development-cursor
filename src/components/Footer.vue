<template>
  <footer class="mt-6 pt-4 border-t border-gray-200">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <!-- 統計情報 -->
      <div class="text-sm text-gray-600">
        <span v-if="activeTasks === 1">1 個のタスクが残っています</span>
        <span v-else>{{ activeTasks }} 個のタスクが残っています</span>
      </div>

      <!-- 一括削除ボタン -->
      <button
        v-if="completedTasks > 0"
        @click="handleClearCompleted"
        class="text-sm text-gray-600 hover:text-red-600 transition-colors"
      >
        完了済みタスクを削除 ({{ completedTasks }})
      </button>
    </div>

    <!-- アプリ情報 -->
    <div class="mt-4 pt-4 border-t border-gray-100 text-center">
      <p class="text-xs text-gray-400">
        TODOアプリ - Vue.js 3 + TypeScript + Tailwind CSS
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Props
interface Props {
  activeTasks: number
  completedTasks: number
}

defineProps<Props>()

// Emits
interface Emits {
  clearCompleted: []
}

const emit = defineEmits<Emits>()

// Methods
const handleClearCompleted = () => {
  if (confirm('完了済みのタスクをすべて削除しますか？')) {
    emit('clearCompleted')
  }
}
</script>
