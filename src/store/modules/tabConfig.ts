import { defineStore } from 'pinia'
import { getModules, setModules } from '@/utils/storage'

const FIXED_TABS = [
  {
    pagePath: '/pages/index/index',
    text: '首页',
    iconPath: '/static/tabbar/home.png',
    selectedIconPath: '/static/tabbar/home-active.png'
  },
  {
    pagePath: '/pages/other/index',
    text: '其他',
    iconPath: '/static/tabbar/other.png',
    selectedIconPath: '/static/tabbar/other-active.png'
  }
]

const OPTIONAL_TABS = [
  {
    pagePath: '/pages/rental/index',
    text: '租赁',
    key: 'rental',
    iconPath: '/static/tabbar/rental.png',
    selectedIconPath: '/static/tabbar/rental-active.png'
  },
  {
    pagePath: '/pages/maintenance/index',
    text: '维修',
    key: 'maintenance',
    iconPath: '/static/tabbar/maintenance.png',
    selectedIconPath: '/static/tabbar/maintenance-active.png'
  },
  {
    pagePath: '/pages/newVehicle/index',
    text: '新车',
    key: 'newVehicle',
    iconPath: '/static/tabbar/newVehicle.png',
    selectedIconPath: '/static/tabbar/newVehicle-active.png'
  }
]

export const useTabConfigStore = defineStore('tabConfig', {
  state: () => ({
    selectedModules: getModules() || [],
    currentTab: 0
  }),

  getters: {
    tabs: (state) => {
      const tabs = [FIXED_TABS[0]]
      
      OPTIONAL_TABS.forEach(tab => {
        if (state.selectedModules.includes(tab.key)) {
          tabs.push({
            pagePath: tab.pagePath,
            text: tab.text,
            iconPath: tab.iconPath,
            selectedIconPath: tab.selectedIconPath
          })
        }
      })
      
      tabs.push(FIXED_TABS[1])
      
      return tabs
    },

    hasRental: (state) => state.selectedModules.includes('rental'),
    hasMaintenance: (state) => state.selectedModules.includes('maintenance'),
    hasNewVehicle: (state) => state.selectedModules.includes('newVehicle'),

    tabCount: (state) => {
      return state.selectedModules.length + 2
    }
  },

  actions: {
    setSelectedModules(modules) {
      if (modules.length === 0) {
        uni.showToast({
          title: '至少需要选择一个模块',
          icon: 'none'
        })
        return false
      }
      
      this.selectedModules = modules
      setModules(modules)
      return true
    },

    toggleModule(moduleKey) {
      const index = this.selectedModules.indexOf(moduleKey)
      
      if (index > -1) {
        if (this.selectedModules.length === 1) {
          uni.showToast({
            title: '至少需要保留一个模块',
            icon: 'none'
          })
          return false
        }
        this.selectedModules.splice(index, 1)
      } else {
        this.selectedModules.push(moduleKey)
      }
      
      setModules(this.selectedModules)
      return true
    },

    setCurrentTab(index) {
      this.currentTab = index
    },

    getTabIndexByPath(path) {
      const index = this.tabs.findIndex(tab => tab.pagePath === path)
      return index === -1 ? 0 : index
    }
  }
})

export { FIXED_TABS, OPTIONAL_TABS }