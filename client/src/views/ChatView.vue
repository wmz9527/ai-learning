<script setup lang="ts">
import ChatSidebar from '@/components/ChatSidebar.vue'
import ChatPanel from '@/components/ChatPanel.vue'
</script>

<template>
  <div class="app-layout">
    <ChatSidebar />
    <ChatPanel />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>
