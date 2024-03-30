// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  organizationName: string;
  organizationType: string;
  organizationAddress: string;
  organizationPhone: number;
  organizationHuman: string;
  organizationInfo: string;
  organizationState: string;
  createTime: number;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
