import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};
/** 获取应急机构管理列表 */
export const getOrganizationList = (data?: object) => {
  return http.request<ResultTable>("post", "/organizationList", { data });
};
/** 修改应急机构管理列表 */
export const updateOrganizationList = (data?: object) => {
  return http.request<ResultTable>("put", "/updateOrganization", { data });
};
/** 删除应急机构管理列表 */
export const deleteOrganizationList = (data?: object) => {
  return http.request<ResultTable>("delete", "/deleteOrganization", { data });
};
/** 获取应急人员管理列表 */
export const getStaffList = (data?: object) => {
  return http.request<ResultTable>("post", "/staffList", { data });
};
/** 修改应急人员管理列表 */
export const updateStaffList = (data?: object) => {
  return http.request<ResultTable>("put", "/updateStaff", { data });
};
/** 删除应急人员管理列表 */
export const deleteStaffList = (data?: object) => {
  return http.request<ResultTable>("delete", "/deleteStaff", { data });
};
/** 获取应急卫生专家管理列表 */
export const getHealthList = (data?: object) => {
  return http.request<ResultTable>("post", "/healthList", { data });
};
/** 修改应急卫生专家管理列表 */
export const updateHealthList = (data?: object) => {
  return http.request<ResultTable>("put", "/updateHealth", { data });
};
/** 删除应急卫生专家管理列表 */
export const deleteHealthList = (data?: object) => {
  return http.request<ResultTable>("delete", "/deleteHealth", { data });
};
/** 获取应急队伍管理列表 */
export const getGroupList = (data?: object) => {
  return http.request<ResultTable>("post", "/groupList", { data });
};
/** 修改应急队伍管理列表 */
export const updateGroupList = (data?: object) => {
  return http.request<ResultTable>("put", "/updateGroup", { data });
};
/** 删除应急队伍管理列表 */
export const deleteGroupList = (data?: object) => {
  return http.request<ResultTable>("delete", "/deleteGroup", { data });
};
/** 获取应急专家管理列表 */
export const getExpertList = (data?: object) => {
  return http.request<ResultTable>("post", "/expertList", { data });
};
/** 修改应急专家管理列表 */
export const updateExpertList = (data?: object) => {
  return http.request<ResultTable>("put", "/updateExpert", { data });
};
/** 删除应急专家管理列表 */
export const deleteExpertList = (data?: object) => {
  return http.request<ResultTable>("delete", "/deleteExpert", { data });
};
/** 获取应急药械管理列表 */
export const getMedicalList = (data?: object) => {
  return http.request<ResultTable>("post", "/medicalList", { data });
};
/** 修改应急药械管理列表 */
export const updateMedicalList = (data?: object) => {
  return http.request<ResultTable>("put", "/updateMedical", { data });
};
/** 删除应急药械管理列表 */
export const deleteMedicalList = (data?: object) => {
  return http.request<ResultTable>("delete", "/deleteMedical", { data });
};
/** 获取本级应急床位管理列表 */
export const getFatherList = (data?: object) => {
  return http.request<ResultTable>("post", "/fatherList", { data });
};
/** 修改本级应急床位管理列表 */
export const updateFatherList = (data?: object) => {
  return http.request<ResultTable>("put", "/updateFather", { data });
};
/** 删除本级应急床位管理列表 */
export const deleteFatherList = (data?: object) => {
  return http.request<ResultTable>("delete", "/deleteFather", { data });
};
/** 获取子级应急床位管理列表 */
export const getSonList = (data?: object) => {
  return http.request<ResultTable>("post", "/sonList", { data });
};
/** 修改子级应急床位管理列表 */
export const updateSonList = (data?: object) => {
  return http.request<ResultTable>("put", "/updateSon", { data });
};
/** 删除子级应急床位管理列表 */
export const deleteSonList = (data?: object) => {
  return http.request<ResultTable>("delete", "/deleteSon", { data });
};

/** 获取系统管理-用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<ResultTable>("post", "/user", { data });
};

/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result>("get", "/list-all-role");
};

/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
  return http.request<Result>("post", "/list-role-ids", { data });
};
/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getHumanMenuIds = (data?: object) => {
  return http.request<Result>("post", "/list-role-ids", { data });
};
/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getOrganizationMenuIds = (data?: object) => {
  return http.request<Result>("post", "/list-role-ids", { data });
};

/** 获取系统管理-角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<ResultTable>("post", "/role", { data });
};

/** 获取系统管理-角色管理列表 */
export const getHumanList = (data?: object) => {
  return http.request<ResultTable>("post", "/role", { data });
};

/** 获取系统管理-菜单管理列表 */
export const getMenuList = (data?: object) => {
  return http.request<Result>("post", "/menu", { data });
};

/** 获取系统管理-部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<Result>("post", "/dept", { data });
};

/** 获取系统监控-在线用户列表 */
export const getOnlineLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/online-logs", { data });
};

/** 获取系统监控-登录日志列表 */
export const getLoginLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/login-logs", { data });
};

/** 获取系统监控-操作日志列表 */
export const getOperationLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/operation-logs", { data });
};

/** 获取系统监控-系统日志列表 */
export const getSystemLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/system-logs", { data });
};

/** 获取系统监控-系统日志-根据 id 查日志详情 */
export const getSystemLogsDetail = (data?: object) => {
  return http.request<Result>("post", "/system-logs-detail", { data });
};

/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (data?: object) => {
  return http.request<Result>("post", "/role-menu", { data });
};
/** 获取角色管理-权限-菜单权限 */
export const getHumanMenu = (data?: object) => {
  return http.request<Result>("post", "/role-menu", { data });
};
/** 获取角色管理-权限-菜单权限 */
export const getOrganizationMenu = (data?: object) => {
  return http.request<Result>("post", "/role-menu", { data });
};
/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data?: object) => {
  return http.request<Result>("post", "/role-menu-ids", { data });
};
