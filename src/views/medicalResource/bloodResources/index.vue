<template>
  <div class="total">
    <el-card style="margin-bottom: 8px" shadow="hover"
      ><div id="main" style="width: 100%; height: 500px"></div>
    </el-card>

    <el-card style="margin-bottom: 8px" shadow="hover">
      <!-- 第一行 -->
      <el-row :gutter="0" style="margin-top: 8px">
        <el-col :span="6"
          ><span>
            医疗机构：
            <el-input style="width: 240px" placeholder="请输入医疗机构" /></span
        ></el-col>
        <el-col :span="6"
          ><span
            >血液类型：
            <el-input style="width: 240px" placeholder="请输入血液类型" /></span
        ></el-col>
        <el-col :span="6"
          ><span
            >编号代码：
            <el-input style="width: 240px" placeholder="请输入编号代码" /></span
        ></el-col>
        <el-col :span="6">
          <el-button type="primary" style="margin-right: 8px; margin-top: 8px">
            <el-icon style="margin-right: 3px"><Search /></el-icon> 点击搜索
          </el-button>
          <el-button type="primary" style="margin-right: 8px; margin-top: 8px">
            <el-icon style="margin-right: 3px"><Refresh /></el-icon> 重置
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-bottom: 8px" shadow="hover">
      <el-table
        :data="currentTableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column
          fixed="left"
          prop="data1"
          label="医疗机构"
          width="180"
        />
        <el-table-column prop="data2" label="血液类型" width="150" />
        <el-table-column prop="data3" label="血液数量" width="150" />
        <el-table-column prop="data4" label="储存条件" width="200" />
        <el-table-column prop="data5" label="过期时间" width="150" />
        <el-table-column prop="data6" label="质量检测" width="150" />
        <el-table-column prop="data7" label="运输方式" width="150" />
        <el-table-column prop="number" label="编号" width="150" />
        <el-table-column prop="status" label="订单操作" width="600">
          <template #default="scope">
            <el-steps
              style="max-width: 600px"
              :active="scope.row.active"
              finish-status="success"
            >
              <el-step title="申请出库" />
              <el-step title="审批中" />
              <el-step title="已出库" />
              <el-step title="运输中" />
              <el-step title="已到达血液中心" />
            </el-steps>

            <el-button
              style="margin-top: 12px"
              @click="next(scope.row, scope.$index)"
              type="primary"
              ><el-icon><Promotion /></el-icon>
              {{ buttonText[scope.$index] }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="140">
          <template #header>
            <el-input
              v-model="search"
              placeholder="搜索内容"
              @input="handleSearch"
            />
          </template>
          <template #default="scope"
            ><el-button
              link
              type="primary"
              @click.prevent="editRow(scope.$index)"
              ><el-icon><EditPen /></el-icon> 修改</el-button
            >
            <!-- <el-button
            type="danger"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
          >
            删除
          </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[8, 20, 30, 40]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="totalItems"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 修改对话框 -->
    <el-dialog
      v-model="dialogOverflowVisible"
      title="修改信息"
      width="500"
      draggable
      overflow
    >
      <el-form :model="form" ref="formRef">
        <!-- <el-form-item label="医疗机构" :label-width="formLabelWidth">
          <el-input v-model="form.data1" autocomplete="off" /> </el-form-item
        >-->
        <el-form-item label="血液类型" :label-width="formLabelWidth">
          <el-input v-model="form.data2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="血液数量" :label-width="formLabelWidth">
          <el-input v-model="form.data3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="储存条件" :label-width="formLabelWidth">
          <el-input v-model="form.data4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="过期时间" :label-width="formLabelWidth">
          <el-input v-model="form.data5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="质量检测" :label-width="formLabelWidth">
          <el-input v-model="form.data6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="运输方式" :label-width="formLabelWidth">
          <el-input v-model="form.data7" autocomplete="off" />
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogOverflowVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFormed"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 添加对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="添加信息"
      width="500"
      align-center
    >
      <el-form :model="form" ref="formRef">
        <!-- <el-form-item label="医疗机构" :label-width="formLabelWidth">
          <el-input v-model="form.data1" autocomplete="off" /> </el-form-item
        > -->
        <el-form-item label="血液类型" :label-width="formLabelWidth">
          <el-input v-model="form.data2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="血液数量" :label-width="formLabelWidth">
          <el-input v-model="form.data3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="储存条件" :label-width="formLabelWidth">
          <el-input v-model="form.data4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="过期时间" :label-width="formLabelWidth">
          <el-input v-model="form.data5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="质量检测" :label-width="formLabelWidth">
          <el-input v-model="form.data6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="运输方式" :label-width="formLabelWidth">
          <el-input v-model="form.data7" autocomplete="off" />
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
      </el-form>
      <!-- 表单底 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onMounted, reactive } from "vue";
