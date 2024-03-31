<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { formatTime } from "@/utils/formatUtils";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    medicalName: " ",
    equipmentCode: " ",
    equipmentName: " ",
    entrance: true,
    manufacturer: " ",
    equipmentType: " ",
    purchaseTime: null,
    newEquipment: " ",
    purchasePrice: " ",
    designedLife: " ",
    sampleNum: null,
    principal: " ",
    preparer: " ",
    submitTime: null
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
    label-width="135px"
  >
    <el-form-item label="机构名称：" prop="medicalName">
      <el-input
        v-model="newFormInline.medicalName"
        clearable
        placeholder="请输入机构名称"
      />
    </el-form-item>
    <el-form-item label="设备代号：" prop="equipmentCode">
      <el-input
        v-model="newFormInline.equipmentCode"
        clearable
        placeholder="请输入设备代号"
      />
    </el-form-item>
    <el-form-item label="设备名称：" prop="equipmentName">
      <el-input
        v-model="newFormInline.equipmentName"
        clearable
        placeholder="请输入设备名称"
      />
    </el-form-item>
    <el-form-item label="是否进口：" prop="entrance">
      <el-select
        v-model="newFormInline.entrance"
        placeholder="请选择是否进口"
        clearable
      >
        <el-option label="是" value="是" />
        <el-option label="否" value="否" />
      </el-select>
    </el-form-item>
    <el-form-item label="生产厂家：" prop="manufacturer">
      <el-input
        v-model="newFormInline.manufacturer"
        clearable
        placeholder="请输入生产厂家"
      />
    </el-form-item>
    <el-form-item label="设备型号：" prop="equipmentType">
      <el-input
        v-model="newFormInline.equipmentType"
        clearable
        placeholder="请输入设备型号"
      />
    </el-form-item>
    <el-form-item label="购买日期：" prop="purchaseTime">
      <el-date-picker
        v-model="newFormInline.purchaseTime"
        :placeholder="formatTime(new Date(), 'yyyy-MM-dd')"
        type="date"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="是否为新设备：" prop="newEquipment">
      <el-select
        v-model="newFormInline.newEquipment"
        placeholder="请选择是否为新设备"
        clearable
      >
        <el-option label="是" value="是" />
        <el-option label="否" value="否" />
      </el-select>
    </el-form-item>
    <el-form-item label="购买价格：" prop="purchasePrice">
      <el-input
        v-model="newFormInline.purchasePrice"
        clearable
        placeholder="请输入购买价格"
      />
    </el-form-item>
    <el-form-item label="设计寿命：" prop="designedLife">
      <el-input
        v-model="newFormInline.designedLife"
        clearable
        placeholder="请输入设计寿命"
      />
    </el-form-item>
    <el-form-item label="检查/治疗/标本数：" prop="sampleNum">
      <el-input
        v-model="newFormInline.sampleNum"
        clearable
        placeholder="请输入检查/治疗/标本数"
      />
    </el-form-item>
    <el-form-item label="单位负责人：" prop="principal">
      <el-input
        v-model="newFormInline.principal"
        clearable
        placeholder="请输入单位负责人"
      />
    </el-form-item>
    <el-form-item label="填表人：" prop="preparer">
      <el-input
        v-model="newFormInline.preparer"
        clearable
        placeholder="请输入填表人"
      />
    </el-form-item>
    <el-form-item label="报出日期：" prop="submitTime">
      <el-date-picker
        v-model="newFormInline.submitTime"
        :placeholder="formatTime(new Date(), 'yyyy-MM-dd')"
        type="date"
        style="width: 100%"
      />
    </el-form-item>
  </el-form>
</template>
