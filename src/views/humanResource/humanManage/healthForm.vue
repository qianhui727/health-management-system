<script setup lang="ts">
import { ref } from "vue";
import { healthFormRules } from "./utils/rule";
import { HealthProps } from "./utils/types";

const props = withDefaults(defineProps<HealthProps>(), {
  formInHealth: () => ({
    id: "",
    healthName: "",
    healthSex: "",
    healthID: "",
    healthDuty: "",
    organization: "",
    healthPhone: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInHealth);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="healthFormRules"
    label-width="100px"
  >
    <el-form-item label="专家姓名：" prop="healthName">
      <el-input
        v-model="newFormInline.healthName"
        clearable
        placeholder="请输入应急人员姓名"
      />
    </el-form-item>

    <el-form-item label="性别：" prop="healthSex">
      <el-select
        v-model="newFormInline.healthSex"
        placeholder="请选择性别"
        clearable
      >
        <el-option label="男" value="男" />
        <el-option label="女" value="女"
      /></el-select>
    </el-form-item>
    <el-form-item label="身份证号：" prop="healthID">
      <el-input
        v-model="newFormInline.healthID"
        clearable
        placeholder="请输入身份证号"
      />
    </el-form-item>
    <el-form-item label="职称/职务：" prop="healthDuty">
      <el-input
        v-model="newFormInline.healthDuty"
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
    <el-form-item label="联系电话：" prop="healthPhone">
      <el-input
        v-model="newFormInline.healthPhone"
        clearable
        placeholder="请输入联系电话"
      />
    </el-form-item>
  </el-form>
</template>
