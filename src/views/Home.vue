<template>
  <div id="home">
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import tabbar from '../components/tabbar'

export default {
  name: 'Home',
  components: {
    tabbar
  }
}
</script>
