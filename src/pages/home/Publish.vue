<template>
  <div class="publish">
    <el-form :model="form" ref="formRef" label-width="80px" class="form">
      <el-form-item style="margin-left: -70px;">
        <div v-if="videoUrl" class="video-container">
          <video ref="videoEl" controls :src="videoUrl" class="video"></video>
        </div>
      </el-form-item>
      <el-form-item label="上传视频">
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="handleFileChange"
          :show-file-list="false"
          :auto-upload="false"
        >
          <el-button type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频标题">
        <el-input v-model="form.title" placeholder="请输入视频标题"></el-input>
      </el-form-item>
      <el-form-item label="视频描述">
        <el-input
          type="textarea"
          v-model="form.desc"
          placeholder="请输入视频描述"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确定上传</el-button>
      </el-form-item>
    </el-form>

    <!-- Include BaseFooter with init-tab set to 3 -->
    <BaseFooter v-bind:init-tab="3" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import BaseFooter from '../../components/BaseFooter.vue'
import axios from 'axios'
import * as qiniu from 'qiniu-js'
import moment from 'moment';
defineOptions({
  name: 'Publish'
})

const router = useRouter()
const videoEl = ref<HTMLVideoElement | null>(null)
const videoUrl = ref<string | null>(null)

const form = ref({
  title: '',
  desc: '',
  videoFile: null as File | null
})

const formRef = ref()

const handleFileChange = (file: File) => {
  form.value.videoFile = file.raw
  videoUrl.value = URL.createObjectURL(file.raw)
}

const handleSubmit = async () => {

    
  if (!form.value.videoFile) {
    ElMessage.error('请上传视频')
    return
  }
  if (!form.value.title) {
    ElMessage.error('请输入视频标题')
    return
  }
  if (!form.value.desc) {
    ElMessage.error('请输入视频描述')
    return
  }

  const formData = new FormData()
  formData.append('video', form.value.videoFile)
  formData.append('title', form.value.title)
  formData.append('desc', form.value.desc)
  formData.append('create_time', new Date().toISOString()) // create_time is current time

  try {
    // 获得token
    // const author = "guwodianying"
    const author = sessionStorage.getItem("tiktokAuthor")
    console.log("author=",author)
    let url = `http://localhost:3030/user/getUploadToken?author=${author}`;
    const res = await axios.get(url,{headers:{
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    }});
    console.log("res.data.data=",res.data.data)
    const uploadToken = res.data.data.data.upToken;
      // 配置上传参数
    console.log("uploadToken=",uploadToken)
    const putExtra = {
      fname: form.value.videoFile.name,
      params: {},
    //   mimeType: ["video/*"] // 只允许上传视频类型
    };
    const config = {
    //   useCdnDomain: true,//表示是否使用 cdn 加速域名
      region: qiniu.region.z1 // 根据你选择的区域设置
    };
      const observable = qiniu.upload(form.value.videoFile, form.value.videoFile.name, uploadToken, putExtra, config);
      //上传
          observable.subscribe({
      next(response) {
        console.log('上传中...', response);
      },
      error(err) {
        console.error('上传失败', err);
        ElMessage.error('视频上传失败');
      },
      complete(response) {
        console.log('上传完成', response);
        ElMessage.success('视频上传桶成功');
        // 上传完成后执行后续逻辑，比如跳转页面或更新状态
        //上传给后端
        const BASE_BUCKET = "http://sen0fbsqd.hb-bkt.clouddn.com/";
        console.log("url=",BASE_BUCKET + form.value.videoFile.name)
        //生成时间
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(currentTime);
        axios.post('http://localhost:3030/video/upload', 
            { 
                title: form.value.title,
                author: sessionStorage.getItem("tiktokAuthor"), 
                desc: form.value.desc,
                cover: "",
                url: BASE_BUCKET + form.value.videoFile.name,
                isTop: 1,
                createTime: currentTime
            },
            {headers:{
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    }}
          ).then(response => {
                //上传成功
                ElMessage.success('视频上传服务器成功');
        })
        .catch(error => {
            // 处理登录失败的情况
            ElMessage.error('上传服务器失败哦');
            console.error('登录失败:', error);
        });
      }
    });
  } catch (error) {
    ElMessage.error('上传过程中出现错误')
    console.error(error)
  }
}

onMounted(() => {
  videoEl.value = document.getElementById('video') as HTMLVideoElement
})
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.publish {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  background: black;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    width: 90%;
    max-width: 500px;
    background: #333;
    padding: 20px;
    border-radius: 10px;
  }

  .upload-demo {
    width: 100%;
  }

  .video-container {
    margin-top: 10px;
    display: flex;
    justify-content: center;

    .video {
      width: 100%;
      max-height: 300px;
      border-radius: 10px;
    }
  }
}
</style>