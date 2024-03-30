<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    expertName: "",
    expertField: "",
    expertUnit: "",
    expertDuty: "",
    expertPhone: "",
    expertState: ""
  }),
  isEdit: false,
  isChecked: false
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}
defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="100px"
    :disabled="isEdit"
  >
    <el-form-item label="专家姓名：" prop="expertName">
      <el-input
        v-model="newFormInline.expertName"
        placeholder="请输入专家姓名"
        clearable
      />
    </el-form-item>
    <el-form-item label="专业领域：" prop="expertField">
      <el-input
        v-model="newFormInline.expertField"
        placeholder="请输入专业领域"
        clearable
      />
    </el-form-item>
    <el-form-item label="所属单位：" prop="expertUnit">
      <el-input
        v-model="newFormInline.expertUnit"
        placeholder="请输入所属单位"
        clearable
      />
    </el-form-item>
    <el-form-item label="职务/职称：" prop="expertDuty">
      <el-input
        v-model="newFormInline.expertDuty"
        placeholder="请输入职务/职称"
        clearable
      />
    </el-form-item>
    <el-form-item label="联系方式：" prop="expertPhone">
      <el-input
        v-model="newFormInline.expertPhone"
        placeholder="请输入联系方式"
        clearable
      />
    </el-form-item>
    <el-form-item v-if="isChecked" label="审核状态：" prop="expertState">
      <el-radio-group v-model="newFormInline.expertState" clearable>
        <el-radio value="审核通过">审核通过</el-radio>
        <el-radio value="审核不通过">审核不通过</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
