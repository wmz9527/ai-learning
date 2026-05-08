<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const activeTab = ref<'login' | 'register'>('login')
const loading = ref(false)
const errorMsg = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})

function switchTab(tab: 'login' | 'register') {
  activeTab.value = tab
  errorMsg.value = ''
  form.password = ''
  form.confirmPassword = ''
}

async function handleSubmit() {
  errorMsg.value = ''

  if (!form.username.trim()) {
    errorMsg.value = '请输入召唤师名称'
    return
  }
  if (form.username.trim().length < 2) {
    errorMsg.value = '召唤师名称至少 2 个字符'
    return
  }
  if (!form.password) {
    errorMsg.value = '请输入符文密语'
    return
  }
  if (form.password.length < 6) {
    errorMsg.value = '符文密语至少 6 位'
    return
  }
  if (activeTab.value === 'register' && form.password !== form.confirmPassword) {
    errorMsg.value = '两次输入的符文密语不一致'
    return
  }

  loading.value = true
  try {
    if (activeTab.value === 'login') {
      await auth.login(form.username.trim(), form.password)
      router.push({ name: 'Chat' })
    } else {
      await auth.register(form.username.trim(), form.password)
      router.push({ name: 'Chat' })
    }
  } catch (err: unknown) {
    const msg =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? '连接服务器失败，请确认后端已启动'
    errorMsg.value = msg
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="bg-glow" />

    <div class="login-card">
      <!-- 标题 -->
      <div class="card-header">
        <div class="brand-icon">⚔</div>
        <h1 class="brand-title">LOL 知识库</h1>
        <p class="brand-sub">海克斯科技 AI 助手</p>
      </div>

      <!-- Tab 切换 -->
      <div class="tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'login' }"
          @click="switchTab('login')"
        >
          登录
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'register' }"
          @click="switchTab('register')"
        >
          注册
        </button>
        <div class="tab-indicator" :class="activeTab" />
      </div>

      <!-- 表单 -->
      <form class="form" @submit.prevent="handleSubmit">
        <div class="field">
          <label class="field-label">召唤师名称</label>
          <input
            v-model="form.username"
            class="field-input"
            type="text"
            placeholder="输入你的召唤师名称"
            maxlength="16"
            autocomplete="username"
          />
        </div>

        <div class="field">
          <label class="field-label">符文密语</label>
          <div class="password-wrap">
            <input
              v-model="form.password"
              class="field-input"
              :type="showPassword ? 'text' : 'password'"
              placeholder="输入你的符文密语"
              maxlength="32"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-pwd"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '隐藏' : '显示' }}
            </button>
          </div>
        </div>

        <div v-if="activeTab === 'register'" class="field">
          <label class="field-label">确认符文密语</label>
          <div class="password-wrap">
            <input
              v-model="form.confirmPassword"
              class="field-input"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="再次输入符文密语"
              maxlength="32"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="toggle-pwd"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              {{ showConfirmPassword ? '隐藏' : '显示' }}
            </button>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>

        <!-- 提交按钮 -->
        <button class="btn-submit" type="submit" :disabled="loading">
          <span v-if="loading" class="spinner" />
          <span v-else>{{ activeTab === 'login' ? '进入峡谷' : '加入召唤师峡谷' }}</span>
        </button>
      </form>

      <!-- 底部切换 -->
      <p class="footer-tip">
        {{ activeTab === 'login' ? '还没有账号？' : '已有账号？' }}
        <button
          class="link"
          @click="switchTab(activeTab === 'login' ? 'register' : 'login')"
        >
          {{ activeTab === 'login' ? '立即注册' : '立即登录' }}
        </button>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* ===== 页面背景 ===== */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #010a13;
  overflow: hidden;
  position: relative;
}

/* 背景辉光 */
.bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(
    ellipse at center,
    rgba(10, 200, 185, 0.06) 0%,
    rgba(200, 170, 110, 0.04) 40%,
    transparent 70%
  );
  pointer-events: none;
  animation: bgPulse 4s ease-in-out infinite;
}

@keyframes bgPulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
}

