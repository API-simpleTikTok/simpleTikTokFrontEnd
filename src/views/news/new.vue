<template>
    <div id="news">
        <div class="head">
            <div></div>
            <div>消息</div>
            <div></div>
        </div>
        <div class="nav">
            <div class="item">
                <div class="iconbox"></div>
                <p>粉丝</p>
            </div>
            <div class="item">
                <div class="iconbox"></div>
                <p>赞</p>
            </div>
            <div class="item">
                <div class="iconbox"></div>
                <p>@我的</p>
            </div>
            <div class="item">
                <div class="iconbox"></div>
                <p>评论</p>
            </div>
        </div>
        <div class="guanggao">
            活动横幅
        </div>
        <div class="list">
            <div class="newietm">
                <div class="img"></div>
                <div class="user">
                    <div class="top">
                        <div>抖音小助手</div>
                        <div>12:30</div>
                    </div>
                    <div class="bottom">
                        <div>抖音安全课堂</div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
#news{
    background-color: #101821;
    height: 100vh;
    .head{
        display: flex;
        justify-content: center;
        height: 48px;
        background-color:#101821;
        border-bottom: 1px solid #292831;
        line-height: 48px;
        color: white;
        font-size: 16px;
        padding: 0 20px;
        box-sizing: border-box;

    }
    .nav{
        display: flex;
        justify-content: space-around;
        color: white;
        .item{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 5px;
            box-sizing: border-box;
            .iconbox{
                width: 50px;
                height: 50px;
                background-color: slateblue;
                margin-bottom: 8px;
                border-radius: 5px;
            }
            p{
                font-size: 14px;
            }
        }
    }
    .guanggao{
        height: 40px;
        text-align: center;
        color: white;
        width: 100%;
        line-height: 40px;
    }
    .list{
        border-top: 1px solid #292831;
        .newietm{
            display: flex;
            padding: 10px 6px 10px 20px;
            box-sizing: border-box;
            align-items: center;
            .img{
                width:50px ;
                height: 50px;
                border-radius: 50%;
                background-color: turquoise;
                margin-right: 10px;
            }
            .user{
                flex: 1;
                color: white;
                .top{
                    display: flex;
                    justify-content: space-between;
                    div{
                        &:nth-of-type(2){
                            color: #cccccc;
                        }
                    }
                }
                .bottom{
                    display: flex;
                    font-size: 14px;
                    justify-content: space-between;
                    div{
                        &:nth-of-type(2){
                            color: #cccccc;
                        }
                    }
                }

            }
        }
    }
}
</style>