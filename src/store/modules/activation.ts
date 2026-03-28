import { defineStore } from 'pinia'
import { 
  getActivation, 
  setActivation, 
  removeActivation, 
  getUsedCodes 
} from '@/utils/storage'
import { 
  activateApp, 
  checkActivationStatus, 
  formatRemainingTime,
  ACTIVATION_STATUS 
} from '@/utils/activation'

export const useActivationStore = defineStore('activation', {
  state: () => ({
    activationData: getActivation(),
    status: ACTIVATION_STATUS.NONE,
    isActivated: false,
    remainingTime: null
  }),

  getters: {
    activationStatus: (state) => state.status,
    isActivatedGetter: (state) => state.isActivated,
    remainingTimeText: (state) => {
      if (state.remainingTime) {
        return formatRemainingTime(state.remainingTime)
      }
      return ''
    }
  },

  actions: {
    async activate(code) {
      const result = activateApp(code)
      
      if (result.success) {
        this.activationData = getActivation()
        this.status = result.type === 'temporary' 
          ? ACTIVATION_STATUS.TEMPORARY 
          : ACTIVATION_STATUS.PERMANENT
        this.isActivated = true
        
        if (result.type === 'temporary') {
          this.remainingTime = this.activationData.expireTime - Date.now()
        }
      }
      
      return result
    },

    checkActivationStatus() {
      const status = checkActivationStatus()
      
      this.status = status.status
      this.isActivated = status.isActivated
      this.remainingTime = status.remainingTime || null
      
      if (status.expired) {
        this.activationData = null
      }
      
      return status
    },

    clearActivation() {
      removeActivation()
      this.activationData = null
      this.status = ACTIVATION_STATUS.NONE
      this.isActivated = false
      this.remainingTime = null
    },

    getUsedCodes() {
      return getUsedCodes()
    }
  }
})