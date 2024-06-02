<template>
    <div id="video">
        <swiper :options="swiperOption">
            <!-- 幻灯内容 -->
            <swiper-slide v-for="(item,index) in videolist" :key="index">
                <div><player ref="videos" :list = 'item' :index = 'index'></player></div>
                <div class="bottom">
                    <bottombar></bottombar>
                </div>
                <div class="right">
                    <rightbar :show = 'isshow' @tanchu = 'xianshi'></rightbar>
                </div>
            </swiper-slide> 
        </swiper>
        <!-- 评论 -->
            <transition name="up">
            <div class="public" v-if="isshow">
                <div class="public-list">
                    <div class="public-top">
                        <div class="number">15.0w条评论</div>
                        <div class="close" @click="close">x</div>
                    </div>
                    <div class="public-body">
                        <div class="bodyitem">
                            <div class="itemimg"><img src="" alt=""></div>
                            <div class="iteminfo">
                                <div class="to">
                                    <p class="name">前端切图仔</p>
                                    <p class="con">今晚不加班 <span>03-03</span></p>
                                </div>
                                <div class="zan"><span class="iconfont icon-love-b"></span><p>200</p></div>
                            </div>
                            
                        </div>
                      <div class="bodyitem">
                            <div class="itemimg"><img src="" alt=""></div>
                            <div class="iteminfo">
                                <div class="to">
                                    <p class="name">前端切图仔</p>
                                    <p class="con">今晚不加班 <span>03-03</span></p>
                                </div>
                                <div class="zan"><span class="iconfont icon-love-b"></span><p>200</p></div>
                            </div>
                            
                        </div>
                                            <div class="bodyitem">
                            <div class="itemimg"><img src="" alt=""></div>
                            <div class="iteminfo">
                                <div class="to">
                                    <p class="name">前端切图仔</p>
                                    <p class="con">今晚不加班 <span>03-03</span></p>
                                </div>
                                <div class="zan"><span class="iconfont icon-love-b"></span><p>200</p></div>
                            </div>
                            
                        </div>
                                            <div class="bodyitem">
                            <div class="itemimg"><img src="" alt=""></div>
                            <div class="iteminfo">
                                <div class="to">
                                    <p class="name">前端切图仔</p>
                                    <p class="con">今晚不加班 <span>03-03</span></p>
                                </div>
                                <div class="zan"><span class="iconfont icon-love-b"></span><p>200</p></div>
                            </div>
                            
                        </div>
                                            <div class="bodyitem">
                            <div class="itemimg"><img src="" alt=""></div>
                            <div class="iteminfo">
                                <div class="to">
                                    <p class="name">前端切图仔</p>
                                    <p class="con">今晚不加班 <span>03-03</span></p>
                                </div>
                                <div class="zan"><span class="iconfont icon-love-b"></span><p>200</p></div>
                            </div>
                            
                        </div>
                                            <div class="bodyitem">
                            <div class="itemimg"><img src="" alt=""></div>
                            <div class="iteminfo">
                                <div class="to">
                                    <p class="name">前端切图仔</p>
                                    <p class="con">今晚不加班 <span>03-03</span></p>
                                </div>
                                <div class="zan"><span class="iconfont icon-love-b"></span><p>200</p></div>
                            </div>
                            
                        </div>
                                            <div class="bodyitem">
                            <div class="itemimg"><img src="" alt=""></div>
                            <div class="iteminfo">
                                <div class="to">
                                    <p class="name">前端切图仔</p>
                                    <p class="con">今晚不加班 <span>03-03</span></p>
                                </div>
                                <div class="zan"><span class="iconfont icon-love-b"></span><p>200</p></div>
                            </div>
                            
                        </div>
                                            <div class="bodyitem">
                            <div class="itemimg"><img src="" alt=""></div>
                            <div class="iteminfo">
                                <div class="to">
                                    <p class="name">前端切图仔</p>
                                    <p class="con">今晚不加班 <span>03-03</span></p>
                                </div>
                                <div class="zan"><span class="iconfont icon-love-b"></span><p>200</p></div>
                            </div>
                            
                        </div>
                                            <div class="bodyitem">
                            <div class="itemimg"><img src="" alt=""></div>
                            <div class="iteminfo">
                                <div class="to">
                                    <p class="name">前端切图仔</p>
                                    <p class="con">今晚不加班 <span>03-03</span></p>
                                </div>
                                <div class="zan"><span class="iconfont icon-love-b"></span><p>200</p></div>
                            </div>
                            
                        </div>
                    </div>

                    <!-- 输入评论 -->
                    <div class="inpl">
                        <input type="text" v-model="pinglun" placeholder="请输入评论">
                        <span>@</span>
                        <span class="iconfont icon-pinglun"></span>
                    </div>
                </div>
            </div>
            </transition>

    </div>
