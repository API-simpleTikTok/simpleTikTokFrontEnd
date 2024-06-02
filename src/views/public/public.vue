<template>
    <div id="public">
        <div class="top">
            <div class="back" @click="$router.go(-1)">x</div>
            <div class="title">
                <span class="iconfont icon-yinfu"></span>
                <span>选择音乐</span>
            </div>
        </div>
        <div class="upload">
            <video src="" style="width:100%;height:520px;object-fit: fill;" ref="video"></video>
            <div class="uploadbar">
                <div class="item">
                    <div class="iconfont"></div>
                    <p>道具</p>
                </div>
                <div class="item yuan" @click="getcamera">
                    <div class="wq">
                        <div class="nq"></div>
                    </div>
                </div>
                <div class="item">
                    <div class="iconfont"></div>
                    <p>上传</p>
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
    },
    methods:{
        getcamera(){
            navigator.mediaDevices.getUserMedia({
                video:true
            }).then(success => {
                this.$refs.video.srcObject = success
                this.$refs.video.play()
            }).catch(err =>{
                console.log(err)
            })
        }
    }
}
</script>
<style lang="less">
#public{
    background-color: #cccccc;
    color: white;
    display: flex;
    flex-direction: column;
    .top{
        display: flex;
        height: 44px;
        align-items: center;
        padding: 10px 20px;
        box-sizing: border-box;
        position: relative;
        justify-content: center;
        .back{
            font-size: 28px;
            position: absolute;
            left: 20px;
            top: 1px;
        }
   
    }
    .upload{
        background-color: #cccccc;
        flex: 1;
        .uploadbar{
            position: fixed;
            display: flex;
            
            bottom: 0;
            justify-content: space-between;
            height: 100px;
            width: 100%;
            padding: 0 50px;
            box-sizing: border-box;
            align-items: center;
            background-color: #cccccc;
            .item{
          

                .iconfont{
                    width: 30px;
                    height: 30px;
                    border-radius: 5px;
                    border: 1px solid red;
                 
                }
                p{
                        font-size: 14px;
                }
                .wq{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 1px solid #cb6074;
                    box-sizing: border-box;
                    margin-bottom: 10px;
                    .nq{
                        width: 42px;
                        height: 42px;
                        border-radius: 50%;
                        background-color: #cb6074;
                    }
                }
            }

        }
    }
}
</style>