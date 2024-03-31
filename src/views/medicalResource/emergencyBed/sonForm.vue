<script setup lang="ts">
import { ref } from "vue";
import { sonFormRules } from "./utils/rule";
import { SonProps } from "./utils/types";

const props = withDefaults(defineProps<SonProps>(), {
  formInSon: () => ({
    id: "",
    organizationName: "",
    location: "",
    bedState: "",
    bedParam: "",
    bedType: "",
    facilityCondition: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInSon);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="sonFormRules"
    label-width="125px"
  >
    <el-form-item label="机构名称：" prop="organizationName">
      <el-input
        v-model="newFormInline.organizationName"
        clearable
        placeholder="请输入机构名称"
      />
    </el-form-item>

    <el-form-item label="详细位置：" prop="location">
      <el-input
        v-model="newFormInline.location"
        clearable
        placeholder="请输入详细位置"
      />
    </el-form-item>
    <el-form-item label="床位状态：" prop="bedState">
      <el-select
        v-model="newFormInline.bedState"
        placeholder="请选择床位状态"
        clearable
      >
        <el-option label="空闲" value="空闲" />
        <el-option label="占用" value="占用" />
        <el-option label="预定" value="预定" />
        <el-option label="维护" value="维护" />
      </el-select>
    </el-form-item>
    <el-form-item label="床位参数：" prop="bedParam">
      <el-input
        v-model="newFormInline.bedParam"
        clearable
        placeholder="请输入床位参数"
      />
    </el-form-item>
    <el-form-item label="床位类型：" prop="bedType">
      <el-select
        v-model="newFormInline.bedType"
        placeholder="请选择床位类型"
        clearable
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
    <el-form-item label="基本设施情况：" prop="facilityCondition">
      <el-input
        v-model="newFormInline.facilityCondition"
        clearable
        placeholder="请输入基本设施情况"
      />
    </el-form-item>
  </el-form>
</template>
