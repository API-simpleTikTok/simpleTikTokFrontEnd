<template>
    <div id="player">
         <video-player  class="video-player vjs-defalut-skin vjs-big-play-centered"
          ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
        ></video-player>  
    </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player'
export default {
    name:'player',
    props:['list','index'],
    data(){
        return{
            playerOptions : {
               // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', 
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [
                        {
                            src: this.list.url,  // 路径
                            type: 'video/mp4'  // 类型
                        }, 
                    ],
                    //poster: "../../static/images/test.jpg", //你的封面地址
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar:false
                },
                playing:true
        }
    },
    created(){
        // this.autoplay()
    },
    methods:{
        playchange(){
            if(this.playing){
                this.$refs.videoPlayer.player.pause()
                this.playing = false
            }else{
                this.$refs.videoPlayer.player.play()
                this.playing = true
            }
        },
        autoplay(){
            if(this.index == 0){
                this.playerOptions.autoplay = true
            }
            
        },
        play(){
            this.$refs.videoPlayer.player.load()
            this.$refs.videoPlayer.player.play()
            this.playing = true
        },
        stop(){
            this.$refs.videoPlayer.player.pause()
            this.playing = false
        }
    },
    components:{
        videoPlayer
    }
}
</script>

<style lang="less">
#player{
    position: relative;
    .vjs-big-play-button{
        background: rgba(0, 0,0, .4);
        font-size: 30px;
        width: 46px;
        height: 46px!important;
        border-radius: 50%;
        position: absolute;
        left: 55%;
        top: 50%;
        transform: translate(10%,-50%);

    }
}
</style>