<template>
  <view class="activation-container">
    <view class="activation-content">
      <view class="logo-section">
        <view class="logo-icon">🛵</view>
        <text class="app-name">电动车管家</text>
        <text class="app-slogan">您的电动车贴心助手</text>
      </view>

      <view class="form-section">
        <view class="input-wrapper">
          <input 
            class="activation-input"
            v-model="activationCode"
            type="text"
            placeholder="请输入激活码"
            maxlength="20"
            @confirm="handleActivate"
          />
        </view>

        <button 
          class="activate-btn"
          :class="{ 'activate-btn-disabled': !canActivate }"
          :disabled="!canActivate || activating"
          @click="handleActivate"
        >
          {{ activating ? '激活中...' : '立即激活' }}
        </button>

        <view class="tips-section">
          <text class="tips-title">温馨提示</text>
          <text class="tips-text">• 首次激活需选择功能模块</text>
          <text class="tips-text">• 临时激活码有效期24小时</text>
          <text class="tips-text">• 永久激活码可长期使用</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, computed } from 'vue'
import { useActivationStore } from '@/store/modules/activation'

export default {
  setup() {
    const activationStore = useActivationStore()
    const activationCode = ref('')
    const activating = ref(false)

    const canActivate = computed(() => {
      return activationCode.value.trim().length > 0
    })

    const handleActivate = async () => {
      if (!canActivate.value || activating.value) {
        return
      }

      activating.value = true

      try {
        const result = await activationStore.activate(activationCode.value.trim())

        if (result.success) {
          uni.showToast({
            title: result.message,
            icon: 'success',
            duration: 2000
          })

          setTimeout(() => {
            uni.redirectTo({
              url: '/pages/moduleSelect/index?firstTime=true'
            })
          }, 2000)
        } else {
          uni.showToast({
            title: result.message,
            icon: 'none',
            duration: 2000
          })
        }
      } catch (error) {
        console.error('Activation error:', error)
        uni.showToast({
          title: '激活失败，请重试',
          icon: 'none'
        })
      } finally {
        activating.value = false
      }
    }

    return {
      activationCode,
      activating,
      canActivate,
      handleActivate
    }
  }
}
</script>

<style lang="scss" scoped>
.activation-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48rpx;
}

.activation-content {
  width: 100%;
  max-width: 600rpx;
}

.logo-section {
  text-align: center;
  margin-bottom: 80rpx;
}

.logo-icon {
  font-size: 120rpx;
  margin-bottom: 32rpx;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20rpx);
  }
}

.app-name {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #FFFFFF;
  margin-bottom: 16rpx;
}

.app-slogan {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.form-section {
  background-color: #FFFFFF;
  border-radius: 32rpx;
  padding: 48rpx 40rpx;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.15);
}

.input-wrapper {
  margin-bottom: 32rpx;
}

.activation-input {
  width: 100%;
  height: 96rpx;
  background-color: #F5F5F5;
  border-radius: 16rpx;
  padding: 0 32rpx;
  font-size: 32rpx;
  color: #333333;
  border: 2rpx solid transparent;
  transition: all 0.3s;
}

.activation-input:focus {
  background-color: #FFFFFF;
  border-color: #007AFF;
}

.activate-btn {
  width: 100%;
  height: 96rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: bold;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.activate-btn:active {
  opacity: 0.8;
  transform: scale(0.98);
}

.activate-btn-disabled {
  background: #CCCCCC !important;
}

.tips-section {
  margin-top: 48rpx;
  padding-top: 32rpx;
  border-top: 1rpx solid #E5E5E5;
}

.tips-title {
  display: block;
  font-size: 28rpx;
  color: #666666;
  font-weight: bold;
  margin-bottom: 16rpx;
}

.tips-text {
  display: block;
  font-size: 26rpx;
  color: #999999;
  line-height: 44rpx;
  margin-bottom: 8rpx;
}
</style>