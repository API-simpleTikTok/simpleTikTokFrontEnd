<template>
    <div id="sign">
        <div class="top">
            <div>x</div>
            <div>帮助</div>
        </div>
        <div class="con">
            <div class="tit">
                <h2>登陆后即可展示自己</h2>
                <p>登陆即表明同意<a href="">抖音协议</a><a href="">隐私政策</a></p>
            </div>
            <div class="ipt">
                <input type="text" name="email" placeholder="请输入您的邮箱">
                <input type="text" name="password" placeholder="请输入您的密码">
                <button>登陆</button>
            </div>
        </div>
        <div class="bottom">
            <router-link to="/reg" tag="div">立即注册</router-link>
            <router-link to="" tag="div">忘记密码</router-link>
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
#sign{
    padding: 30px;
    box-sizing: border-box;
    .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        div{
            &:nth-child(1){
                font-size: 30px;
            }
        }
    }
    .con{
        padding: 40px 10px;
        .tit{
            h2{
                font-size: 24px;
                font-weight: bold;
            }
            p{
                line-height: 50px;
                color: #666;
                a{
                    color: #628db8;
                    padding: 0 5px;
                    font-size: 16px;
                    text-decoration: none;
                }
            }
        }
        .ipt{
            input{
                width: 100%;
                height: 50px;
                background-color: #f9f9f9;
                border: 0;
                font-size: 14px;
                caret-color: red;
                &:nth-of-type(2){
                    margin-top: 20px;
                }
            }
            button{
                width: 100%;
                height: 50px;
                border: 0;
                text-align: center;
                line-height: 50px;
                background-color: #cccccc;
                margin-top: 10px;
                outline: none;
                color: white;
            }
        }
    }
    .bottom{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        div{
            color: #666;
            &:nth-of-type(1){
                color: tomato;
            }
        }
    }
}
</style>