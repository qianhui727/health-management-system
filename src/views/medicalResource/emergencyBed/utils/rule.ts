import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const fatherFormRules = reactive(<FormRules>{
  organizationName: [
    { required: true, message: "机构名称为必填项", trigger: "blur" }
  ],
  location: [{ required: true, message: "详细位置为必填项", trigger: "blur" }],
  bedState: [{ required: true, message: "床位状态为必选项", trigger: "blur" }],

  bedParam: [{ required: true, message: "床位参数为必填项", trigger: "blur" }],
  bedType: [{ required: true, message: "床位类型为必选项", trigger: "blur" }],
  facilityCondition: [
    { required: true, message: "基本设施情况为必填项", trigger: "blur" }
  ]
});
/** 自定义表单规则校验 */
export const sonFormRules = reactive(<FormRules>{
  organizationName: [
    { required: true, message: "机构名称为必填项", trigger: "blur" }
  ],
  location: [{ required: true, message: "详细位置为必填项", trigger: "blur" }],
  bedState: [{ required: true, message: "床位状态为必选项", trigger: "blur" }],

  bedParam: [{ required: true, message: "床位参数为必填项", trigger: "blur" }],
  bedType: [{ required: true, message: "床位类型为必选项", trigger: "blur" }],
  facilityCondition: [
    { required: true, message: "基本设施情况为必填项", trigger: "blur" }
  ]
});
