<script setup lang="ts">
import { useHuman } from "./utils/hook";
import { ref, computed, nextTick, onMounted } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import {
  delay,
  subBefore,
  deviceDetection,
  useResizeObserver
} from "@pureadmin/utils";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import View from "@iconify-icons/ep/view";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "humanManage"
});

const iconClass = computed(() => {
  return [
    "w-[22px]",
    "h-[22px]",
    "flex",
    "justify-center",
    "items-center",
    "outline-none",
    "rounded-[4px]",
    "cursor-pointer",
    "transition-colors",
    "hover:bg-[#0000000f]",
    "dark:hover:bg-[#ffffff1f]",
    "dark:hover:text-[#ffffffd9]"
  ];
});

const treeRef = ref();
const formRef = ref();
const tableRef = ref();
const fatherId = ref();
const contentRef = ref();
const treeHeight = ref();
// const flagSun = ref(false);

const {
  fatherForm,
  isShow,
  loading,
  fatherColumns,
  sonColumns,
  rowStyle,
  dataListFa,
  dataListSon,
  paginationFa,
  paginationSon,
  onSearch,
  resetForm,
  openDialog,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  flagSun
} = useHuman(treeRef);

onMounted(() => {
  useResizeObserver(contentRef, async () => {
    await nextTick();
    delay(60).then(() => {
      treeHeight.value = parseFloat(
        subBefore(tableRef.value.getTableDoms().tableWrapper.style.height, "px")
      );
    });
  });
});
const handleClick = function (tab) {
  fatherId.value = tab.id;
  onSearch(tab.id);
  console.log(fatherId.value, "tab");
};
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="fatherForm"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="机构名称：" prop="organizationName">
        <el-input
          v-model="fatherForm.organizationName"
          placeholder="请输入机构名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="床位状态：" prop="bedState">
        <el-select
          v-model="fatherForm.bedState"
          placeholder="请选择床位状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="空闲" value="空闲" />
          <el-option label="占用" value="占用" />
          <el-option label="预定" value="预定" />
          <el-option label="维护" value="维护" />
        </el-select>
      </el-form-item>
      <el-form-item label="床位类型：" prop="bedType">
        <el-select
          v-model="fatherForm.bedType"
          placeholder="请选择床位类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="普通病床" value="普通病床" />
          <el-option label="重症监护床" value="重症监护床" />
          <el-option label="隔离床" value="隔离床" />
          <el-option label="急诊床" value="急诊床" />
          <el-option label="康复床" value="康复床" />
          <el-option label="产科床" value="产科床" />
          <el-option label="儿科床" value="儿科床" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch('应急床位')"
        >
          搜索
        </el-button>
        <el-button
          :icon="useRenderIcon(Refresh)"
          @click="resetForm(formRef, '应急床位')"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <div ref="contentRef" :class="[deviceDetection() ? 'flex-wrap' : '']">
      <PureTableBar
        :class="[isShow && !deviceDetection() ? '!w-[60vw]' : 'w-full']"
        style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
        title="本机构应急床位管理"
        :columns="fatherColumns"
        @refresh="onSearch('应急床位')"
      >
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog('新增应急床位信息')"
          >
            新增应急床位信息
          </el-button>
        </template>
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            ref="tableRef"
            align-whole="center"
            showOverflowTooltip
            table-layout="auto"
            :loading="loading"
            :size="size"
            adaptive
            :row-style="rowStyle"
            :adaptiveConfig="{ offsetBottom: 108 }"
            :data="dataListFa"
            :columns="dynamicColumns"
            :pagination="paginationFa"
            :paginationSmall="size === 'small' ? true : false"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @selection-change="handleSelectionChange"
            @page-size-change="handleSizeChange"
            @page-current-change="handleCurrentChange"
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog('修改应急床位信息', row)"
              >
                修改
              </el-button>
              <el-popconfirm
                :title="`是否确认删除这条数据`"
                @confirm="handleDelete(row, '本机机构')"
              >
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(View)"
                @click="handleClick(row)"
              >
                查看下级单位
              </el-button>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
      <PureTableBar
        :class="[isShow && !deviceDetection() ? '!w-[60vw]' : 'w-full']"
        style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
        title="下级单位应急床位管理"
        :columns="sonColumns"
        @refresh="onSearch"
        v-if="flagSun"
      >
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog('新增', '', fatherId)"
          >
            新增应急床位信息
          </el-button>
        </template>
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            style="height: 366px"
            ref="tableRef"
            align-whole="center"
            showOverflowTooltip
            table-layout="auto"
            :loading="loading"
            :size="size"
            adaptive
            :row-style="rowStyle"
            :adaptiveConfig="{ offsetBottom: 108 }"
            :data="dataListSon"
            :columns="dynamicColumns"
            :pagination="paginationSon"
            :paginationSmall="size === 'small' ? true : false"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @selection-change="handleSelectionChange"
            @page-size-change="handleSizeChange"
            @page-current-change="handleCurrentChange"
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog('修改', row, fatherId)"
              >
                修改
              </el-button>
              <el-popconfirm
                :title="`是否确认删除这条数据`"
                @confirm="handleDelete(row, '下级单位', fatherId)"
              >
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
:deep(.el-tabs__content) {
  margin-top: -55px;
}
:deep(.el-tabs__item) {
  font-weight: 700;
  font-size: 16px;
}

:deep(.el-tabs__header) {
  width: 80%;
  top: 16px;
  left: 9px;
}
</style>
