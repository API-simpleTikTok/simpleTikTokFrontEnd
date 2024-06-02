<template>
    <div id="back">
        <div @click="goback">
            &lt;
        </div>
        <div>
            {{msg}}
        </div>
        <div>
            {{right}}
        </div>
    </div>
</template>
<script>
export default {
    props:['msg','right'],
    methods:{
        goback(){
            this.$emit('back')
        }
    }
}
</script>
<style lang="less">
#back{
    display: flex;
    justify-content: space-between;
    height: 48px;
    background-color:#101821;
    border-bottom: 1px solid #292831;
    line-height: 48px;
    color: white;
    font-size: 18px;
    padding: 0 20px;
    box-sizing: border-box;
    div{
        &:nth-of-type(2){
            flex: 1;
            text-align: center;
        }
    }

}
</style>