const dialogFormVisible = ref(false); //添加对话框
const dialogOverflowVisible = ref(false); //修改对话框
const formLabelWidth = "140px";
//合并表格
import type { TableColumnCtx } from "element-plus";
interface User {
  data1: string;
  data2: string;
  data3: string;
  data4: string;
  data5: string;
  data6: string;
}
interface SpanMethodProps {
  row: User;
  column: TableColumnCtx<User>;
  rowIndex: number;
  columnIndex: number;
}

const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex
}: SpanMethodProps) => {
  if (searching.value) {
    // 如果处于搜索状态，返回固定的 rowspan 和 colspan，取消合并展示
    return {
      rowspan: 1,
      colspan: 1
    };
  } else {
    // 如果没有处于搜索状态，根据规则进行合并展示
    if (columnIndex === 0) {
      if (rowIndex % 4 === 0) {
        return {
          rowspan: 4,
          colspan: 1
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }
};
//表单输入信息
const form = reactive({
  // data1: "",
  data2: "",
  data3: "",
  data4: "",
  data5: "",
  data6: "",
  data7: "",
  number: ""
});
//表格数据
const tableData = ref([
  {
    data1: "健康疾控中心",
    data2: "A型",
    data3: "220毫升",
    data4: "2°C至6°C以下，湿度70%左右，不见光",
    data5: "2025年4月13日",
    data6: "合格",
    data7: "空运",
    status: "已出库",
    number: "454956",
    active: 0
  },
  {
    data1: "健康疾控中心",
    data2: "B型",
    data3: "452毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年7月17日",
    data6: "合格",
    data7: "海运",
    status: "已出库",
    number: "543921",
    active: 0
  },
  {
    data1: "健康疾控中心",
    data2: "AB型",
    data3: "305毫升",
    data4: "2°C至6°C以下，湿度70%左右，不见光",
    data5: "2025年9月28日",
    data6: "合格",
    data7: "陆运",
    status: "已出库",
    number: "658347",
    active: 0
  },
  {
    data1: "健康疾控中心",
    data2: "O型",
    data3: "350毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年5月9日",
    data6: "合格",
    data7: "空运",
    status: "已出库",
    number: "786539",
    active: 0
  },
  {
    data1: "爱心医疗机构",
    data2: "A型",
    data3: "235毫升",
    data4: "2°C至6°C以下，湿度70%左右，不见光",
    data5: "2025年6月21日",
    data6: "合格",
    data7: "海运",
    status: "已出库",
    number: "923487",
    active: 0
  },
  {
    data1: "爱心医疗机构",
    data2: "B型",
    data3: "365毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年10月2日",
    data6: "合格",
    data7: "陆运",
    status: "已出库",
    number: "105483",
    active: 0
  },
  {
    data1: "爱心医疗机构",
    data2: "AB型",
    data3: "485毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年3月15日",
    data6: "合格",
    data7: "海运",
    status: "已出库",
    number: "112576",
    active: 0
  },
  {
    data1: "爱心医疗机构",
    data2: "O型",
    data3: "285毫升",
    data4: "2°C至6°C以下，湿度70%左右，不见光",
    data5: "2025年2月19日",
    data6: "合格",
    data7: "空运",
    status: "已出库",
    number: "129657",
    active: 0
  },
  {
    data1: "幸福医院",
    data2: "A型",
    data3: "301毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年11月8日",
    data6: "合格",
    data7: "海运",
    status: "已出库",
    number: "135789",
    active: 0
  },
  {
    data1: "幸福医院",
    data2: "B型",
    data3: "450毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年12月30日",
    data6: "合格",
    data7: "陆运",
    status: "已出库",
    number: "145679",
    active: 0
  },
  {
    data1: "幸福医院",
    data2: "AB型",
    data3: "480毫升",
    data4: "2°C至6°C以下，湿度70%左右，不见光",
    data5: "2025年1月4日",
    data6: "合格",
    data7: "海运",
    status: "已出库",
    number: "156782",
    active: 0
  },
  {
    data1: "幸福医院",
    data2: "O型",
    data3: "340毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年4月20日",
    data6: "合格",
    data7: "空运",
    status: "已出库",
    number: "165893",
    active: 0
  },
  {
    data1: "荣耀医疗中心",
    data2: "A型",
    data3: "334毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年3月7日",
    data6: "合格",
    data7: "海运",
    status: "已出库",
    number: "174925",
    active: 0
  },
  {
    data1: "荣耀医疗中心",
    data2: "B型",
    data3: "302毫升",
    data4: "2°C至6°C以下，湿度70%左右，不见光",
    data5: "2025年2月14日",
    data6: "合格",
    data7: "空运",
    status: "已出库",
    number: "183547",
    active: 0
  },
  {
    data1: "荣耀医疗中心",
    data2: "AB型",
    data3: "154毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年7月3日",
    data6: "合格",
    data7: "陆运",
    status: "已出库",
    number: "194536",
    active: 0
  },
  {
    data1: "荣耀医疗中心",
    data2: "O型",
    data3: "352毫升",
    data4: "2°C至6°C以下，湿度70%左右，不见光",
    data5: "2025年6月8日",
    data6: "合格",
    data7: "海运",
    status: "已出库",
    number: "205476",
    active: 0
  },
  {
    data1: "安康医院",
    data2: "A型",
    data3: "390毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年5月26日",
    data6: "合格",
    data7: "陆运",
    status: "已出库",
    number: "212567",
    active: 0
  },
  {
    data1: "安康医院",
    data2: "B型",
    data3: "288毫升",
    data4: "2°C至6°C以下，湿度70%左右，不见光",
    data5: "2025年8月14日",
    data6: "合格",
    data7: "空运",
    status: "已出库",
    number: "224567",
    active: 0
  },
  {
    data1: "安康医院",
    data2: "AB型",
    data3: "190毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年11月29日",
    data6: "合格",
    data7: "陆运",
    status: "已出库",
    number: "235476",
    active: 0
  },
  {
    data1: "安康医院",
    data2: "O型",
    data3: "450毫升",
    data4: "2°C至6°C以下，湿度70%左右，避光保存",
    data5: "2025年11月29日",
    data6: "合格",
    data7: "陆运",
    status: "已出库",
    number: "235476",
    active: 0
  }
]);
const currentData = ref(tableData.value); //渲染时所操作数据
//订单操作
const buttonText = ref<string[]>([]);

const next = (row: any, index: number) => {
  if (Array.isArray(row.active)) {
    const currentIndex = row.active.indexOf(row.active.length - 1);
    if (currentIndex === -1) {
      row.active.push(0);
    } else {
      row.active.splice(currentIndex, 1, currentIndex + 1);
    }
  } else {
    if (row.active >= 1) {
      row.active = 0;
      buttonText.value[index] = "点击申请";
    } else {
      row.active++;
      buttonText.value[index] = "撤销申请";
    }
  }
};

//删除
const deleteRow = (index: number) => {
  console.log(index);

  // 找到删除的数据
  const data =
    currentData.value[index + pageSize.value * (currentPage.value - 1)];
  console.log(data.number);

  // 找到currentData中对应索引
  const dataIndex = currentData.value.findIndex(item => {
    return item.number === data.number;
  });
  console.log(dataIndex);

  // 删除currentData对应项，但是tableData数据并没有删除
  currentData.value.splice(dataIndex, 1);
  //找到需要删除数据再tableData中索引
  const tableIndex = tableData.value.findIndex(item => {
    return item.number === data.number;
  });
  // 如果找到匹配项
  if (tableIndex !== -1) {
    // 从 tableData 中删除匹配项
    tableData.value.splice(tableIndex, 1);
  }
  // 更新currentTableData
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = currentPage.value * pageSize.value;
  currentTableData.value = currentData.value.slice(startIndex, endIndex);
  // 更新其他数据
  totalItems.value = totalItems.value - 1;
};
//修改
const editData = ref(null); //修改的数据
const editRow = (index: number) => {
  //找到修改的数据
  editData.value =
    currentData.value[index + pageSize.value * (currentPage.value - 1)];
  dialogOverflowVisible.value = true;
  // 将数据填充到修改表单中
  form.data2 = editData.value.data2;
  form.data3 = editData.value.data3;
  form.data4 = editData.value.data4;
  form.data5 = editData.value.data5;
  form.data6 = editData.value.data6;
  form.data7 = editData.value.data7;
  form.number = editData.value.number;
};
// 提交修改表单后操作
const submitFormed = () => {
  dialogOverflowVisible.value = false;
  //找到需要修改数据的currentData索引
  const currentIndex = currentData.value.findIndex(item => {
    return item.number === editData.value.number;
  });

  //将修改的数据保存到currentData
  for (const key of Object.keys({ ...form })) {
    currentData.value[currentIndex][key] = { ...form }[key];
  }
  for (const key in form) {
    form[key] = "";
  }
};
// 提交添加表单后操作
const submitForm = () => {
  // 将表单数据添加到表格数据中
  // currentData.value.push({ ...form });
  // 更新currentData
  // currentData.value = tableData.value;
  console.log({ ...form });
  // if (currentData.value !== tableData.value) {
  //   tableData.value.push({ ...form });
  // }
  // 清空表单数据
  for (const key in form) {
    form[key] = "";
  }
  dialogFormVisible.value = false;
  totalItems.value = totalItems.value + 1;
  // console.log(totalItems.value);

  handleSizeChange(pageSize.value);
};
// 分页器
const currentPage = ref<number>(1); //当前页数
const pageSize = ref<number>(8); // 每页条数
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const totalItems = ref<number>(
  Math.max(currentData.value.length, pageSize.value)
); //可渲染总条数
const currentTableData = ref([]); //当前每页可包含数据

// 监听 currentData 的变化，更新总条数
watch(currentData, () => {
  totalItems.value = currentData.value.length;
});
// 分页器函数
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  const index = (currentPage.value - 1) * pageSize.value; // 当前页的起始索引
  const nums = Math.min(index + pageSize.value, currentData.value.length); // 当前页结束的索引
  const tables = []; // 设置临时数组存放当前页的数据
  for (let i = index; i < nums; i++) {
    if (currentData.value[i]) tables.push(currentData.value[i]);
  }
  currentTableData.value = tables;
};
const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  const index = (currentPage.value - 1) * pageSize.value; // 当前页的起始索引
  const nums = Math.min(index + pageSize.value, currentData.value.length); // 当前页结束的索引
  const tables = []; // 设置临时数组存放当前页的数据
  for (let i = index; i < nums; i++) {
    if (currentData.value[i]) tables.push(currentData.value[i]);
  }
  currentTableData.value = tables;
};
onMounted(() => {
  handleCurrentChange(1); // 初始化显示第一页数据
  handleSizeChange(8);
  tableData.value.forEach(() => {
    buttonText.value.push("点击申请");
  });
});
// 搜索部分
const search = ref("");
const searchItems = () => {
  const keyword = search.value.trim();
  if (!keyword) {
    // 如果搜索关键字为空，则重置表格数据为全部数据
    currentTableData.value = currentData.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
    // 还原合并表格
    searching.value = false;
    // 更新 currentDate 为全部数据
    currentData.value = tableData.value;
  } else {
    const regex = new RegExp(escapeRegExp(keyword), "i");
    // currentDate 变量为搜索到的数据
    currentData.value = tableData.value.filter(item => {
      // 使用正则表达式匹配日期字符串的年份、月份和日期部分
      return (
        item.data1.toLowerCase().includes(keyword) ||
        item.data2.toLowerCase().includes(keyword) ||
        item.data3.toLowerCase().includes(keyword) ||
        item.data4.toLowerCase().includes(keyword) ||
        item.data5.toLowerCase().includes(keyword) ||
        item.data6.toLowerCase().includes(keyword) ||
        item.data7.toLowerCase().includes(keyword) ||
        item.number.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword) ||
        regex.test(item.data2) // 使用正则表达式进行模糊匹配
      );
    });

    // 更新渲染表单
    currentTableData.value = currentData.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  }
};

