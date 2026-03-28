const STORAGE_PREFIX = 'evb_'

const STORAGE_KEYS = {
  ACTIVATION: `${STORAGE_PREFIX}activation`,
  MODULES: `${STORAGE_PREFIX}modules`,
  USED_CODES: `${STORAGE_PREFIX}used_codes`
}

export const storage = {
  get(key) {
    try {
      const data = uni.getStorageSync(key)
      return data ? JSON.parse(data) : null
    } catch (e) {
      console.error('Storage get error:', e)
      return null
    }
  },

  set(key, value) {
    try {
      uni.setStorageSync(key, JSON.stringify(value))
      return true
    } catch (e) {
      console.error('Storage set error:', e)
      return false
    }
  },

  remove(key) {
    try {
      uni.removeStorageSync(key)
      return true
    } catch (e) {
      console.error('Storage remove error:', e)
      return false
    }
  },

  clear() {
    try {
      uni.clearStorageSync()
      return true
    } catch (e) {
      console.error('Storage clear error:', e)
      return false
    }
  }
}

export const getActivation = () => storage.get(STORAGE_KEYS.ACTIVATION)

export const setActivation = (data) => storage.set(STORAGE_KEYS.ACTIVATION, data)

export const removeActivation = () => storage.remove(STORAGE_KEYS.ACTIVATION)

export const getModules = () => storage.get(STORAGE_KEYS.MODULES)

export const setModules = (modules) => storage.set(STORAGE_KEYS.MODULES, modules)

export const getUsedCodes = () => storage.get(STORAGE_KEYS.USED_CODES) || []

export const setUsedCodes = (codes) => storage.set(STORAGE_KEYS.USED_CODES, codes)

export const addUsedCode = (code) => {
  const usedCodes = getUsedCodes()
  if (!usedCodes.includes(code)) {
    usedCodes.push(code)
    setUsedCodes(usedCodes)
  }
}

export default STORAGE_KEYS