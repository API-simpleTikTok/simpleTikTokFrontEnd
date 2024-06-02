<template>
    <div id="reg">
        <div class="top">
            <div @click="goback">x</div>
            <div>帮助</div>
        </div>
        <div class="con">
            <div class="tit">
                <h2>登陆后即可展示自己</h2>
                <p>登陆即表明同意<a href="">抖音协议</a><a href="">隐私政策</a></p>
            </div>
            <div class="ipt">
                <input type="text" name="email" v-model="email" placeholder="请输入您的邮箱">
                <input type="text" name="password" v-model="password" placeholder="请输入您的密码">
                <div class="codes">
                    <input type="text" name="code" placeholder="请输入验证码" class="yzm">
                    <button class="fs" @click="sends" ref="btn">{{content}}</button>
                </div>
                <button>注册</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            content: '发送验证码',  // 按钮里显示的内容
            totalTime: 60,      //记录具体倒计时时间
            canClick: true, //为false直接return,
            email:'',
            password:''    
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        sends(event){
            //console.log(event.target.innerText)
            //console.log(event)
            // this.$refs.btn.style.fontSize = '24px'
            let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if(reg.test(this.email)){
                console.log(this.email)
                if (!this.canClick) return  //防止重复点击
                this.canClick = false
                this.content = this.totalTime + 's后重新发送'
                let clock = window.setInterval(() => {
                this.totalTime--
                this.content = this.totalTime + 's后重新发送'
                if (this.totalTime < 0) {
                window.clearInterval(clock)
                this.content = '重新发送验证码'
                this.totalTime = 60
                this.canClick = true  //这里重新开启
                }
            },1000)
            }else{
                alert('邮箱格式错误')
            }

        }
    }
}
</script>
<style lang="less">
#reg{
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
            .codes{
                width: 100%;
                height: 50px;
                background-color: #f9f9f9;
                display: flex;
                align-items: center;
                margin-top: 20px;
                .fs{
                    width: 106px;
                    height: 50px;
                    background-color: #f9f9f9;
                    color: tomato;
                    line-height: 50px;
                    margin: 0;
                }
                .yzm{
                    flex: 1;
                    height: 50px;
                    outline: none;
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
}
</style>