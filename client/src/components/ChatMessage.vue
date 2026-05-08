<script setup lang="ts">
import type { Message } from '@/types/chat'

defineProps<{
  message: Message
}>()
</script>

<template>
  <div class="message" :class="message.role">
    <div class="message-avatar">
      {{ message.role === 'user' ? '召唤师' : '海克斯AI' }}
    </div>
    <div class="message-body">
      <div class="message-role-label">
        {{ message.role === 'user' ? '你' : 'LOL 知识库' }}
      </div>
      <div class="message-content">{{ message.content }}</div>
    </div>
  </div>
</template>

<style scoped>
.message {
  display: flex;
  gap: 14px;
  padding: 20px 0;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.message.assistant {
  background: #1a1a2e;
  padding: 20px 24px;
  margin: 0;
  max-width: none;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: 1px;
}

.message.user .message-avatar {
  background: #c8aa6e;
  color: #010a13;
}

.message.assistant .message-avatar {
  background: #0ac8b9;
  color: #010a13;
}

.message-body {
  flex: 1;
  min-width: 0;
}

.message-role-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #7b7b7b;
}

.message-content {
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
  color: #e0d8c8;
}
</style>
