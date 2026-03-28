<template>
  <view class="page-container">
    <view class="page-header">
      <text class="page-title">新车选购</text>
      <text class="page-desc">新车浏览购买，品质保障</text>
    </view>

    <view class="coming-soon">
      <text class="coming-soon-icon">🚗</text>
      <text class="coming-soon-text">功能开发中，敬请期待</text>
    </view>

    <CustomTabBar />
  </view>
</template>

<script>
import { onMounted } from 'vue'
import { useTabConfigStore } from '@/store/modules/tabConfig'
import CustomTabBar from '@/components/CustomTabBar/CustomTabBar.vue'

export default {
  components: {
    CustomTabBar
  },
  setup() {
    const tabConfigStore = useTabConfigStore()

    onMounted(() => {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const tabIndex = tabConfigStore.getTabIndexByPath('/' + currentPage.route)
      tabConfigStore.setCurrentTab(tabIndex)
    })

    return {}
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

.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200rpx 32rpx;
}

.coming-soon-icon {
  font-size: 120rpx;
  margin-bottom: 32rpx;
  opacity: 0.5;
}

.coming-soon-text {
  font-size: 28rpx;
  color: #999999;
}
</style>