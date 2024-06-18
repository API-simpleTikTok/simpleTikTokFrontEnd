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
      <el-form-item label="视频描述">
        <el-input
          type="textarea"
          v-model="form.description"
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

defineOptions({
  name: 'Publish'
})

const router = useRouter()
const videoEl = ref<HTMLVideoElement | null>(null)
const videoUrl = ref<string | null>(null)

const form = ref({
  description: '',
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
  if (!form.value.description) {
    ElMessage.error('请输入视频描述')
    return
  }

  const formData = new FormData()
  formData.append('video', form.value.videoFile)
  formData.append('description', form.value.description)
/* 给后端 发请求之后发到桶里
  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.success) {
      ElMessage.success('上传成功')
      router.push('/home')
    } else {
      ElMessage.error('上传失败')
    }
  } catch (error) {
    ElMessage.error('上传过程中出现错误')
    console.error(error)
  }*/
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
