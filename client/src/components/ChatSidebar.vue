<script setup lang="ts">
import { useChatStore } from '@/stores/chat'

const store = useChatStore()

function handleCreate() {
  store.createConversation()
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <span class="brand-icon">⚔</span>
      <span class="brand-text">LOL 知识库</span>
    </div>
    <div class="sidebar-header">
      <button class="btn-new" @click="handleCreate">+ 新提问</button>
    </div>
    <div class="sidebar-list">
      <div
        v-for="conv in store.sortedConversations"
        :key="conv.id"
        class="sidebar-item"
        :class="{ active: conv.id === store.activeId }"
        @click="store.selectConversation(conv.id)"
      >
        <span class="sidebar-item-title">{{ conv.title }}</span>
        <button
          class="btn-delete"
          @click.stop="store.deleteConversation(conv.id)"
        >
          x
        </button>
      </div>
      <div v-if="store.conversations.length === 0" class="sidebar-empty">
        暂无提问记录，点击上方按钮开始
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  min-width: 260px;
  height: 100vh;
  background: #191919;
  color: #f0e6d2;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 16px 12px;
  border-bottom: 1px solid #2d2d2d;
}

.brand-icon {
  font-size: 20px;
}

.brand-text {
  font-size: 16px;
  font-weight: 700;
  color: #c8aa6e;
  letter-spacing: 1px;
}

.sidebar-header {
  padding: 12px;
  border-bottom: 1px solid #2d2d2d;
}

.btn-new {
  width: 100%;
  padding: 10px;
  border: 1px solid #c8aa6e44;
  border-radius: 4px;
  background: #1e282d;
  color: #c8aa6e;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.btn-new:hover {
  background: #2a3a42;
  border-color: #c8aa6e;
}

.sidebar-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s;
  margin-bottom: 2px;
  border-left: 3px solid transparent;
}

.sidebar-item:hover {
  background: #252525;
}

.sidebar-item.active {
  background: #1e282d;
  border-left-color: #c8aa6e;
}

.sidebar-item-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: #a09b8c;
}

.sidebar-item.active .sidebar-item-title {
  color: #f0e6d2;
}

.btn-delete {
  background: none;
  border: none;
  color: #5c5c5c;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 6px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.15s, color 0.15s;
}

.sidebar-item:hover .btn-delete {
  opacity: 1;
}

.btn-delete:hover {
  color: #e84057;
}

.sidebar-empty {
  text-align: center;
  color: #5c5c5c;
  font-size: 13px;
  padding: 24px 0;
}
</style>
