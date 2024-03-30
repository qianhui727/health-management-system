import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const staffFormRules = reactive(<FormRules>{
  staffName: [
    { required: true, message: "应急人员姓名为必填项", trigger: "blur" }
  ],
  staffSex: [{ required: true, message: "性别为必选项", trigger: "blur" }],
  staffDuty: [
    { required: true, message: "职称/职务为必填项", trigger: "blur" }
  ],
  organization: [
    { required: true, message: "工作单位为必填项", trigger: "blur" }
  ],
  staffPhone: [
    { required: true, message: "联系电话为必填项", trigger: "blur" }
  ],
  emergencyPrepare: [
    { required: true, message: "应急备勤为必填项", trigger: "blur" }
  ],
  emergencyTask: [
    { required: true, message: "应急任务为必填项", trigger: "blur" }
  ],
  trainingRecord: [
    { required: true, message: "培训记录为必填项", trigger: "blur" }
  ],
  testRecord: [{ required: true, message: "考核记录为必填项", trigger: "blur" }]
});
/** 自定义表单规则校验 */
export const healthFormRules = reactive(<FormRules>{
  healthName: [
    { required: true, message: "专家姓名为必填项", trigger: "blur" }
  ],
  healthSex: [{ required: true, message: "性别为必选项", trigger: "blur" }],
  healthID: [{ required: true, message: "身份证号为必填项", trigger: "blur" }],
  healthDuty: [
    { required: true, message: "职称/职务为必填项", trigger: "blur" }
  ],
  organization: [
    { required: true, message: "工作单位为必填项", trigger: "blur" }
  ],
  healthPhone: [
    { required: true, message: "联系电话为必填项", trigger: "blur" }
  ]
});