/* ===== 卡片 ===== */
.login-card {
  position: relative;
  width: 420px;
  max-width: 92vw;
  background: rgba(10, 20, 34, 0.85);
  border: 1px solid rgba(200, 170, 110, 0.12);
  border-radius: 8px;
  padding: 40px 36px 32px;
  animation: cardEnter 0.6s ease-out;
  backdrop-filter: blur(8px);
  box-shadow:
    0 0 60px rgba(200, 170, 110, 0.05),
    0 0 120px rgba(10, 200, 185, 0.03);
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ===== 标题区 ===== */
.card-header {
  text-align: center;
  margin-bottom: 28px;
}

.brand-icon {
  font-size: 36px;
  margin-bottom: 4px;
}

.brand-title {
  font-size: 26px;
  font-weight: 700;
  color: #c8aa6e;
  letter-spacing: 3px;
  margin-bottom: 6px;
}

.brand-sub {
  font-size: 13px;
  color: #0ac8b9;
  letter-spacing: 2px;
}

/* ===== Tab 切换 ===== */
.tabs {
  display: flex;
  position: relative;
  margin-bottom: 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.tab {
  flex: 1;
  padding: 10px 0;
  background: none;
  border: none;
  color: #5c5c5c;
  font-size: 15px;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
  font-family: inherit;
}

.tab.active {
  color: #c8aa6e;
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c8aa6e, transparent);
  transition: left 0.3s ease, width 0.3s ease;
}

.tab-indicator.login {
  left: 0;
  width: 50%;
}

.tab-indicator.register {
  left: 50%;
  width: 50%;
}

/* ===== 表单字段 ===== */
.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 13px;
  color: #7b8b9e;
  font-weight: 500;
}

.field-input {
  width: 100%;
  padding: 11px 14px;
  background: rgba(10, 20, 34, 0.8);
  border: 1px solid rgba(200, 170, 110, 0.15);
  border-radius: 4px;
  color: #f0e6d2;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.field-input::placeholder {
  color: #3a4050;
}

.field-input:focus {
  border-color: rgba(10, 200, 185, 0.6);
  box-shadow: 0 0 12px rgba(10, 200, 185, 0.12);
}

.password-wrap {
  position: relative;
}

.password-wrap .field-input {
  padding-right: 60px;
}

.toggle-pwd {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #5c5c5c;
  font-size: 12px;
  cursor: pointer;
  padding: 6px 10px;
  font-family: inherit;
  transition: color 0.2s;
}

.toggle-pwd:hover {
  color: #c8aa6e;
}

/* ===== 错误提示 ===== */
.error-msg {
  background: rgba(232, 64, 87, 0.12);
  border: 1px solid rgba(232, 64, 87, 0.25);
  color: #e84057;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 4px;
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-6px); }
  40%      { transform: translateX(6px); }
  60%      { transform: translateX(-4px); }
  80%      { transform: translateX(4px); }
}

/* ===== 提交按钮 ===== */
.btn-submit {
  width: 100%;
  padding: 13px;
  margin-top: 4px;
  background: linear-gradient(180deg, rgba(200, 170, 110, 0.9), rgba(180, 145, 80, 0.9));
  border: 1px solid rgba(200, 170, 110, 0.4);
  border-radius: 4px;
  color: #010a13;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 2px;
  transition: background 0.3s, box-shadow 0.3s;
  animation: btnGlow 2.5s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(180deg, #d4b87a, #c8aa6e);
  box-shadow: 0 0 24px rgba(200, 170, 110, 0.3);
}

.btn-submit:disabled {
  background: #2a2a2a;
  border-color: #2a2a2a;
  color: #555;
  cursor: not-allowed;
  animation: none;
}

@keyframes btnGlow {
  0%, 100% { box-shadow: 0 0 8px rgba(200, 170, 110, 0.2); }
  50%      { box-shadow: 0 0 20px rgba(200, 170, 110, 0.4), 0 0 40px rgba(10, 200, 185, 0.08); }
}

/* ===== Loading 旋转器 ===== */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(1, 10, 19, 0.3);
  border-top-color: #010a13;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== 底部提示 ===== */
.footer-tip {
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  color: #5c5c5c;
}

.link {
  background: none;
  border: none;
  color: #0ac8b9;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  transition: color 0.2s;
}

.link:hover {
  color: #c8aa6e;
}
</style>
