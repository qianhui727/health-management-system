import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  medicalName: [
    { required: true, message: "机构名称为必填项", trigger: "blur" }
  ],
  equipmentCode: [
    { required: true, message: "设备代号为必选项", trigger: "blur" }
  ],
  equipmentName: [
    { required: true, message: "设备名称为必填项", trigger: "blur" }
  ],
  entrance: [{ required: true, message: "是否进口为必选项", trigger: "blur" }],
  manufacturer: [
    { required: true, message: "生产厂家为必填项", trigger: "blur" }
  ],
  equipmentType: [
    { required: true, message: "设备型号为必填项", trigger: "blur" }
  ],
  purchaseTime: [
    { required: true, message: "购买日期机构名称为必填项", trigger: "blur" }
  ],
  newEquipment: [
    { required: true, message: "是否为新设备为必选项", trigger: "blur" }
  ],
  purchasePrice: [
    { required: true, message: "购买价格为必填项", trigger: "blur" }
  ],
  principal: [
    { required: true, message: "单位负责人为必填项", trigger: "blur" }
  ],
  preparer: [{ required: true, message: "填表人为必填项", trigger: "blur" }],
  submitTime: [{ required: true, message: "报出日期为必填项", trigger: "blur" }]
});
