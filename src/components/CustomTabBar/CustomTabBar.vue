<template>
  <view class="custom-tabbar">
    <view 
      v-for="(tab, index) in tabs" 
      :key="tab.pagePath"
      class="tab-item"
      @click="switchTab(index, tab.pagePath)"
    >
      <text class="tab-icon">{{ tab.icon }}</text>
      <text 
        class="tab-text"
        :class="{ 'tab-text-active': currentTab === index }"
      >
        {{ tab.text }}
      </text>
    </view>
  </view>
</template>

<script>
import { computed } from 'vue'
import { useTabConfigStore } from '@/store/modules/tabConfig'

const TAB_ICONS = {
  '/pages/index/index': '🏠',
  '/pages/rental/index': '📋',
  '/pages/maintenance/index': '🔧',
  '/pages/newVehicle/index': '🚗',
  '/pages/other/index': '⋯'
}

export default {
  name: 'CustomTabBar',
  setup() {
    const tabConfigStore = useTabConfigStore()

    const tabs = computed(() => {
      return tabConfigStore.tabs.map(tab => ({
        ...tab,
        icon: TAB_ICONS[tab.pagePath] || '📄'
      }))
    })

    const currentTab = computed(() => tabConfigStore.currentTab)

    const switchTab = (index, path) => {
      if (currentTab.value === index) {
        return
      }

      tabConfigStore.setCurrentTab(index)
      
      uni.switchTab({
        url: path
      })
    }

    return {
      tabs,
      currentTab,
      switchTab
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.06);
  z-index: 999;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rpx 0;
}

.tab-icon {
  font-size: 44rpx;
  line-height: 1;
  margin-bottom: 4rpx;
}

.tab-text {
  font-size: 22rpx;
  color: #999999;
  transition: color 0.3s;
}

.tab-text-active {
  color: #007AFF;
  font-weight: bold;
}
</style>