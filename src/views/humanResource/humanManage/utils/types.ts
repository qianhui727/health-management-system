// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface StaffFormProps {
  id: string;
  staffName: string;
  staffSex: string;
  staffDuty: string;
  organization: string;
  staffPhone: string;
  emergencyPrepare: string;
  emergencyTask: string;
  trainingRecord: string;
  testRecord: string;
}
interface StaffProps {
  formInStaff: StaffFormProps;
}
interface HealthFormProps {
  id: string;
  healthName: string;
  healthSex: string;
  healthID: string;
  healthDuty: string;
  organization: string;
  healthPhone: string;
}
interface HealthProps {
  formInHealth: HealthFormProps;
}
export type { StaffFormProps, StaffProps, HealthFormProps, HealthProps };
