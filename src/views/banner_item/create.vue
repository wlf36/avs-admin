<template>
  <banner-item :is-edit='false'></banner-item>
</template>

<script>
import BannerItem from './components/BannerItem'

export default {
  name: 'createBannerItem',
  components: { BannerItem }
}
</script>

