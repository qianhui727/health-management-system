import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  expertName: [
    { required: true, message: "专家姓名为必填项", trigger: "blur" }
  ],
  expertField: [
    { required: true, message: "专家领域为必填项", trigger: "blur" }
  ],
  expertUnit: [
    { required: true, message: "所属单位为必填项", trigger: "blur" }
  ],
  expertPhone: [
    { required: true, message: "联系方式为必填项", trigger: "blur" }
  ]
});
