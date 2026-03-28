import { 
  getActivation, 
  setActivation, 
  removeActivation, 
  getUsedCodes, 
  addUsedCode 
} from './storage'

const ACTIVATION_CODES = {
  TEMPORARY: '13255405952',
  PERMANENT: '15965867361'
}

const ACTIVATION_STATUS = {
  NONE: 'none',
  TEMPORARY: 'temporary',
  PERMANENT: 'permanent'
}

export { ACTIVATION_STATUS }

const TEMPORARY_DURATION = 24 * 60 * 60 * 1000

export const verifyActivationCode = (code) => {
  const usedCodes = getUsedCodes()
  
  if (code === ACTIVATION_CODES.TEMPORARY) {
    if (usedCodes.includes(code)) {
      return {
        success: false,
        message: '该激活码已使用过，请使用其他激活码'
      }
    }
    return {
      success: true,
      type: 'temporary',
      message: '激活成功，有效期24小时'
    }
  }
  
  if (code === ACTIVATION_CODES.PERMANENT) {
    return {
      success: true,
      type: 'permanent',
      message: '永久激活成功'
    }
  }
  
  return {
    success: false,
    message: '激活码错误，请重新输入'
  }
}

export const activateApp = (code) => {
  const result = verifyActivationCode(code)
  
  if (!result.success) {
    return result
  }
  
  const now = Date.now()
  const activationData = {
    code,
    status: result.type === 'temporary' ? ACTIVATION_STATUS.TEMPORARY : ACTIVATION_STATUS.PERMANENT,
    activationTime: now,
    expireTime: result.type === 'temporary' ? now + TEMPORARY_DURATION : null
  }
  
  setActivation(activationData)
  
  if (result.type === 'temporary') {
    addUsedCode(code)
  }
  
  return result
}

export const checkActivationStatus = () => {
  const activation = getActivation()
  
  if (!activation) {
    return {
      isActivated: false,
      status: ACTIVATION_STATUS.NONE
    }
  }
  
  if (activation.status === ACTIVATION_STATUS.PERMANENT) {
    return {
      isActivated: true,
      status: ACTIVATION_STATUS.PERMANENT
    }
  }
  
  if (activation.status === ACTIVATION_STATUS.TEMPORARY) {
    const now = Date.now()
    if (now < activation.expireTime) {
      return {
        isActivated: true,
        status: ACTIVATION_STATUS.TEMPORARY,
        remainingTime: activation.expireTime - now
      }
    } else {
      removeActivation()
      return {
        isActivated: false,
        status: ACTIVATION_STATUS.NONE,
        expired: true
      }
    }
  }
  
  return {
    isActivated: false,
    status: ACTIVATION_STATUS.NONE
  }
}

export const formatRemainingTime = (milliseconds) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60))
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}小时${minutes}分钟`
}

export default {
  verifyActivationCode,
  activateApp,
  checkActivationStatus,
  formatRemainingTime,
  ACTIVATION_STATUS
}