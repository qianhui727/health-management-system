<script setup lang="ts">
import { ref } from "vue";
import { staffFormRules } from "./utils/rule";
import { StaffProps } from "./utils/types";

const props = withDefaults(defineProps<StaffProps>(), {
  formInStaff: () => ({
    id: "",
    staffName: "",
    staffSex: "",
    staffDuty: "",
    organization: "",
    staffPhone: "",
    emergencyPrepare: "",
    emergencyTask: "",
    trainingRecord: "",
    testRecord: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInStaff);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="staffFormRules"
    label-width="125px"
  >
    <el-form-item label="应急人员姓名：" prop="staffName">
      <el-input
        v-model="newFormInline.staffName"
        clearable
        placeholder="请输入应急人员姓名"
      />
    </el-form-item>

    <el-form-item label="性别：" prop="staffSex">
      <el-select
        v-model="newFormInline.staffSex"
        placeholder="请选择性别"
        clearable
      >
        <el-option label="男" value="男" />
        <el-option label="女" value="女"
      /></el-select>
    </el-form-item>
    <el-form-item label="职称/职务：" prop="staffDuty">
      <el-input
        v-model="newFormInline.staffDuty"
        clearable
        placeholder="请输入职称/职务"
      />
    </el-form-item>
    <el-form-item label="工作单位：" prop="organization">
      <el-input
        v-model="newFormInline.organization"
        clearable
        placeholder="请输入工作单位"
      />
    </el-form-item>
    <el-form-item label="联系电话：" prop="staffPhone">
      <el-input
        v-model="newFormInline.staffPhone"
        clearable
        placeholder="请输入联系电话"
      />
    </el-form-item>
    <el-form-item label="应急备勤：" prop="emergencyPrepare">
      <el-input
        v-model="newFormInline.emergencyPrepare"
        clearable
        placeholder="请输入应急备勤"
      />
    </el-form-item>
    <el-form-item label="应急任务：" prop="emergencyTask">
      <el-input
        v-model="newFormInline.emergencyTask"
        clearable
        placeholder="请输入应急任务"
      />
    </el-form-item>
    <el-form-item label="培训记录：" prop="trainingRecord">
      <el-input
        v-model="newFormInline.trainingRecord"
        clearable
        placeholder="请输入培训记录"
      />
    </el-form-item>
    <el-form-item label="考核记录：" prop="testRecord">
      <el-input
        v-model="newFormInline.testRecord"
        clearable
        placeholder="请输入考核记录"
      />
    </el-form-item>
  </el-form>
</template>
