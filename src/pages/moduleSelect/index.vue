<template>
  <view class="module-select-container">
    <view class="header-section">
      <text class="header-title">选择功能模块</text>
      <text class="header-subtitle">至少选择一个模块</text>
    </view>

    <view class="modules-list">
      <view 
        v-for="module in modules" 
        :key="module.key"
        class="module-item"
        :class="{ 'module-item-active': selectedModules.includes(module.key) }"
        @click="toggleModule(module.key)"
      >
        <view class="module-icon">{{ module.icon }}</view>
        <view class="module-info">
          <text class="module-name">{{ module.name }}</text>
          <text class="module-desc">{{ module.description }}</text>
        </view>
        <view class="module-check">
          <view 
            class="check-box"
            :class="{ 'check-box-active': selectedModules.includes(module.key) }"
          >
            <text v-if="selectedModules.includes(module.key)" class="check-icon">✓</text>
          </view>
        </view>
      </view>
    </view>

    <view class="footer-section">
      <button 
        class="confirm-btn"
        :class="{ 'confirm-btn-disabled': selectedModules.length === 0 }"
        :disabled="selectedModules.length === 0 || confirming"
        @click="handleConfirm"
      >
        {{ confirming ? '确认中...' : '确认选择' }}
      </button>
      <text v-if="!isFirstTime" class="back-text" @click="handleBack">返回</text>
    </view>
  </view>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useTabConfigStore } from '@/store/modules/tabConfig'

export default {
  setup() {
    const tabConfigStore = useTabConfigStore()
    const selectedModules = ref([])
    const confirming = ref(false)
    const isFirstTime = ref(false)

    const modules = ref([
      {
        key: 'rental',
        name: '租赁管理',
        description: '电动车租赁服务，轻松租借',
        icon: '📋'
      },
      {
        key: 'maintenance',
        name: '维修服务',
        description: '预约维修保养，专业服务',
        icon: '🔧'
      },
      {
        key: 'newVehicle',
        name: '新车选购',
        description: '新车浏览购买，品质保障',
        icon: '🚗'
      }
    ])

    onMounted(() => {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      isFirstTime.value = currentPage.options?.firstTime === 'true'
      
      selectedModules.value = [...tabConfigStore.selectedModules]
    })

    const toggleModule = (key) => {
      const index = selectedModules.value.indexOf(key)
      
      if (index > -1) {
        if (selectedModules.value.length === 1) {
          uni.showToast({
            title: '至少需要选择一个模块',
            icon: 'none'
          })
          return
        }
        selectedModules.value.splice(index, 1)
      } else {
        selectedModules.value.push(key)
      }
    }

    const handleConfirm = async () => {
      if (selectedModules.value.length === 0 || confirming.value) {
        return
      }

      confirming.value = true

      try {
        const success = tabConfigStore.setSelectedModules(selectedModules.value)
        
        if (success) {
          uni.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 1500
          })

          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 1500)
        }
      } catch (error) {
        console.error('Confirm error:', error)
        uni.showToast({
          title: '设置失败，请重试',
          icon: 'none'
        })
      } finally {
        confirming.value = false
      }
    }

    const handleBack = () => {
      uni.navigateBack()
    }

    return {
      modules,
      selectedModules,
      confirming,
      isFirstTime,
      toggleModule,
      handleConfirm,
      handleBack
    }
  }
}
</script>

<style lang="scss" scoped>
.module-select-container {
  width: 100%;
  min-height: 100vh;
  background-color: #F8F8F8;
  padding: 48rpx 32rpx;
}

.header-section {
  text-align: center;
  margin-bottom: 48rpx;
}

.header-title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16rpx;
}

.header-subtitle {
  display: block;
  font-size: 28rpx;
  color: #999999;
}

.modules-list {
  margin-bottom: 48rpx;
}

.module-item {
  background-color: #FFFFFF;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
  border: 2rpx solid transparent;
  transition: all 0.3s;
}

.module-item-active {
  border-color: #007AFF;
  background-color: rgba(0, 122, 255, 0.05);
}

.module-icon {
  width: 80rpx;
  height: 80rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  margin-right: 24rpx;
}

.module-info {
  flex: 1;
}

.module-name {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8rpx;
}

.module-desc {
  display: block;
  font-size: 26rpx;
  color: #999999;
}

.module-check {
  margin-left: 16rpx;
}

.check-box {
  width: 44rpx;
  height: 44rpx;
  border: 3rpx solid #CCCCCC;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.check-box-active {
  background-color: #007AFF;
  border-color: #007AFF;
}

.check-icon {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: bold;
}

.footer-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  padding: 32rpx;
  box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.06);
  text-align: center;
}

.confirm-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 44rpx;
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: bold;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.confirm-btn:active {
  opacity: 0.8;
  transform: scale(0.98);
}

.confirm-btn-disabled {
  background: #CCCCCC !important;
}

.back-text {
  display: block;
  font-size: 28rpx;
  color: #999999;
  margin-top: 16rpx;
}
</style>