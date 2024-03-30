<!-- 首页收益图表组件 -->
<script setup lang="ts">
// import { useAppStore } from "@/store/modules/app";
// 获取设备信息（desktop或者mobile）
// const appStore = useAppStore();
defineOptions({
  name: "totalData"
});
</script>

<template>
  <div class="flex flex-col justify-between h-[35vh]">
    卡片内容根据需求内容定制，可能为表格或者图表等类型；
    <br />
    右侧卡片只是一个示例，需要根据自己的需求去改
  </div>
</template>

<style>
.search-label {
  font-size: 15px;
  margin-right: 20px;
}

.radio-group {
  margin-right: 20px;
}

.export-button {
  margin-left: 20px;
}
/* .popperClass {
  width: 10px;
} */

@media (max-width: 768px) {
  .el-date-range-picker .el-picker-panel__body {
    min-width: 100%;
  }

  .el-date-range-picker__content {
    width: 100% !important;
  }

  .el-date-range-picker {
    width: 80% !important;
  }

  .el-date-range-picker__content {
    margin: 0px;
    padding: 5px;
  }

  .el-date-range-picker__content.is-left {
    padding-bottom: 0px;
  }

  .el-date-range-picker__content.is-right {
    padding-top: 0px;
  }

  .el-date-table th {
    padding: 0px;
  }

  .el-date-table td {
    padding: 0px;
  }
}
</style>
