// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  medicalName: string;
  equipmentCode: string;
  equipmentName: string;
  entrance: boolean;
  manufacturer: string;
  equipmentType: string;
  purchaseTime: number;
  newEquipment: string;
  purchasePrice: string;
  designedLife: string;
  sampleNum: number;
  principal: string;
  preparer: string;
  submitTime: number;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
