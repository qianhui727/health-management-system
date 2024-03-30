// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  expertName: string;
  expertField: string;
  expertUnit: string;
  expertDuty: string;
  expertPhone: string;
  expertState: string;
}
interface FormProps {
  formInline: FormItemProps;
  isEdit: boolean;
  isChecked: boolean;
}

export type { FormItemProps, FormProps };
