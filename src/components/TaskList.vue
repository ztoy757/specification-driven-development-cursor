<template>
  <div class="mb-6">
    <!-- タスクリスト -->
    <div v-if="tasks.length > 0">
      <transition-group
        name="task-list"
        tag="ul"
        class="space-y-2"
      >
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle-task="$emit('toggleTask', $event)"
          @delete-task="$emit('deleteTask', $event)"
        />
      </transition-group>
    </div>

    <!-- 空状態 -->
    <div
      v-else
      class="text-center py-12 text-gray-500"
    >
      <div class="mb-4">
        <svg
          class="mx-auto w-12 h-12 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <p class="text-base font-medium mb-2">タスクがありません</p>
      <p class="text-sm">新しいタスクを追加して始めましょう</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import type { Task } from '@/types'

// Props
interface Props {
  tasks: Task[]
}

defineProps<Props>()

// Emits
interface Emits {
  toggleTask: [id: string]
  deleteTask: [id: string]
}

defineEmits<Emits>()
</script>

<style scoped>
/* タスクリストアニメーション */
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}

.task-list-move {
  transition: transform 0.3s ease;
}
</style>
