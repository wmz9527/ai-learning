<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import ChatMessage from './ChatMessage.vue'

const store = useChatStore()
const inputText = ref('')
const messagesRef = ref<HTMLElement | null>(null)

watch(
  () => store.activeConversation?.messages.length,
  () => {
    nextTick(() => {
      if (messagesRef.value) {
        messagesRef.value.scrollTop = messagesRef.value.scrollHeight
      }
    })
  },
)

function handleSend() {
  const text = inputText.value.trim()
  if (!text || !store.activeId) return

  store.addMessage(store.activeId, 'user', text)
  inputText.value = ''

  // TODO: 接入大模型 API
  setTimeout(() => {
    store.addMessage(store.activeId!, 'assistant', `召唤师你好！收到你的问题：「${text}」\n\n正在接入海克斯科技 API...`)
  }, 500)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <main class="panel">
    <!-- 空状态 -->
    <div v-if="!store.activeConversation" class="empty-state">
      <div class="empty-brand">
        <span class="empty-icon">⚔</span>
        <h1>LOL 知识库</h1>
        <p>英雄联盟 AI 助手，随时回答你的问题</p>
      </div>
    </div>

    <!-- 对话区域 -->
    <template v-else>
      <div ref="messagesRef" class="messages">
        <ChatMessage
          v-for="msg in store.activeConversation.messages"
          :key="msg.id"
          :message="msg"
        />
        <div v-if="store.activeConversation.messages.length === 0" class="empty-chat">
          向海克斯 AI 提问任何英雄联盟问题
        </div>
      </div>
      <div class="input-area">
        <div class="input-wrapper">
          <textarea
            v-model="inputText"
            class="input-box"
            placeholder="输入你的问题，例如：亚索怎么打永恩？"
            rows="1"
            @keydown="handleKeydown"
          />
          <button
            class="btn-send"
            :disabled="!inputText.trim()"
            @click="handleSend"
          >
            发送
          </button>
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped>
.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #010a13;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-brand {
  text-align: center;
}

.empty-icon {
  font-size: 48px;
}

.empty-brand h1 {
  font-size: 28px;
  color: #c8aa6e;
  margin: 12px 0 8px;
  font-weight: 700;
  letter-spacing: 2px;
}

.empty-brand p {
  color: #5c5c5c;
  font-size: 15px;
}

.messages {
  flex: 1;
  overflow-y: auto;
}

.empty-chat {
  text-align: center;
  color: #5c5c5c;
  padding-top: 120px;
  font-size: 15px;
}

.input-area {
  padding: 16px 24px 24px;
}

.input-wrapper {
  display: flex;
  gap: 10px;
  max-width: 800px;
  margin: 0 auto;
}

.input-box {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #2d2d2d;
  border-radius: 4px;
  background: #191919;
  color: #f0e6d2;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  outline: none;
  line-height: 1.6;
  transition: border-color 0.15s;
}

.input-box::placeholder {
  color: #5c5c5c;
}

.input-box:focus {
  border-color: #c8aa6e;
}

.btn-send {
  padding: 10px 24px;
  background: #c8aa6e;
  color: #010a13;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
  letter-spacing: 1px;
}

.btn-send:hover:not(:disabled) {
  background: #d4b87a;
}

.btn-send:disabled {
  background: #2d2d2d;
  color: #5c5c5c;
  cursor: not-allowed;
}
</style>
