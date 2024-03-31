import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import {
  getMedicalList,
  updateMedicalList,
  deleteMedicalList
} from "@/api/humanResource";
import { randomUUid, Timestamp, formatTime } from "@/utils/formatUtils";
import { type Ref, reactive, ref, onMounted, h, toRaw, watch } from "vue";

export function useMedical(treeRef: Ref) {
  const form = reactive({
    medicalName: "",
    equipmentCode: "",
    equipmentName: "",
    entrance: "",
    manufacturer: "",
    equipmentType: "",
    purchaseTime: ""
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
      prop: "medicalName",
      width: 150
    },
    {
      label: "设备代号",
      prop: "equipmentCode",
      width: 150
    },
    {
      label: "设备名称",
      prop: "equipmentName",
      width: 150
    },
    {
      label: "是否进口",
      prop: "entrance",
      width: 150
    },
    {
      label: "生产厂家",
      prop: "manufacturer",
      width: 150
    },
    {
      label: "设备型号",
      prop: "equipmentType",
      width: 150
    },
    {
      label: "购买日期",
      prop: "purchaseTime",
      minWidth: 160,
      formatter: ({ purchaseTime }) => formatTime(purchaseTime, "yyyy-MM-dd")
    },
    {
      label: "是否为新设备",
      prop: "newEquipment",
      width: 150
    },
    {
      label: "购买价格",
      prop: "purchasePrice",
      width: 150
    },
    {
      label: "设计寿命",
      prop: "designedLife",
      width: 150
    },
    {
      label: "检查/治疗/标本数",
      prop: "sampleNum",
      width: 150
    },
    {
      label: "单位负责人",
      prop: "principal",
      width: 150
    },
    {
      label: "填表人",
      prop: "preparer",
      width: 150
    },
    {
      label: "报出日期",
      prop: "submitTime",
      minWidth: 160,
      formatter: ({ submitTime }) => formatTime(submitTime, "yyyy-MM-dd")
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
    const { data } = await getMedicalList(toRaw(form));
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
    const { data } = await updateMedicalList(toRaw(curData));
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
    const { data } = await deleteMedicalList(toRaw(row));
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
      title: `${title}药械`,
      props: {
        formInline: {
          id: row?.id ?? randomUUid(4),
          medicalName: row?.medicalName ?? "",
          equipmentCode: row?.equipmentCode ?? "",
          equipmentName: row?.equipmentName ?? "",
          entrance: row?.entrance ?? "",
          manufacturer: row?.manufacturer ?? "",
          equipmentType: row?.equipmentType ?? "",
          purchaseTime: row?.purchaseTime ?? "",
          newEquipment: row?.newEquipment ?? "",
          purchasePrice: row?.purchasePrice ?? "",
          designedLife: row?.designedLife ?? "",
          sampleNum: row?.sampleNum ?? "",
          principal: row?.principal ?? "",
          preparer: row?.preparer ?? "",
          submitTime: row?.submitTime ?? ""
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
        options.props.formInline.purchaseTime = Timestamp(
          options.props.formInline.purchaseTime
        );
        options.props.formInline.submitTime = Timestamp(
          options.props.formInline.submitTime
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
