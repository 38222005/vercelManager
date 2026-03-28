<template>
  <view class="page-container">
    <view class="header-section">
      <text class="welcome-text">欢迎使用电动车管家</text>
      <text class="date-text">{{ currentDate }}</text>
    </view>

    <view class="quick-entry">
      <view 
        v-for="entry in quickEntries" 
        :key="entry.key"
        class="entry-card"
        @click="navigateToModule(entry.key)"
      >
        <view class="entry-icon">{{ entry.icon }}</view>
        <text class="entry-name">{{ entry.name }}</text>
        <text class="entry-desc">{{ entry.description }}</text>
      </view>
    </view>

    <view class="notice-section">
      <view class="notice-header">
        <text class="notice-title">系统公告</text>
      </view>
      <view class="notice-content">
        <text class="notice-text">欢迎使用电动车管家App，祝您使用愉快！</text>
      </view>
    </view>

    <CustomTabBar />
  </view>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
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

    const currentDate = ref('')

    const quickEntries = computed(() => {
      const entries = []
      
      if (tabConfigStore.hasRental) {
        entries.push({
          key: 'rental',
          name: '租赁管理',
          description: '电动车租赁服务',
          icon: '📋'
        })
      }
      
      if (tabConfigStore.hasMaintenance) {
        entries.push({
          key: 'maintenance',
          name: '维修服务',
          description: '预约维修保养',
          icon: '🔧'
        })
      }
      
      if (tabConfigStore.hasNewVehicle) {
        entries.push({
          key: 'newVehicle',
          name: '新车选购',
          description: '新车浏览购买',
          icon: '🚗'
        })
      }
      
      return entries
    })

    const navigateToModule = (key) => {
      const pages = {
        rental: '/pages/rental/index',
        maintenance: '/pages/maintenance/index',
        newVehicle: '/pages/newVehicle/index'
      }
      
      uni.switchTab({
        url: pages[key]
      })
    }

    const formatDate = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const weekDays = ['日', '一', '二', '三', '四', '五', '六']
      const weekDay = weekDays[now.getDay()]
      
      return `${year}年${month}月${day}日 星期${weekDay}`
    }

    onMounted(() => {
      currentDate.value = formatDate()
      
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const tabIndex = tabConfigStore.getTabIndexByPath('/' + currentPage.route)
      tabConfigStore.setCurrentTab(tabIndex)
    })

    return {
      currentDate,
      quickEntries,
      navigateToModule
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

.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 48rpx 32rpx;
  margin-bottom: 32rpx;
}

.welcome-text {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #FFFFFF;
  margin-bottom: 16rpx;
}

.date-text {
  display: block;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

.quick-entry {
  padding: 0 32rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 32rpx;
}

.entry-card {
  width: 48%;
  background-color: #FFFFFF;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.entry-icon {
  font-size: 64rpx;
  margin-bottom: 16rpx;
}

.entry-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8rpx;
}

.entry-desc {
  font-size: 24rpx;
  color: #999999;
}

.notice-section {
  margin: 0 32rpx;
  background-color: #FFFFFF;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
}

.notice-header {
  margin-bottom: 16rpx;
}

.notice-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
}

.notice-content {
  padding: 16rpx;
  background-color: #F8F8F8;
  border-radius: 12rpx;
}

.notice-text {
  font-size: 26rpx;
  color: #666666;
  line-height: 40rpx;
}
</style>