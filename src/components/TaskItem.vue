<template>
  <li class="group flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200" :class="{ 'opacity-75': task.completed }">
    <!-- チェックボックス -->
    <button
      @click="handleToggle"
      class="flex-shrink-0 w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center hover:border-primary-500 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
      :class="{
        'bg-primary-500 border-primary-500 shadow-sm': task.completed,
        'bg-white hover:bg-gray-50': !task.completed
      }"
      :aria-label="task.completed ? 'タスクを未完了にする' : 'タスクを完了にする'"
      :aria-pressed="task.completed"
    >
      <svg
        v-if="task.completed"
        class="w-3 h-3 text-white transition-all duration-200"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- タスクタイトル -->
    <span
      class="flex-1 text-sm md:text-base transition-all duration-300"
      :class="{
        'line-through text-gray-500': task.completed,
        'text-gray-900': !task.completed
      }"
    >
      {{ task.title }}
      <time
        v-if="task.completed"
        class="block text-xs text-gray-400 mt-1"
        :datetime="task.updatedAt.toISOString()"
      >
        完了: {{ formatDate(task.updatedAt) }}
      </time>
    </span>

    <!-- 削除ボタン -->
    <button
      @click="handleDelete"
      class="flex-shrink-0 w-6 h-6 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:opacity-100"
      :aria-label="'タスクを削除: ' + task.title"
    >
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Task } from '@/types'

// Props
interface Props {
  task: Task
}

const props = defineProps<Props>()

// Emits
interface Emits {
  toggleTask: [id: string]
  deleteTask: [id: string]
}

const emit = defineEmits<Emits>()

// Methods
const handleToggle = () => {
  emit('toggleTask', props.task.id)
}

const handleDelete = () => {
  if (confirm(`「${props.task.title}」を削除しますか？`)) {
    emit('deleteTask', props.task.id)
  }
}

// 日付フォーマット関数
const formatDate = (date: Date): string => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) {
    return 'たった今'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}分前`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours}時間前`
  } else {
    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
</script>
