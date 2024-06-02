<template>
    <div id="alert">
        <transition name="msg">
        <div class="mesg" :class="type" v-if="show">
            <p>{{message}}</p>
        </div>
        </transition>
        <button @click = 'show = !show'>点我</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            message:'测试弹窗 up主定义了一个vue的实例方法',
            type:'',
            show:false
        }
    }
}
</script>
<style lang="less">
#alert{
    .msg-enter-active, .msg-leave-active {
        transition: opacity 2s;
        }
    .msg-enter, .msg-leave-to  {
        opacity: 0;
    }
    .mesg{
        position: fixed;
        left: 50%;
        top: 30%;
        transform: translate(-50%,-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        text-align: center;
        border-radius: 4px;
        font-size: 14px;
        line-height: 18px;
        padding: 6px 10px;
    }
    .sucsses{
         background-color: rgba(0, 0, 0, 0.5);
    }
    .err{
         background-color: #fe2c55;
    }
    button{

    }
}
</style>