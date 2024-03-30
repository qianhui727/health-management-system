import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  groupName: [{ required: true, message: "队伍名称为必填项", trigger: "blur" }],
  groupScale: [
    { required: true, message: "队伍规模为必选项", trigger: "blur" }
  ],
  groupHuman: [
    { required: true, message: "队伍负责人为必填项", trigger: "blur" }
  ],
  groupPhone: [
    { required: true, message: "联系电话为必填项", trigger: "blur" }
  ],
  allocateState: [
    { required: true, message: "队伍分配状态为必选项", trigger: "blur" }
  ]
});
