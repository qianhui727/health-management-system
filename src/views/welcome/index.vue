<template>
  <div class="flex flex-col">
    <div class="flex mt-4 justify-between">
      <!-- 第一个卡片 -->
      <div class="w-[74.66666666666%]">
        <el-card shadow="hover">
          <!-- 内容 -->
          <totalData />
        </el-card>
      </div>
      <!-- 第二个卡片 -->
      <div class="w-[24%]">
        <el-card shadow="hover">
          <!-- 内容 -->
          <connectedInstitutions />
        </el-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
import connectedInstitutions from "./components/connectedInstitutions.vue";
import totalData from "./components/totalData.vue";
</script>
