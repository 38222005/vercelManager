import { checkActivationStatus } from './activation'
import { getModules } from './storage'

export const requireActivation = () => {
  const status = checkActivationStatus()
  
  if (!status.isActivated) {
    uni.reLaunch({
      url: '/pages/activation/index'
    })
    return false
  }
  
  return true
}

export const requireModules = () => {
  const modules = getModules()
  
  if (!modules || modules.length === 0) {
    uni.navigateTo({
      url: '/pages/moduleSelect/index'
    })
    return false
  }
  
  return true
}

export const checkPermission = () => {
  const activationStatus = checkActivationStatus()
  
  if (!activationStatus.isActivated) {
    return {
      hasPermission: false,
      reason: 'not_activated'
    }
  }
  
  const modules = getModules()
  if (!modules || modules.length === 0) {
    return {
      hasPermission: false,
      reason: 'no_modules'
    }
  }
  
  return {
    hasPermission: true
  }
}

export const navigateToPage = (page) => {
  const permission = checkPermission()
  
  if (!permission.hasPermission) {
    if (permission.reason === 'not_activated') {
      uni.reLaunch({
        url: '/pages/activation/index'
      })
    } else if (permission.reason === 'no_modules') {
      uni.navigateTo({
        url: '/pages/moduleSelect/index'
      })
    }
    return false
  }
  
  uni.navigateTo({
    url: page
  })
  return true
}

export default {
  requireActivation,
  requireModules,
  checkPermission,
  navigateToPage
}