// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FatherFormProps {
  id: string;
  organizationName: string;
  location: string;
  bedState: string;
  bedParam: string;
  bedType: string;
  facilityCondition: string;
}
interface FatherProps {
  formInFather: FatherFormProps;
}
interface SonFormProps {
  id: string;
  organizationName: string;
  location: string;
  bedState: string;
  bedParam: string;
  bedType: string;
  facilityCondition: string;
}
interface SonProps {
  formInSon: SonFormProps;
}
export type { FatherFormProps, FatherProps, SonFormProps, SonProps };
