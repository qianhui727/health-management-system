import htForm from "../healthForm.vue";
import stForm from "../staffForm.vue";

import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { StaffFormProps, HealthFormProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import {
  getStaffList,
  updateStaffList,
  deleteStaffList,
  getHealthList,
  updateHealthList,
  deleteHealthList
} from "@/api/humanResource";
import { randomUUid } from "@/utils/formatUtils";
import { type Ref, reactive, ref, onMounted, h, toRaw, watch } from "vue";

export function useHuman(treeRef: Ref) {
  const staffForm = reactive({
    staffName: "",
    organization: "",
    staffDuty: ""
  });
  const healthForm = reactive({
    healthName: "",
    organization: "",
    healthDuty: ""
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const treeIds = ref([]);
  const treeData = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
  const isLinkage = ref(false);
  const treeSearchValue = ref();
  const isExpandAll = ref(false);
  const isSelectAll = ref(false);
  const treeProps = {
    value: "id",
    label: "title",
    children: "children"
  };
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const staffColumns: TableColumnList = [
    {
      label: "应急人员姓名",
      prop: "staffName"
    },
    {
      label: "性别",
      prop: "staffSex"
    },
    {
      label: "职称/职务",
      prop: "staffDuty"
    },
    {
      label: "工作单位",
      prop: "organization"
    },
    {
      label: "联系电话",
      prop: "staffPhone"
    },
    {
      label: "应急备勤",
      prop: "emergencyPrepare"
    },
    {
      label: "应急任务",
      prop: "emergencyTask"
    },
    {
      label: "培训记录",
      prop: "trainingRecord"
    },
    {
      label: "考核记录",
      prop: "testRecord"
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];
  const healthColumns: TableColumnList = [
    {
      label: "专家姓名",
      prop: "healthName"
    },
    {
      label: "性别",
      prop: "healthSex"
    },
    {
      label: "身份证号",
      prop: "healthID"
    },
    {
      label: "职称/职务",
      prop: "healthDuty"
    },
    {
      label: "工作单位",
      prop: "organization"
    },
    {
      label: "联系电话",
      prop: "healthPhone"
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  function handleDelete(row, flag) {
    onDelete(row, flag);
    message("删除成功", {
      type: "success"
    });
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch(flag) {
    let resData;
    loading.value = true;
    console.log(flag, 222);
    if (flag === "应急人员") {
      const { data } = await getStaffList(toRaw(staffForm));
      resData = data;
    } else {
      const { data } = await getHealthList(toRaw(healthForm));
      resData = data;
    }
    console.log(resData, 333, staffForm, healthForm);

    dataList.value = resData.list;
    pagination.total = resData.total;
    pagination.pageSize = resData.pageSize;
    pagination.currentPage = resData.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  async function onUpdate(curData, flag) {
    loading.value = true;
    let resData;
    loading.value = true;

    if (flag === "应急人员") {
      const { data } = await updateStaffList(toRaw(curData));
      resData = data;
    } else {
      const { data } = await updateHealthList(toRaw(curData));
      resData = data;
    }
    dataList.value = resData.list;
    pagination.total = resData.total;
    pagination.pageSize = resData.pageSize;
    pagination.currentPage = resData.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  async function onDelete(row, flag) {
    let resData;
    loading.value = true;

    if (flag === "应急人员") {
      const { data } = await deleteStaffList(toRaw(row));
      resData = data;
    } else {
      const { data } = await deleteHealthList(toRaw(row));
      resData = data;
    }
    dataList.value = resData.list;
    pagination.total = resData.total;
    pagination.pageSize = resData.pageSize;
    pagination.currentPage = resData.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  const resetForm = (formEl, flag) => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch(flag);
  };
  function openDialog(title = "新增", row?: any) {
    if (title.includes("应急人员")) {
      addDialog({
        title: `${title}`,
        props: {
          formInStaff: {
            id: row?.id ?? randomUUid(4),
            staffName: row?.staffName ?? "",
            staffSex: row?.staffSex ?? "",
            staffDuty: row?.staffDuty ?? "",
            organization: row?.organization ?? "",
            staffPhone: row?.staffPhone ?? "",
            emergencyPrepare: row?.emergencyPrepare ?? "",
            emergencyTask: row?.emergencyTask ?? "",
            trainingRecord: row?.trainingRecord ?? "",
            testRecord: row?.testRecord ?? ""
          }
        },
        width: "40%",
        draggable: true,
        fullscreen: deviceDetection(),
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => h(stForm, { ref: formRef }),
        beforeSure: (done, { options }) => {
          const FormRef = formRef.value.getRef();
          const curData = options.props.formInStaff as StaffFormProps;
          function chores() {
            message(`${title}成功`, {
              type: "success"
            });
            done(); // 关闭弹框
            onSearch("应急人员"); // 刷新表格数据
          }
          FormRef.validate(valid => {
            if (valid) {
              onUpdate(curData, "应急人员");
              console.log("curData", curData);
              // 表单规则校验通过
              if (title === "新增") {
                // 实际开发先调用新增接口，再进行下面操作
                chores();
              } else {
                // 实际开发先调用修改接口，再进行下面操作
                chores();
              }
            }
          });
        }
      });
    } else {
      addDialog({
        title: `${title}`,
        props: {
          formInHealth: {
            id: row?.id ?? randomUUid(4),
            healthName: row?.healthName ?? "",
            healthSex: row?.healthSex ?? "",
            healthID: row?.healthID ?? "",
            healthDuty: row?.healthDuty ?? "",
            organization: row?.organization ?? "",
            healthPhone: row?.healthPhone ?? ""
          }
        },
        width: "40%",
        draggable: true,
        fullscreen: deviceDetection(),
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => h(htForm, { ref: formRef }),
        beforeSure: (done, { options }) => {
          const FormRef = formRef.value.getRef();
          const curData = options.props.formInHealth as HealthFormProps;
          function chores() {
            message(`${title}成功`, {
              type: "success"
            });
            done(); // 关闭弹框
            onSearch("应急卫生专家"); // 刷新表格数据
          }
          FormRef.validate(valid => {
            if (valid) {
              onUpdate(curData, "应急卫生专家");
              console.log("curData", curData);
              // 表单规则校验通过
              if (title === "新增") {
                // 实际开发先调用新增接口，再进行下面操作
                chores();
              } else {
                // 实际开发先调用修改接口，再进行下面操作
                chores();
              }
            }
          });
        }
      });
    }
  }

  /** 高亮当前权限选中行 */
  function rowStyle({ row: { id } }) {
    return {
      cursor: "pointer",
      background: id === curRow.value?.id ? "var(--el-fill-color-light)" : ""
    };
  }

  const onQueryChanged = (query: string) => {
    treeRef.value!.filter(query);
  };

  onMounted(async () => {
    onSearch("应急人员");
  });

  watch(isExpandAll, val => {
    val
      ? treeRef.value.setExpandedKeys(treeIds.value)
      : treeRef.value.setExpandedKeys([]);
  });

  watch(isSelectAll, val => {
    val
      ? treeRef.value.setCheckedKeys(treeIds.value)
      : treeRef.value.setCheckedKeys([]);
  });

  return {
    staffForm,
    healthForm,
    isShow,
    curRow,
    loading,
    staffColumns,
    healthColumns,
    rowStyle,
    dataList,
    treeData,
    treeProps,
    isLinkage,
    pagination,
    isExpandAll,
    isSelectAll,
    treeSearchValue,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    onQueryChanged,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
