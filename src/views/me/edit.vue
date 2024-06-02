<template>
    <div id="edit">
        <backhead :msg = 'msg' @back ='toback'></backhead>
        <div class="top">
            <div class="img">
                <img src="../../assets/img/avatar.jpg" alt="">
                <span class="iconfont icon-xiangji"></span>
                <input type="file">
            </div>
            <p>点击更换头像</p>
        </div>
        <div class="con">
            <div class="item">
                <span>名称</span>
                <span>修仙程序员 &gt;</span>
            </div>
            <div class="item">
                <span>抖音号</span>
                <span>11557869154 &gt;</span>
            </div>
            <div class="item">
                <span>简介</span>
                <span>我儿王腾有大帝之姿 &gt;</span>
            </div>
            <div class="item">
                <span>学校</span>
                <span>点击设置 &gt;</span>
            </div>
            <div class="item">
                <span>性别</span>
                <span>点击设置 &gt;</span>
            </div>
            <div class="item">
                <span>地区</span>
                <span>圣地 &gt;</span>
            </div>
        </div>
    </div>
</template>
<script>
import backhead from '../../components/backhead'
export default {
    components:{
        backhead
    },
    data(){
        return{
            msg:'编辑资料'
        }
    },
    methods:{
        toback(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less">
    #edit{
        background-color: #101821;
        height: 100%;
        .top{
            padding: 20px 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
            .img{
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                
                img{
                     width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    opacity: .8;
                    margin-bottom: 5px;
                }
                span{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    font-size: 26px;
                }
                input{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    opacity: 0;
                }
            }
        }
        .con{
            border-top: 1px solid #292831;
            color: #cccccc;
            .item{
                display: flex;
                justify-content: space-between;
                line-height: 60px;
                padding: 0 6px;
                box-sizing: border-box;
                span{
                    &:nth-of-type(1){
                        color: white;
                    }
                }
            }
        }
    }
</style>