<!-- 低液量设备信息组件 -->
<template>
  <div class="flex flex-col justify-between h-[24vh]">
    <div class="header">
      <label class="">液量低的泡泡机:</label>
      <label class=""
        ><span style="color: red">{{
          props.lowLiquidEquipmentData.length
        }}</span>
        / {{ total }}</label
      >
    </div>
    <el-table :data="trueData" fit>
      <el-table-column
        label="所属投放点名称"
        min-width="120"
        prop="dropoffName"
        align="center"
      />
      <el-table-column
        label="泡泡机ID"
        min-width="100"
        prop="equipmentNum"
        align="center"
      />
      <el-table-column
        label="当前液量"
        min-width="100"
        prop="curLiquid"
        align="center"
        ><template v-slot="{ row }">
          {{ row.curLiquid }}%
        </template></el-table-column
      >
    </el-table>
    <div>
      <el-pagination
        class="flex justify-center items-center"
        @current-change="handlePageChange"
        layout="prev, pager, next"
        v-model:current-page="curPage"
        :page-size="pageSize"
        :total="props.lowLiquidEquipmentData.length"
      />
      <!-- 更多部分 -->
      <div class="flex justify-between items-center">
        <span class="more-text" @click="showMore">更多</span
        ><el-icon color="black" @click="showMore"><DArrowRight /></el-icon>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="moreCardVisible"
    title="液量低的泡泡机"
    :before-close="() => (moreCardVisible = false)"
    width="60vw"
  >
    <el-table :data="trueMoreData" fit>
      <el-table-column
        label="所属投放点名称"
        min-width="120"
        prop="dropoffName"
        align="center"
      />
      <el-table-column
        label="泡泡机ID"
        min-width="100"
        prop="equipmentNum"
        align="center"
      />
      <el-table-column
        label="当前液量"
        min-width="100"
        prop="curLiquid"
        align="center"
        ><template v-slot="{ row }">
          {{ row.curLiquid }}%
        </template></el-table-column
      >
    </el-table>
    <el-pagination
      class="flex justify-center items-center h-full"
      @current-change="handleMorePageChange"
      layout="prev, pager, next"
      v-model:current-page="curMorePage"
      :page-size="MorePageSize"
      :total="props.lowLiquidEquipmentData.length"
    />
  </el-dialog>
</template>

<script setup lang="ts">
defineOptions({
  name: "connectedInstitutions"
});
import { defineProps, ref, onMounted, watch } from "vue";
const props = defineProps({
  lowLiquidEquipmentData: {
    type: Array,
    default: []
  },
  total: {
    type: Number,
    default: 10
  }
});
// 分页数据配置
const curPage = ref(1);
const pageSize = 4;
const trueData = ref([]);
const moreCardVisible = ref(false);
// 更多页中的分页配置
const curMorePage = ref(1);
const MorePageSize = 8;
const trueMoreData = ref([]);
// 监听切换页面操作
watch(
  () => curPage.value,
  () => {
    updatePageData();
  }
);
watch(
  () => curMorePage.value,
  () => {
    updateMorePageData();
  }
);
// 监听数据更新情况
watch(
  () => props.lowLiquidEquipmentData,
  newData => {
    trueData.value = newData.slice(0, pageSize);
    curPage.value = 1;
    trueMoreData.value = newData.slice(0, MorePageSize);
  }
);
onMounted(() => {
  updatePageData();
  updateMorePageData();
});
// 切换页面即更新表格内数据
const updatePageData = () => {
  const start = (curPage.value - 1) * pageSize;
  const end = start + pageSize;
  trueData.value = props.lowLiquidEquipmentData.slice(start, end);
};
const updateMorePageData = () => {
  const start = (curMorePage.value - 1) * MorePageSize;
  const end = start + MorePageSize;
  trueMoreData.value = props.lowLiquidEquipmentData.slice(start, end);
};
// 切换时更新页码
const handlePageChange = newPage => {
  curPage.value = newPage;
};
const handleMorePageChange = newPage => {
  curMorePage.value = newPage;
};
const showMore = () => {
  moreCardVisible.value = true;
};
</script>

<style scoped>
.more-section {
  text-align: right;
  display: flex;
  align-items: center;
}

.more-text {
  color: rgba(0, 0, 0, 0.6);
  margin-left: auto;
  cursor: pointer;
}
.header {
  /* padding: right 1.5rem; */
  display: flex;
  justify-content: space-between;
}
</style>
