import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  organizationName: [
    { required: true, message: "机构名称为必填项", trigger: "blur" }
  ],
  organizationType: [
    { required: true, message: "机构类型为必选项", trigger: "blur" }
  ],
  organizationAddress: [
    { required: true, message: "机构地址为必填项", trigger: "blur" }
  ],
  organizationPhone: [
    { required: true, message: "联系电话为必填项", trigger: "blur" }
  ],
  organizationHuman: [
    { required: true, message: "负责人姓名为必填项", trigger: "blur" }
  ],
  organizationState: [
    { required: true, message: "机构运营状态为必选项", trigger: "blur" }
  ]
});
