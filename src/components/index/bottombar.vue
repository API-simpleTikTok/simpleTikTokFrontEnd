<template>
    <div id="bottombar">
        <div class="info">
            <div class="item"><span>@修仙程序员</span></div>
            <div class="item"><span>正在修仙中</span></div>
            <div class="item scrolls">
                <span class="iconfont icon-yinfu"></span>
                <div class="con"> 
                    <span>我儿王腾有大帝之资</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="less">
#bottombar{
  .info{
        font-size: 16px;
        color: white;
        padding-left: 10px;

    .item{
        padding: 5px 0;
        .icon-yinfu{
            padding-right: 5px;
        }
    }
    .scrolls{
        display: flex;
        align-items: center;
        .con{
            width: 150px;
            white-space: nowrap;
            overflow: hidden;
            font-size: 14px;
            span{
                display: inline-block;
                animation: move 3s linear infinite;
            }
        }
    }
  }
}
@keyframes move {
    form{
        transform: translateX(0);
    }

    to{
        transform: translateX(calc(-50% - 30px));
    }
}
</style>