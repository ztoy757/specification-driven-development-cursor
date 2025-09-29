<template>
  <div class="mb-6">
    <div class="flex border border-gray-300 rounded-lg overflow-hidden">
      <button
        v-for="option in filterOptions"
        :key="option.value"
        @click="handleFilterChange(option.value)"
        class="flex-1 px-4 py-2 text-sm font-medium transition-colors"
        :class="{
          'bg-primary-500 text-white': currentFilter === option.value,
          'bg-white text-gray-700 hover:bg-gray-50': currentFilter !== option.value
        }"
        :aria-label="`${option.label}のタスクを表示`"
      >
        {{ option.label }}
        <span
          v-if="option.count !== undefined"
          class="ml-2 px-2 py-1 text-xs rounded-full"
          :class="{
            'bg-white/20 text-white': currentFilter === option.value,
            'bg-gray-200 text-gray-600': currentFilter !== option.value
          }"
        >
          {{ option.count }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TaskFilter } from '@/types'

// Props
interface Props {
  currentFilter: TaskFilter
  totalTasks: number
  activeTasks: number
  completedTasks: number
}

const props = defineProps<Props>()

// Emits
interface Emits {
  updateFilter: [filter: TaskFilter]
}

const emit = defineEmits<Emits>()

// Computed
const filterOptions = computed(() => [
  {
    value: 'all' as TaskFilter,
    label: 'すべて',
    count: props.totalTasks
  },
  {
    value: 'active' as TaskFilter,
    label: 'アクティブ',
    count: props.activeTasks
  },
  {
    value: 'completed' as TaskFilter,
    label: '完了済み',
    count: props.completedTasks
  }
])

// Methods
const handleFilterChange = (filter: TaskFilter) => {
  emit('updateFilter', filter)
}
</script>
