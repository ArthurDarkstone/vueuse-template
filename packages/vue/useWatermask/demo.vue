<script setup lang="ts">
import { useWatermask } from 'utils-vue'

const { width, height, rotate, fill, fontSize, opacity, content } = useWatermask()
</script>

<template>
  <div>
    <div class="flex items-center">
      <span class="mr-5px text-18px w-30">
        宽度 :
      </span>
      <input v-model="width" type="text">
    </div>
    <div class="flex items-center">
      <span class="mr-5px text-18px w-30">
        高度 :
      </span>
      <input v-model="height" type="text">
    </div>
    <div class="flex items-center">
      <span class="mr-5px text-18px w-30">
        旋转 :
      </span>
      <input v-model="rotate" type="number">
    </div>
    <div class="flex items-center">
      <span class="mr-5px text-18px w-30">
        填充 :
      </span>
      <input v-model="fill" type="text">
    </div>
    <div class="flex items-center">
      <span class="mr-5px text-18px w-30">
        字体大小 :
      </span>
      <input v-model="fontSize" type="text">
    </div>
    <div class="flex items-center">
      <span class="mr-5px text-18px w-30">
        透明度 :
      </span>
      <input v-model="opacity" type="text">
    </div>
    <div class="flex items-center">
      <span class="mr-5px text-18px w-30">
        内容 :
      </span>
      <input v-model="content" type="text">
    </div>
  </div>
</template>
