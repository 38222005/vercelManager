<script>
import { useActivationStore } from '@/store/modules/activation'

export default {
  onLaunch() {
    console.log('App Launch')
    this.checkActivationAndNavigate()
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
  methods: {
    checkActivationAndNavigate() {
      const activationStore = useActivationStore()
      const status = activationStore.checkActivationStatus()
      
      if (!status.isActivated) {
        uni.reLaunch({
          url: '/pages/activation/index'
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>