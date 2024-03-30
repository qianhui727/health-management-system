import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import {
  getGroupList,
  updateGroupList,
  deleteGroupList
} from "@/api/humanResource";
import { randomUUid, Timestamp, formatTime } from "@/utils/formatUtils";
import { type Ref, reactive, ref, onMounted, h, toRaw, watch } from "vue";

export function useGroup(treeRef: Ref) {
  const form = reactive({
    groupName: "",
    groupScale: "",
    allocateState: ""
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
      label: "队伍名称",
      prop: "groupName"
    },
    {
      label: "队伍规模",
      prop: "groupScale"
    },
    {
      label: "所在队伍",
      prop: "organizationName"
    },
    {
      label: "成员列表",
      prop: "groupMember"
    },
    {
      label: "负责人",
      prop: "groupHuman"
    },
    {
      label: "联系电话",
      prop: "groupPhone"
    },
    {
      label: "分配状态",
      prop: "allocateState"
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
    const { data } = await getGroupList(toRaw(form));
    console.log(toRaw(form), data, 111);

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
    const { data } = await updateGroupList(toRaw(curData));
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
    const { data } = await deleteGroupList(toRaw(row));
    console.log(toRaw(form), data, 111);

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
      title: `${title}队伍`,
      props: {
        formInline: {
          id: row?.id ?? randomUUid(4),
          groupName: row?.groupName ?? "",
          groupScale: row?.groupScale ?? "",
          organizationName: row?.organizationName ?? "",
          groupMember: row?.groupMember ?? "",
          groupHuman: row?.groupHuman ?? "",
          groupPhone: row?.groupPhone ?? "",
          allocateState: row?.allocateState ?? "",
          trainingRecord: row?.trainingRecord ?? "",
          testRecord: row?.testRecord ?? ""
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
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(
            `您${title}了队伍名称为${curData.organizationName}的这条数据`,
            {
              type: "success"
            }
          );
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