</template>
<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper'  
import player from './player'
import bottombar from './bottombar'
import rightbar from './rightbar'
export default{
        name:'videoList',
        components: {
            swiper,          //定义组件
            swiperSlide,
            player,
            bottombar,
            rightbar
        },
        data(){
            return {
                page:1,
                pinglun:'',
                isshow:false,
                swiperOption: {
                    direction:"vertical",
                    grabCursor: true, 
                    setWrapperSize: true, 
                    autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
                    slidesPerView: 1,
                    mousewheel: true, 
                    mousewheelControl: true, 
                    height: window.innerHeight, // 高度设置，占满设备高度
                    resistanceRatio: 0, 
                    observeParents: true, 
                    on:{
                        tap:()=>{
                            this.playaction(this.page-1)
                        },
                        slideNextTransitionStart: ()=>{
                            this.page += 1
                            this.nextscroll(this.page - 1)
                            // console.log(this.page)
                        },
                        slidePrevTransitionEnd:()=>{
                            if(this.page > 1){
                                this.page -= 1
                                // console.log(this.page)
                                this.prescroll(this.page-1)
                            }
                           
                        }
                    }
                },
                videolist:[
                    {
                        id:1,
                        url:'http://cdn.loginlm.top/76e94d0266624be00599a2fbd93cdac01.mp4'
                    },
		            {
                        id:2,
                        url:'http://cdn.loginlm.top/07fc96eae675b824d1c26fd758e50c7e2.mp4'
                    },
                    {
                        id:3,
                        url:'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4'
                    },
                ]
            }
        },
        methods:{
            playaction(i){
                this.$refs.videos[i].playchange()
            },
            // 下滑上滑
            nextscroll(i){
                this.$refs.videos[i-1].stop()
                this.$refs.videos[i].play()
            },
            prescroll(i){
                this.$refs.videos[i+1].stop()
                this.$refs.videos[i].play()
            },
            xianshi(){
                this.isshow = true
            },
            close(){
                this.isshow = false
            }
        }
     }
</script>
<style lang="less">
#video{
    height: 100%;
    .swiper-container{
        height: 100%;
        position: relative;
        .bottom{
            position: absolute;
            bottom: 55px;
            left: 0;
        }
        .right{
            position: absolute;
            right: 0;
            bottom: 55px;
        }

    }
    		.up-enter-active, .up-leave-active {
			  transition:transform .5s;
			}
			.up-enter, .up-leave-to{
              transform: translateY(100%);
			}
            .public{
            width: 100%;
            height: 500px;
            background-color: white;
            position: fixed;
            box-sizing: border-box;
            left: 0;
            bottom: 0;
            z-index: 100;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding: 10px 10px;
            color: #1a1a1a;
            .public-list{
                display: flex;
                flex-direction: column;
                .public-top{
                    display: flex;
                    align-items: center;
                    text-align: center;
                    color: #1a1a1a;
                    padding-right: 10px;
                    .number{
                        flex: 1;
                        text-align: center;
                    }
                    .close{
                        color: #666;
                        font-size: 26px;
                    }
                }
                .public-body{
                    max-height: 450px;
                    overflow: auto;
                    margin-top: 20px;
                    &::-webkit-scrollbar{
                        display: none;
                    }
                    .bodyitem{
                        display: flex;
                        align-items: center;
                        margin-bottom: 20px;
                        .itemimg{
                            width: 34px;
                            height: 34px;
                            border-radius: 50%;
                            overflow: hidden;
                            background-color: salmon;
                            img{
                                width: 100%;
                            }
                        }
                        .iteminfo{
                            margin-left: 10px;
                            display: flex;
                            flex: 1;
                            justify-content: space-between;
                            .to{
                                .name{
                                    font-size: 14px;
                                    color:#666;
                                
                                }
                                .con{
                                    span{
                                        color: #666;
                                    }
                                }
                            }
                            .zan{
                                font-size: 20px;
                                color: #ccc;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                p{
                                    font-size: 14px;
                                    color: #1a1a1a;
                                }
                            }
                        }
                    }
                }
                .inpl{
                    width: 100%;
                    height: 50px;
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    background-color: white;
                    input{
                        border: 0;
                        outline: none;
                        line-height: 40px;
                        width: 70%;
                        padding: 0 10px;
                        background-color: #ffffff;
                        font-size: 16px;
                        
                    }
                    span{
                        font-size: 30px;
                        color: #cccccc;
                    }
                    .iconfont{
                        font-size: 26px;
                        margin-left: 20px;
                    }
                }

            }
        }
}
</style>