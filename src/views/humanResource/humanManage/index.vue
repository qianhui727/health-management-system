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
const contentRef = ref();
const treeHeight = ref();
const activeName = ref("应急人员");

const {
  staffForm,
  healthForm,
  isShow,
  loading,
  staffColumns,
  healthColumns,
  rowStyle,
  dataList,
  pagination,
  onSearch,
  resetForm,
  openDialog,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange
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
  activeName.value = tab.paneName;
  onSearch(tab.paneName);
};
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="staffForm"
      v-if="activeName === '应急人员'"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="应急人员姓名：" prop="staffName">
        <el-input
          v-model="staffForm.staffName"
          placeholder="请输入应急人员姓名"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="工作单位：" prop="organization">
        <el-input
          v-model="staffForm.organization"
          placeholder="请输入工作单位"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="职称/职务：" prop="staffDuty">
        <el-input
          v-model="staffForm.staffDuty"
          placeholder="请输入职称/职务"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch('应急人员')"
        >
          搜索
        </el-button>
        <el-button
          :icon="useRenderIcon(Refresh)"
          @click="resetForm(formRef, '应急人员')"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-form
      ref="formRef"
      :inline="true"
      :model="healthForm"
      v-else
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="专家姓名：" prop="healthName">
        <el-input
          v-model="healthForm.healthName"
          placeholder="请输入专家姓名"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="工作单位：" prop="organization">
        <el-input
          v-model="healthForm.organization"
          placeholder="请输入工作单位"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="职称/职务：" prop="healthDuty">
        <el-input
          v-model="healthForm.healthDuty"
          placeholder="请输入职称/职务"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch('应急卫生专家')"
        >
          搜索
        </el-button>
        <el-button
          :icon="useRenderIcon(Refresh)"
          @click="resetForm(formRef, '应急卫生专家')"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <div
      ref="contentRef"
      :class="['flex', deviceDetection() ? 'flex-wrap' : '']"
    >
      <el-tabs
        style="width: 100%"
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="应急人员管理" name="应急人员"
          ><PureTableBar
            :class="[isShow && !deviceDetection() ? '!w-[60vw]' : 'w-full']"
            style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
            title=""
            :columns="staffColumns"
            @refresh="onSearch('应急人员')"
          >
            <template #buttons>
              <el-button
                type="primary"
                :icon="useRenderIcon(AddFill)"
                @click="openDialog('新增应急人员信息')"
              >
                新增应急人员
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
                :data="dataList"
                :columns="dynamicColumns"
                :pagination="pagination"
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
                    @click="openDialog('修改应急人员信息', row)"
                  >
                    修改
                  </el-button>
                  <el-popconfirm
                    :title="`是否确认删除${row.staffName}的这条数据`"
                    @confirm="handleDelete(row, '应急人员')"
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
        </el-tab-pane>
        <el-tab-pane label="应急卫生专家管理" name="应急卫生专家"
          ><PureTableBar
            :class="[isShow && !deviceDetection() ? '!w-[60vw]' : 'w-full']"
            style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
            title=""
            :columns="healthColumns"
            @refresh="onSearch('应急卫生专家')"
          >
            <template #buttons>
              <el-button
                type="primary"
                :icon="useRenderIcon(AddFill)"
                @click="openDialog('新增应急卫生专家信息')"
              >
                新增应急卫生专家
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
                :data="dataList"
                :columns="dynamicColumns"
                :pagination="pagination"
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
                    @click="openDialog('修改应急卫生专家信息', row)"
                  >
                    修改
                  </el-button>
                  <el-popconfirm
                    :title="`是否确认删除${row.healthName}的这条数据`"
                    @confirm="handleDelete(row, '应急卫生专家')"
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
          </PureTableBar></el-tab-pane
        >
      </el-tabs>
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
