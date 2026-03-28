<template>
  <view class="page-container">
    <view class="page-header">
      <text class="page-title">其他</text>
      <text class="page-desc">更多设置与功能</text>
    </view>

    <view class="menu-list">
      <view class="menu-item" @click="navigateToModuleSelect">
        <view class="menu-icon">⚙️</view>
        <text class="menu-name">模块管理</text>
        <text class="menu-arrow">›</text>
      </view>

      <view class="menu-item" @click="showActivationInfo">
        <view class="menu-icon">🔑</view>
        <text class="menu-name">激活信息</text>
        <text class="menu-arrow">›</text>
      </view>

      <view class="menu-item">
        <view class="menu-icon">📱</view>
        <text class="menu-name">关于我们</text>
        <text class="menu-arrow">›</text>
      </view>

      <view class="menu-item">
        <view class="menu-icon">💬</view>
        <text class="menu-name">意见反馈</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <CustomTabBar />
  </view>
</template>

<script>
import { onMounted } from 'vue'
import { useTabConfigStore } from '@/store/modules/tabConfig'
import { useActivationStore } from '@/store/modules/activation'
import CustomTabBar from '@/components/CustomTabBar/CustomTabBar.vue'

export default {
  components: {
    CustomTabBar
  },
  setup() {
    const tabConfigStore = useTabConfigStore()
    const activationStore = useActivationStore()

    const navigateToModuleSelect = () => {
      uni.navigateTo({
        url: '/pages/moduleSelect/index'
      })
    }

    const showActivationInfo = () => {
      const status = activationStore.activationStatus
      let message = ''
      
      if (status === 'permanent') {
        message = '您已永久激活'
      } else if (status === 'temporary') {
        const remainingTime = activationStore.remainingTimeText
        message = `临时激活，剩余时间：${remainingTime}`
      } else {
        message = '未激活'
      }
      
      uni.showModal({
        title: '激活信息',
        content: message,
        showCancel: false
      })
    }

    onMounted(() => {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const tabIndex = tabConfigStore.getTabIndexByPath('/' + currentPage.route)
      tabConfigStore.setCurrentTab(tabIndex)
    })

    return {
      navigateToModuleSelect,
      showActivationInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  min-height: 100vh;
  background-color: #F8F8F8;
  padding-bottom: 120rpx;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 48rpx 32rpx;
  margin-bottom: 32rpx;
}

.page-title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #FFFFFF;
  margin-bottom: 16rpx;
}

.page-desc {
  display: block;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

.menu-list {
  margin: 0 32rpx;
  background-color: #FFFFFF;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #F0F0F0;
  transition: background-color 0.3s;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background-color: #F8F8F8;
}

.menu-icon {
  font-size: 40rpx;
  margin-right: 24rpx;
}

.menu-name {
  flex: 1;
  font-size: 30rpx;
  color: #333333;
}

.menu-arrow {
  font-size: 32rpx;
  color: #CCCCCC;
  font-weight: bold;
}
</style>