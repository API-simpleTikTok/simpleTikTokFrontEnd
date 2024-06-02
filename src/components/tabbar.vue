<template>
    <div id="tabbar">
        <div v-for="(item,index) in tab" :key="index" class="item" @click="changecurrent(index)">
            <!-- <span :class = "currentindex == item.id ? 'current':''">{{item.bar}}</span> -->
            <router-link :to = "item.path" tag="span" :class = "currentindex == item.id ? 'current':''">
                {{item.bar}}
            </router-link>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            currentindex:1,
            tab:[
                {   id:1,
                    bar:'首页',
                    path:'/index'
                },
                  {   id:2,
                    bar:'熟人',
                    path:'/follow'
                },
                {   id:3,
                    bar:'+',
                    path:'/public'
                },
                  {   id:4,
                    bar:'消息',
                    path:'/news'
                },
                  {   id:5,
                    bar:'个人',
                    path:'/me'
                }
            ]
        }
    },
    methods:{
        changecurrent(index){
            this.currentindex = index + 1
        }
    }
}
</script>

<style lang="less">
    #tabbar{
        width: 100%;
        height: 50px;
        color: #cccccc;
        background: black;
        // opacity: .4;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        line-height: 50px;
        align-items: center;
        justify-content: space-around;
        font-size: 16px;
        box-sizing: border-box;
        z-index: 99;
        .item{
            text-align: center;
            .current{
                color: #ffffff;
            }
            &:nth-child(3){
                color: red;
                font-size: 24px;
            }
        }
      
}
</style>