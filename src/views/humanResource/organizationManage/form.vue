<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { formatTime } from "@/utils/formatUtils";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    organizationName: "",
    organizationType: "",
    organizationAddress: "",
    organizationPhone: null,
    organizationHuman: "",
    organizationInfo: "",
    organizationState: "",
    createTime: null
  })
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
    label-width="125px"
  >
    <el-form-item label="机构名称：" prop="organizationName">
      <el-input
        v-model="newFormInline.organizationName"
        clearable
        placeholder="请输入机构名称"
      />
    </el-form-item>

    <el-form-item label="机构类型：" prop="organizationType">
      <el-select
        v-model="newFormInline.organizationType"
        placeholder="请选择机构类型"
        clearable
      >
        <el-option label="疾控中心" value="疾控中心" />
        <el-option label="卫生监督所" value="卫生监督所" />
        <el-option label="医疗机构" value="医疗机构" />
        <el-option label="社区卫生服务中心" value="社区卫生服务中心" />
        <el-option label="中心血站" value="中心血站" />
        <el-option label="急救医疗指挥中心" value="急救医疗指挥中心" />
      </el-select>
    </el-form-item>
    <el-form-item label="机构地址：" prop="organizationAddress">
      <el-input
        v-model="newFormInline.organizationAddress"
        clearable
        placeholder="请输入机构地址"
      />
    </el-form-item>
    <el-form-item label="联系电话：" prop="organizationPhone">
      <el-input
        v-model="newFormInline.organizationPhone"
        clearable
        placeholder="请输入联系电话"
      />
    </el-form-item>
    <el-form-item label="负责人姓名：" prop="organizationHuman">
      <el-input
        v-model="newFormInline.organizationHuman"
        clearable
        placeholder="请输入负责人姓名"
      />
    </el-form-item>
    <el-form-item label="机构简介：" prop="organizationInfo">
      <el-input
        v-model="newFormInline.organizationInfo"
        clearable
        placeholder="请输入机构简介"
      />
    </el-form-item>
    <el-form-item label="状态：" prop="organizationState">
      <el-select
        v-model="newFormInline.organizationState"
        placeholder="请选择状态"
        clearable
      >
        <el-option label="运营中" value="运营中" />
        <el-option label="暂停运营" value="暂停运营" />
      </el-select>
    </el-form-item>
    <el-form-item label="机构成立时间：" prop="createTime">
      <el-date-picker
        v-model="newFormInline.createTime"
        :placeholder="formatTime(new Date(), 'yyyy-MM-dd')"
        type="date"
        style="width: 100%"
      />
    </el-form-item>
  </el-form>
</template>
