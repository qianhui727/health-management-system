<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    groupName: "",
    groupScale: "",
    organizationName: "",
    groupMember: "",
    groupHuman: "",
    groupPhone: null,
    allocateState: "",
    trainingRecord: "",
    testRecord: ""
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
    label-width="120px"
  >
    <el-form-item label="队伍名称：" prop="groupName">
      <el-input
        v-model="newFormInline.groupName"
        clearable
        placeholder="请输入应急队伍名称"
      />
    </el-form-item>
    <el-form-item label="队伍规模：" prop="groupScale">
      <el-select
        v-model="newFormInline.groupScale"
        placeholder="请选择队伍规模"
        clearable
      >
        <el-option label="0-20" value="0-20" />
        <el-option label="20-99" value="20-99" />
        <el-option label="100-499" value="100-499" />
        <el-option label="500-999" value="500-999" />
        <el-option label="1000+" value="1000+" />
      </el-select>
    </el-form-item>
    <el-form-item label="所在机构：" prop="organizationName">
      <el-input
        v-model="newFormInline.organizationName"
        clearable
        placeholder="请输入所在机构名称"
      />
    </el-form-item>
    <el-form-item label="成员列表：" prop="groupMember">
      <el-input
        v-model="newFormInline.groupMember"
        clearable
        placeholder="请输入成员（至少两位）"
      />
    </el-form-item>
    <el-form-item label="负责人：" prop="groupHuman">
      <el-input
        v-model="newFormInline.groupHuman"
        clearable
        placeholder="请输入负责人姓名"
      />
    </el-form-item>
    <el-form-item label="联系电话：" prop="groupPhone">
      <el-input
        v-model="newFormInline.groupPhone"
        clearable
        placeholder="请输入联系电话"
      />
    </el-form-item>
    <el-form-item label="分配状态：" prop="allocateState">
      <el-select
        v-model="newFormInline.allocateState"
        placeholder="请选择状态"
        clearable
      >
        <el-option label="待分配" value="待分配" />
        <el-option label="分配中" value="分配中" />
        <el-option label="已分配" value="已分配" />
      </el-select>
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
