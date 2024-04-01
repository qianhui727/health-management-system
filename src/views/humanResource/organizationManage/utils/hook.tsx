import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import {
  getOrganizationList,
  updateOrganizationList,
  deleteOrganizationList
} from "@/api/humanResource";
import { randomUUid, Timestamp, formatTime } from "@/utils/formatUtils";
import { type Ref, reactive, ref, onMounted, h, toRaw, watch } from "vue";

export function useOrganization(treeRef: Ref) {
  const form = reactive({
    organizationName: "",
    organizationType: "",
    organizationState: ""
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
  const columns: TableColumnList = [
    {
      label: "机构名称",
      prop: "organizationName"
    },
    {
      label: "机构类型",
      prop: "organizationType"
    },
    {
      label: "机构地址",
      prop: "organizationAddress"
    },
    {
      label: "联系电话",
      prop: "organizationPhone"
    },
    {
      label: "负责人姓名",
      prop: "organizationHuman"
    },
    {
      label: "机构简介",
      prop: "organizationInfo"
    },
    {
      label: "状态",
      prop: "organizationState"
    },
    {
      label: "机构成立时间",
      prop: "createTime",
      formatter: ({ createTime }) => formatTime(createTime, "yyyy-MM-dd")
    },
    {
      label: "操作",
      fixed: "right",
      width: 250,
      slot: "operation"
    }
  ];
  function handleDelete(row) {
    onDelete(row);
    message(`删除成功`, {
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

  async function onSearch() {
    loading.value = true;
    const { data } = await getOrganizationList(toRaw(form));
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  async function onUpdate(curData) {
    loading.value = true;
    const { data } = await updateOrganizationList(toRaw(curData));
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  async function onDelete(row) {
    loading.value = true;
    const { data } = await deleteOrganizationList(toRaw(row));
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}机构`,
      props: {
        formInline: {
          id: row?.id ?? randomUUid(4),
          organizationName: row?.organizationName ?? "",
          organizationType: row?.organizationType ?? "",
          organizationAddress: row?.organizationAddress ?? "",
          organizationPhone: row?.organizationPhone ?? "",
          organizationHuman: row?.organizationHuman ?? "",
          organizationInfo: row?.organizationInfo ?? "",
          organizationState: row?.organizationState ?? "",
          createTime: Timestamp(row?.createTime) ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        options.props.formInline.createTime = Timestamp(
          options.props.formInline.createTime
        );
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`${title}成功`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            onUpdate(curData);
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
    onSearch();
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
    form,
    isShow,
    curRow,
    loading,
    columns,
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
