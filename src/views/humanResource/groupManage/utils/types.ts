// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  groupName: string;
  groupScale: string;
  organizationName: string;
  groupMember: string;
  groupHuman: string;
  groupPhone: number;
  allocateState: string;
  trainingRecord: string;
  testRecord: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
