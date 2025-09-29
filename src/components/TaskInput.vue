<template>
  <div class="mb-6">
    <form @submit.prevent="handleSubmit" class="space-y-3">
      <div class="flex gap-2">
        <div class="flex-1 relative">
          <input
            v-model="inputValue"
            type="text"
            placeholder="新しいタスクを入力..."
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base transition-colors"
            :class="{
              'border-red-300 focus:ring-red-500': error,
              'border-gray-300': !error
            }"
            :disabled="disabled"
            @input="clearError"
            autocomplete="off"
            maxlength="500"
          />
          
          <!-- 文字数カウント -->
          <div 
            v-if="inputValue.length > 0"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
          >
            {{ inputValue.length }}/500
          </div>
        </div>
        
        <button
          type="submit"
          :disabled="disabled || !isValidInput"
          class="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base font-medium transition-colors"
        >
          追加
        </button>
      </div>
      
      <!-- エラーメッセージ -->
      <div v-if="error" class="text-red-600 text-sm flex items-center gap-1">
        <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        {{ error }}
      </div>
      
      <!-- 成功メッセージ -->
      <div v-if="successMessage" class="text-green-600 text-sm flex items-center gap-1">
        <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        {{ successMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
interface Props {
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false
})

// Emits
interface Emits {
  addTask: [title: string]
}

const emit = defineEmits<Emits>()

// State
const inputValue = ref('')
const error = ref('')
const successMessage = ref('')

// Computed
const isValidInput = computed(() => {
  const trimmed = inputValue.value.trim()
  return trimmed.length > 0 && trimmed.length <= 500
})

// Methods
const handleSubmit = () => {
  const title = inputValue.value.trim()
  
  // バリデーション
  if (!title) {
    error.value = 'タスクタイトルを入力してください'
    return
  }
  
  if (title.length > 500) {
    error.value = 'タスクタイトルは500文字以内で入力してください'
    return
  }
  
  // HTMLタグの除去（XSS対策）
  const sanitizedTitle = title.replace(/<[^>]*>/g, '')
  
  if (!sanitizedTitle) {
    error.value = '有効なタスクタイトルを入力してください'
    return
  }
  
  try {
    emit('addTask', sanitizedTitle)
    inputValue.value = ''
    error.value = ''
    
    // 成功メッセージを表示
    successMessage.value = 'タスクを追加しました'
    setTimeout(() => {
      successMessage.value = ''
    }, 2000)
  } catch (err) {
    error.value = 'タスクの追加に失敗しました'
    console.error('Failed to add task:', err)
  }
}

// エラーをクリア
const clearError = () => {
  if (error.value) {
    error.value = ''
  }
}
</script>