// 辅助函数：转义正则表达式中的特殊字符
const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& 表示与正则表达式相匹配的子串
};

// 在输入框内容发生变化时触发搜索操作
watch(search, () => {
  searchItems();
});

// 在搜索框中输入内容时触发搜索操作
// 定义一个变量来表示是否处于搜索状态，默认为 false
const searching = ref(false);
const handleSearch = () => {
  searchItems();
  searching.value = true; // 设置搜索状态为 true
};
// // 在搜索完成后恢复合并展示
// const restoreMergeDisplay = () => {
//   searching.value = false; // 恢复搜索状态为 false
//   currentTableData.value.forEach((row, rowIndex) => {
//     Object.keys(row).forEach((column, columnIndex) => {
//       currentTableData.value[rowIndex]._columnIndex = columnIndex;
//     });
//   });
// };

// 统计图
import * as echarts from "echarts";

// 在 mounted 钩子函数中初始化图表
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例

  var app: any = {};
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById("main")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  const posList = [
    "left",
    "right",
    "top",
    "bottom",
    "inside",
    "insideTop",
    "insideLeft",
    "insideRight",
    "insideBottom",
    "insideTopLeft",
    "insideTopRight",
    "insideBottomLeft",
    "insideBottomRight"
  ] as const;

  app.configParameters = {
    rotate: {
      min: -90,
      max: 90
    },
    align: {
      options: {
        left: "left",
        center: "center",
        right: "right"
      }
    },
    verticalAlign: {
      options: {
        top: "top",
        middle: "middle",
        bottom: "bottom"
      }
    },
    position: {
      options: posList.reduce(
        function (map, pos) {
          map[pos] = pos;
          return map;
        },
        {} as Record<string, string>
      )
    },
    distance: {
      min: 0,
      max: 100
    }
  };

  app.config = {
    rotate: 90,
    align: "left",
    verticalAlign: "middle",
    position: "insideBottom",
    distance: 15,
    onChange: function () {
      const labelOption: BarLabelOption = {
        rotate: app.config.rotate as BarLabelOption["rotate"],
        align: app.config.align as BarLabelOption["align"],
        verticalAlign: app.config
          .verticalAlign as BarLabelOption["verticalAlign"],
        position: app.config.position as BarLabelOption["position"],
        distance: app.config.distance as BarLabelOption["distance"]
      };
      myChart.setOption<echarts.EChartsOption>({
        series: [
          {
            label: labelOption
          },
          {
            label: labelOption
          },
          {
            label: labelOption
          },
          {
            label: labelOption
          }
        ]
      });
    }
  };

  type BarLabelOption = NonNullable<echarts.BarSeriesOption["label"]>;

  const labelOption: BarLabelOption = {
    show: true,
    position: app.config.position as BarLabelOption["position"],
    distance: app.config.distance as BarLabelOption["distance"],
    align: app.config.align as BarLabelOption["align"],
    verticalAlign: app.config.verticalAlign as BarLabelOption["verticalAlign"],
    rotate: app.config.rotate as BarLabelOption["rotate"],
    formatter: "{c}  {name|{a}}",
    fontSize: 16,
    rich: {
      name: {}
    }
  };

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      data: ["Axing", "Steppe", "Desert", "Wetland"]
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: [
          "健康疾控中心",
          "爱心医疗机构",
          "幸福医院",
          "荣耀医疗中心",
          "安康医院"
        ]
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: "{value} ml"
        }
      }
    ],
    series: [
      {
        name: "A型血液",
        type: "bar",
        barGap: 0,
        label: {
          show: true,
          formatter: "{a}", // 只显示系列的名称
          rotate: 90
        },
        emphasis: {
          focus: "series"
        },
        data: [220, 235, 301, 334, 390]
      },
      {
        name: "B型血液",
        type: "bar",
        label: {
          show: true,
          formatter: "{a}", // 只显示系列的名称
          rotate: 90
        },
        emphasis: {
          focus: "series"
        },
        data: [452, 365, 450, 320, 288]
      },
      {
        name: "AB型血液",
        type: "bar",
        label: {
          show: true,
          formatter: "{a}", // 只显示系列的名称
          rotate: 90
        },
        emphasis: {
          focus: "series"
        },
        data: [305, 485, 480, 154, 190]
      },
      {
        name: "O型血液",
        type: "bar",
        label: {
          show: true,
          formatter: "{a}", // 只显示系列的名称
          rotate: 90
        },
        emphasis: {
          focus: "series"
        },
        data: [350, 285, 340, 352, 450]
      }
    ]
  };

  option && myChart.setOption(option);
});
</script>

<style lang="scss" scoped>
total {
  width: 100%;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
:deep(.el-table__header th) {
  font-weight: bold;
  color: black;
  background-color: #f5f7fa !important;
}
</style>
