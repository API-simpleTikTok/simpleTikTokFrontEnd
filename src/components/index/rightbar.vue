<template>
    <div id="rightbar">
        <div class="headimg">
            <span><img src="../../assets/img/avatar.jpg" alt=""></span>
            <span class="iconfont icon-jia"></span>
        </div>
        <div class="item">
            <span class="iconfont icon-love-b"></span>
            <p>18.0w</p>
        </div>
          <div class="item" @click="istanchu">
            <span class="iconfont icon-pinglun"></span>
            <p>18.0w</p>
        </div>
          <div class="item">
            <span class="iconfont icon-share-fill"></span>
            <p>18.0w</p>
        </div>
        <div class="music">
            <img src="../../assets/img/avatar.jpg" alt="">
        </div>
    

    </div>
</template>
<script>
export default {
    props:['show'],
    data(){
        return{
            
        }
    },
    methods:{
        istanchu(){
            this.$emit('tanchu')
        }
    },
    mounted(){
        // console.log(this.$parent)
        // 它爸爸的爸爸才能找到isshow
    }
}
</script>
<style lang="less">
#rightbar{
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    z-index: 99;
    .headimg{
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          &:nth-child(1){
            width: 50px;
            height: 50px;
            border: 1px solid white;
            border-radius: 50%;
            overflow: hidden; 
            img{
                width: 100%;   
            }
          }
        }
        .icon-jia{
            color: tomato;
            transform: translateY(-50%);
        }
    }
    .item{
        height: 60px;
        text-align: center;
        p{
            font-size: 14px;
        }
        .iconfont{
            font-size: 26px;
        }
    }
    .music{
        width: 54px;
        height: 54px;
        border-radius: 50%;
        overflow: hidden; 
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: rounds 6s linear infinite;
        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            
        }
    }
}
@keyframes rounds{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>