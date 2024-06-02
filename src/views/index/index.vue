<template>
    <div id="index">
        <topbar></topbar>
        <router-view></router-view>
    </div>
</template>
<script>
import topbar from '../../components/index/topbar'
export default {
    data(){
        return{

        }
    },
    components:{
        topbar
    }
}
</script>
<style lang="less">
#index{
    background-color: black;
    height: 100%;
    color: white;
}
</style>