import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Conversation, Message } from '@/types/chat'

let idCounter = 0
function nextId(): string {
  return `${Date.now()}-${++idCounter}`
}

export const useChatStore = defineStore('chat', () => {
  const conversations = ref<Conversation[]>([])
  const activeId = ref<string | null>(null)

  const activeConversation = computed(() =>
    conversations.value.find((c) => c.id === activeId.value) ?? null,
  )

  const sortedConversations = computed(() =>
    [...conversations.value].sort((a, b) => b.createdAt - a.createdAt),
  )

  function createConversation(): Conversation {
    const conv: Conversation = {
      id: nextId(),
      title: '新提问',
      messages: [],
      createdAt: Date.now(),
    }
    conversations.value.push(conv)
    activeId.value = conv.id
    return conv
  }

  function deleteConversation(id: string) {
    conversations.value = conversations.value.filter((c) => c.id !== id)
    if (activeId.value === id) {
      activeId.value = conversations.value[0]?.id ?? null
    }
  }

  function selectConversation(id: string) {
    activeId.value = id
  }

  function addMessage(convId: string, role: 'user' | 'assistant', content: string) {
    const conv = conversations.value.find((c) => c.id === convId)
    if (!conv) return
    const msg: Message = {
      id: nextId(),
      role,
      content,
      timestamp: Date.now(),
    }
    conv.messages.push(msg)
    if (conv.title === '新提问' && role === 'user') {
      conv.title = content.slice(0, 30) + (content.length > 30 ? '...' : '')
    }
  }

  return {
    conversations,
    activeId,
    activeConversation,
    sortedConversations,
    createConversation,
    deleteConversation,
    selectConversation,
    addMessage,
  }
})
