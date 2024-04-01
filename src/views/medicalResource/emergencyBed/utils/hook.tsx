import sonForm from "../sonForm.vue";
import faForm from "../fatherForm.vue";

import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FatherFormProps, SonFormProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import {
  getFatherList,
  updateFatherList,
  deleteFatherList,
  getSonList,
  updateSonList,
  deleteSonList
} from "@/api/humanResource";
import { randomUUid } from "@/utils/formatUtils";
import { type Ref, reactive, ref, onMounted, h, toRaw, watch } from "vue";

export function useHuman(treeRef: Ref) {
  const fatherForm = reactive({
    organizationName: "",
    bedState: "",
    bedType: ""
  });
  const SonForm = reactive({
    organizationName: "",
    bedState: "",
    bedType: ""
  });
  const flagSun = ref(false);
  const curRow = ref();
  const formRef = ref();
  const dataListFa = ref([]);
  const dataListSon = ref([]);
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
  const paginationFa = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const paginationSon = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const fatherColumns: TableColumnList = [
    {
      label: "机构名称",
      prop: "organizationName"
    },
    {
      label: "详细位置",
      prop: "location"
    },
    {
      label: "床位状态",
      prop: "bedState"
    },
    {
      label: "床位参数",
      prop: "bedParam"
    },
    {
      label: "床位类型",
      prop: "bedType"
    },
    {
      label: "基本设施情况",
      prop: "facilityCondition"
    },
    {
      label: "操作",
      fixed: "right",
      width: 300,
      slot: "operation"
    }
  ];
  const sonColumns: TableColumnList = [
    {
      label: "所属机构",
      prop: "organizationName"
    },
    {
      label: "详细位置",
      prop: "location"
    },
    {
      label: "床位状态",
      prop: "bedState"
    },
    {
      label: "床位参数",
      prop: "bedParam"
    },
    {
      label: "床位类型",
      prop: "bedType"
    },
    {
      label: "基本设施情况",
      prop: "facilityCondition"
    },
    {
      label: "操作",
      fixed: "right",
      width: 300,
      slot: "operation"
    }
  ];

  function handleDelete(row, flag, fatherId = "") {
    onDelete(row, flag, fatherId);
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

  async function onSearch(flag = "") {
    loading.value = true;
    console.log(flag, 222);
    if (flag === "应急床位") {
      flagSun.value = false;
      const { data } = await getFatherList(toRaw(fatherForm));
      dataListFa.value = data.list;
      paginationFa.total = data.total;
      paginationFa.pageSize = data.pageSize;
      paginationFa.currentPage = data.currentPage;
    } else {
      flagSun.value = true;
      sonForm.fatherId = flag;
      const { data } = await getSonList(toRaw(sonForm));
      dataListSon.value = data.list;
      paginationSon.total = data.total;
      paginationSon.pageSize = data.pageSize;
      paginationSon.currentPage = data.currentPage;
    }

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  async function onUpdate(curData, flag = "") {
    loading.value = true;

    if (flag === "应急床位") {
      const { data } = await updateFatherList(toRaw(curData));
      dataListFa.value = data.list;
      paginationFa.total = data.total;
      paginationFa.pageSize = data.pageSize;
      paginationFa.currentPage = data.currentPage;
    } else {
      curData.fatherId = flag;
      const { data } = await updateSonList(toRaw(curData));
      dataListSon.value = data.list;
      paginationSon.total = data.total;
      paginationSon.pageSize = data.pageSize;
      paginationSon.currentPage = data.currentPage;
    }

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  async function onDelete(row, flag = "", fatherId = "") {
    loading.value = true;

    if (flag === "应急床位") {
      const { data } = await deleteFatherList(toRaw(row));
      dataListFa.value = data.list;
      paginationFa.total = data.total;
      paginationFa.pageSize = data.pageSize;
      paginationFa.currentPage = data.currentPage;
    } else {
      row.fatherId = fatherId;
      const { data } = await deleteSonList(toRaw(row));
      dataListSon.value = data.list;
      paginationSon.total = data.total;
      paginationSon.pageSize = data.pageSize;
      paginationSon.currentPage = data.currentPage;
    }

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  const resetForm = (formEl, flag) => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch(flag);
  };
  function openDialog(title = "新增", row?: any, flag = "") {
    if (title.includes("应急床位")) {
      addDialog({
        title: `${title}`,
        props: {
          formInFather: {
            id: row?.id ?? randomUUid(4),
            organizationName: row?.organizationName ?? "",
            location: row?.location ?? "",
            bedState: row?.bedState ?? "",
            bedParam: row?.bedParam ?? "",
            bedType: row?.bedType ?? "",
            facilityCondition: row?.facilityCondition ?? ""
          }
        },
        width: "40%",
        draggable: true,
        fullscreen: deviceDetection(),
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => h(faForm, { ref: formRef }),
        beforeSure: (done, { options }) => {
          const FormRef = formRef.value.getRef();
          const curData = options.props.formInFather as FatherFormProps;
          function chores() {
            message(`${title}成功`, {
              type: "success"
            });
            done(); // 关闭弹框
            onSearch("应急床位"); // 刷新表格数据
          }
          FormRef.validate(valid => {
            if (valid) {
              onUpdate(curData, "应急床位");
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
        title: `${title}应急床位信息`,
        props: {
          formInSon: {
            id: row?.id ?? randomUUid(4),
            organizationName: row?.organizationName ?? "",
            location: row?.location ?? "",
            bedState: row?.bedState ?? "",
            bedParam: row?.bedParam ?? "",
            bedType: row?.bedType ?? "",
            facilityCondition: row?.facilityCondition ?? ""
          }
        },
        width: "40%",
        draggable: true,
        fullscreen: deviceDetection(),
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => h(sonForm, { ref: formRef }),
        beforeSure: (done, { options }) => {
          const FormRef = formRef.value.getRef();
          const curData = options.props.formInSon as SonFormProps;
          function chores() {
            message(`${title}成功`, {
              type: "success"
            });
            done(); // 关闭弹框
            onSearch(); // 刷新表格数据
          }
          FormRef.validate(valid => {
            if (valid) {
              console.log(flag, "flag");
              onUpdate(curData, flag);
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
    onSearch("应急床位");
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
    fatherForm,
    sonForm,
    isShow,
    curRow,
    loading,
    fatherColumns,
    sonColumns,
    rowStyle,
    dataListFa,
    dataListSon,
    treeData,
    treeProps,
    isLinkage,
    paginationFa,
    paginationSon,
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
    handleSelectionChange,
    flagSun
  };
}
