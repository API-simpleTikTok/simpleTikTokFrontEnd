<template>
    <div id="topbar">
        <div class="left">
            <span class="iconfont icon-live"></span>
        </div>
        <div class="center">
            <div class="item" v-for="(item,index) in top" :key="index" @click="changeindex(index)">
                <span :class="topindex==item.id?'active':''">{{item.bar}}</span>
            </div>
        </div>
        <div class="right">
            <span class="iconfont icon-sousuo"></span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            topindex:3,
            top:[
                {
                    id:1,
                    bar:'同城'
                },
                   {
                    id:2,
                    bar:'关注'
                },
                   {
                    id:3,
                    bar:'推荐'
                }
            ]
        }
    },
    methods:{
        changeindex(i){
            this.topindex = i + 1
        }
    }
}
</script>

<style lang="less">
    #topbar{
        width: 100vw;
        height: 60px;
        font-size: 18px;
        display: flex;
        color: #cccccc;
        padding: 20px;
        box-sizing: border-box;
        justify-content: space-between;
        position: fixed;
        z-index: 99;
        .iconfont{
            font-size: 24px;
            width: 24%;
        }
        .center{
            flex: 1;
            display: flex;
            justify-content: space-around;
            .item{
                span{
                    padding: 10px;
                }
                .active{
                    color: white;
                    border-bottom: 3px solid white;
                }
            }
        }
    }
</style>