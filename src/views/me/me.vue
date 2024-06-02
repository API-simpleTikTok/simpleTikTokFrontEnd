<template>
    <div id="me">

        <div class="top">
            <div class="icon">三</div>
        </div>

        <div class="con">
            <div class="info">
                <div class="img">
                    <img src="" alt="">
                </div>
                <router-link to="/edit" tag="div" class="bj">编辑资料</router-link>
                <!-- <div class="bj">编辑资料</div> -->
                <div class="tj">+朋友</div>
            </div>
            <div class="des">
                <h2>修仙程序员</h2>
                <span>抖音号:18338164567</span>
                <p>这个人太懒了没有留下签名</p>
            </div>
            <div class="user">
                <span>23岁</span>
                <span>中国</span>
                <span>+学校标签等</span>
            </div>
            <div class="chengjiu">
                <p><span>23</span>获赞</p>
                <p><span>230</span>关注</p>
                <p><span>2.0w</span>+粉丝</p>
            </div>

            <div class="tab">
            <ul class="list">
                <li class="active">作品</li>
                <li>动态</li>
                <li>喜欢</li>
            </ul>
            <div class="tabitem">
                    <div class="item">
                        <img src="" alt="">
                        <img src="" alt="">
                        <img src="" alt="">
                    </div>
                    <div class="item">
                        <img src="" alt="">
                        <img src="" alt="">
                        <img src="" alt="">
                    </div>
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
#me{
    position: relative;
    .top{
        width: 100%;
        height: 160px;
        background-color: skyblue;
        display: flex;
        justify-content: flex-end;
        padding: 20px;
        box-sizing: border-box;
        .icon{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: steelblue;
            text-align: center;
            line-height: 30px;
            color: white;
        }
    }
    .con{
        width: 100%;
        position: absolute;
        top: 140px;
        .info{
            display: flex;
            align-items: center;
            padding: 20px;

            .img{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: turquoise;
                margin-right: 20px;
            }
            .bj{
                height: 40px;
                line-height: 40px;
                padding: 0 24px;
                background-color: #393842;
                color: white;
            }
            .tj{
                height: 40px;
                line-height: 40px;
                padding: 0 24px;
                background-color: #393842;
                color: white;
            }
        }
        .des{
            padding: 20px 10px;
            h2{
                font-size: 24px;
                font-weight: bold;
            }
            span{
                padding: 10px 0 15px 0;
                display: block;
            }
            p{
                line-height: 24px;
            }

        }
        .user{
            padding: 0 10px;
            span{
                font-size: 14px;
                margin-right: 5px;
                padding: 5px 8px;
                background: rgba(0, 0, 0, .6);
            }
        }
        .chengjiu{
            display: flex;
            p{
                font-size: 14px;
                margin-right: 5px;
                padding: 5px 8px;
                span{
                    font-size: 16px;
                }
            }
        }
        .tab{
            width: 100%;
            height: 400px;
            .list{
                display: flex;
                list-style: none;
                padding: 20px 10px;
                box-sizing: border-box;
                justify-content: space-around;
                li{
                    list-style: none;
                    line-height: 30px;
                   
                }
                .active{
                    border-bottom: 2px solid #cccccc;
                }
            }
            .tabitem{
                width: 100%;
                .item{
                    width: 100%;

                    height: 200px;
                    display: flex;
                img{
                    flex: 1;
                    background-color: cadetblue;
                }
                }
            }
        }
    }
}
</style>