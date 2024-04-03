<template>
  <div class="total">
    <el-card style="margin-bottom: 8px" shadow="hover">
      <!-- 第一行 -->
      <el-row :gutter="5" style="margin-top: 8px">
        <el-col :span="8"
          ><span>
            物资名称：
            <el-input style="width: 240px" placeholder="请输入物资名称" /></span
        ></el-col>
        <el-col :span="8"
          ><span
            >物资类型：
            <el-input style="width: 240px" placeholder="请输入物资类型" /></span
        ></el-col>
        <el-col :span="8"
          ><span
            >负责人：
            <el-input style="width: 240px" placeholder="请输入负责人" /></span
        ></el-col>
      </el-row>

      <!-- 第二行 -->
      <el-row :gutter="10" style="margin-top: 8px">
        <el-col :span="8"
          ><span style="width: 200px">
            价格：
            <el-input style="width: 240px" placeholder="请输入价格" /></span
        ></el-col>
        <el-col :span="8"
          ><span
            >主要成本：
            <el-input
              style="width: 240px"
              placeholder="请输入主要成本" /></span
        ></el-col>
        <el-col :span="8"
          ><span
            >物资编号：
            <el-input style="width: 240px" placeholder="请输入物资编号" /></span
        ></el-col>
      </el-row>
      <el-button type="primary" style="margin-right: 8px; margin-top: 8px">
        <el-icon style="margin-right: 3px"><Search /></el-icon> 点击搜索
      </el-button>
      <el-button type="primary" style="margin-right: 8px; margin-top: 8px">
        <el-icon style="margin-right: 3px"><Refresh /></el-icon> 重置
      </el-button>
    </el-card>
    <el-card style="margin-bottom: 8px" shadow="hover">
      <!-- 添加物资按钮 -->
      <el-button
        type="primary"
        @click="dialogFormVisible = true"
        style="margin-bottom: 8px"
      >
        <el-icon style="margin-right: 3px"><Plus /></el-icon> 添加物资
      </el-button>
      <!-- 表格 -->
      <el-table :data="currentTableData" height="620" style="width: 100%">
        <el-table-column
          fixed="left"
          prop="data1"
          label="物资名称"
          width="150"
        />
        <el-table-column prop="data2" label="物资类型" width="130" />
        <el-table-column prop="data3" label="存储位置" width="130" />
        <el-table-column prop="data4" label="存储数量" width="130" />
        <el-table-column prop="data5" label="负责人" width="130" />
        <el-table-column prop="data6" label="状态" width="130" />
        <el-table-column prop="data7" label="生产时间" width="130" />
        <el-table-column prop="data8" label="保质期或有效期" width="130" />
        <el-table-column prop="data9" label="价格" width="130" />
        <el-table-column prop="data10" label="成本" width="130" />
        <el-table-column prop="number" label="物资编号" width="130" />
        <el-table-column fixed="right" min-width="170">
          <template #header>
            <el-input
              v-model="search"
              placeholder="搜索内容"
              @input="handleSearch"
              width="130"
            />
          </template>
          <template #default="scope"
            ><el-button
              link
              type="primary"
              @click.prevent="editRow(scope.$index)"
              ><el-icon><EditPen /></el-icon> 修改</el-button
            >
            <el-button
              link
              type="primary"
              @click.prevent="deleteRow(scope.$index)"
            >
              <el-icon><Delete /></el-icon> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[15, 20, 30, 40]"
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
        <el-form-item label="物资名称" :label-width="formLabelWidth">
          <el-input v-model="form.data1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="物资类型" :label-width="formLabelWidth">
          <el-input v-model="form.data2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="存储位置" :label-width="formLabelWidth">
          <el-input v-model="form.data3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="存储数量" :label-width="formLabelWidth">
          <el-input v-model="form.data4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input v-model="form.data5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.data6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="生产日期" :label-width="formLabelWidth">
          <el-input v-model="form.data7" autocomplete="off" />
        </el-form-item>
        <el-form-item label="保质期或有效期" :label-width="formLabelWidth">
          <el-input v-model="form.data8" autocomplete="off" />
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.data9" autocomplete="off" />
        </el-form-item>
        <el-form-item label="成本" :label-width="formLabelWidth">
          <el-input v-model="form.data10" autocomplete="off" />
        </el-form-item>
        <el-form-item label="物资编号" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitFormed"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 添加对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="添加物资"
      width="500"
      align-center
    >
      <el-form :model="form" ref="formRef">
        <el-form-item label="物资名称" :label-width="formLabelWidth">
          <el-input v-model="form.data1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="物资类型" :label-width="formLabelWidth">
          <el-input v-model="form.data2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="存储位置" :label-width="formLabelWidth">
          <el-input v-model="form.data3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="存储数量" :label-width="formLabelWidth">
          <el-input v-model="form.data4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input v-model="form.data5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.data6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="生产日期" :label-width="formLabelWidth">
          <el-input v-model="form.data7" autocomplete="off" />
        </el-form-item>
        <el-form-item label="保质期或有效期" :label-width="formLabelWidth">
          <el-input v-model="form.data8" autocomplete="off" />
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.data9" autocomplete="off" />
        </el-form-item>
        <el-form-item label="成本" :label-width="formLabelWidth">
          <el-input v-model="form.data10" autocomplete="off" />
        </el-form-item>
        <el-form-item label="物资编号" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
        <div class="tip">数据为空将无法提交</div>
      </el-form>
      <!-- 添加时有空显示 -->
      <!-- <el-dialog
        v-model="dialogVisible"
        width="150"
        center
      >
        <span> 数据不能为空 </span>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" size='small' @click="dialogVisible = false">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog> -->
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

//表单输入信息
const form = reactive({
  data1: "",
  data2: "",
  data3: "",
  data4: "",
  data5: "",
  data6: "",
  data7: "",
  data8: "",
  data9: "",
  number: "",
  data10: ""
});
//表格数据
const tableData = ref([
  {
    data1: "无间电脑",
    data2: "电子产品",
    data3: "太平仓库",
    data4: "15625台",
    data5: "张有为",
    data6: "正常",
    data7: "2022年5月",
    data8: "2030年5月",
    data9: "8000元",
    data10: "5000元",
    number: "123456789"
  },
  {
    data1: "天乐手机",
    data2: "数码设备",
    data3: "中心仓库",
    data4: "8000部",
    data5: "王明",
    data6: "正常",
    data7: "2022年6月",
    data8: "2030年6月",
    data9: "10000元",
    data10: "6000元",
    number: "987654321"
  },
  {
    data1: "爱风油烟机",
    data2: "家用电器",
    data3: "东方仓库",
    data4: "5000件",
    data5: "李华",
    data6: "停用",
    data7: "2022年7月",
    data8: "2029年7月",
    data9: "7000元",
    data10: "4000元",
    number: "246813579"
  },
  {
    data1: "兰州铅笔",
    data2: "文具用品",
    data3: "西部仓库",
    data4: "10000盒",
    data5: "刘强",
    data6: "报废",
    data7: "2022年8月",
    data8: "2029年8月",
    data9: "6000元",
    data10: "3000元",
    number: "135792468"
  },
  {
    data1: "无畏电冰箱",
    data2: "家用电器",
    data3: "北方仓库",
    data4: "3000台",
    data5: "王艺",
    data6: "正常",
    data7: "2022年9月",
    data8: "2030年9月",
    data9: "9000元",
    data10: "5500元",
    number: "987123456"
  },
  {
    data1: "倒数电脑",
    data2: "电子产品",
    data3: "南方仓库",
    data4: "500台",
    data5: "刘峰",
    data6: "正常",
    data7: "2022年10月",
    data8: "2030年10月",
    data9: "12000元",
    data10: "7000元",
    number: "654789321"
  },
  {
    data1: "稀疏毛巾",
    data2: "日用品",
    data3: "西南仓库",
    data4: "20000件",
    data5: "张丽",
    data6: "停用",
    data7: "2022年11月",
    data8: "2029年11月",
    data9: "80元",
    data10: "45元",
    number: "369852147"
  },
  {
    data1: "圣明手术台",
    data2: "医疗器械",
    data3: "东北仓库",
    data4: "1000件",
    data5: "王强",
    data6: "报废",
    data7: "2022年12月",
    data8: "2029年12月",
    data9: "15000元",
    data10: "8000元",
    number: "147258369"
  },
  {
    data1: "45手机",
    data2: "电子产品",
    data3: "东南仓库",
    data4: "8000部",
    data5: "李明",
    data6: "正常",
    data7: "2023年1月",
    data8: "2031年1月",
    data9: "11000元",
    data10: "6500元",
    number: "258369147"
  },
  {
    data1: "颇丰灶台",
    data2: "家用电器",
    data3: "西北仓库",
    data4: "4000件",
    data5: "王刚",
    data6: "正常",
    data7: "2023年2月",
    data8: "2031年2月",
    data9: "10000元",
    data10: "6000元",
    number: "789654123"
  },
  {
    data1: "沙发",
    data2: "家具用品",
    data3: "中南仓库",
    data4: "2000套",
    data5: "刘艳",
    data6: "停用",
    data7: "2023年3月",
    data8: "2030年3月",
    data9: "9000元",
    data10: "5500元",
    number: "369147258"
  },
  {
    data1: "湿度洗面奶",
    data2: "日用品",
    data3: "东西仓库",
    data4: "6000件",
    data5: "张强",
    data6: "报废",
    data7: "2023年4月",
    data8: "2030年4月",
    data9: "800元",
    data10: "450元",
    number: "654321987"
  },
  {
    data1: "花腔手表",
    data2: "电子产品",
    data3: "南北仓库",
    data4: "3000块",
    data5: "王强",
    data6: "正常",
    data7: "2023年5月",
    data8: "2031年5月",
    data9: "9000元",
    data10: "5500元",
    number: "123987654"
  },
  {
    data1: "观念鱿鱼",
    data2: "食品",
    data3: "西南北仓库",
    data4: "5000包",
    data5: "李丽",
    data6: "正常",
    data7: "2023年6月",
    data8: "2031年6月",
    data9: "100元",
    data10: "60元",
    number: "456321789"
  },
  {
    data1: "uio跑步机",
    data2: "体育用品",
    data3: "东西南仓库",
    data4: "1000件",
    data5: "张磊",
    data6: "停用",
    data7: "2023年7月",
    data8: "2030年7月",
    data9: "8000元",
    data10: "5000元",
    number: "789654123"
  },
  {
    data1: "阿松大护肤品",
    data2: "日用品",
    data3: "中北仓库",
    data4: "2000瓶",
    data5: "刘娟",
    data6: "报废",
    data7: "2023年8月",
    data8: "2030年8月",
    data9: "70元",
    data10: "40元",
    number: "987456321"
  },
  {
    data1: "智能音响",
    data2: "电子产品",
    data3: "西南北仓库",
    data4: "4000台",
    data5: "王宇",
    data6: "正常",
    data7: "2023年9月",
    data8: "2031年9月",
    data9: "11000元",
    data10: "6500元",
    number: "654987321"
  },
  {
    data1: "休闲食品",
    data2: "食品",
    data3: "东南西北仓库",
    data4: "6000包",
    data5: "李飞",
    data6: "正常",
    data7: "2023年10月",
    data8: "2031年10月",
    data9: "12000元",
    data10: "7000元",
    number: "321456987"
  },
  {
    data1: "健身器械",
    data2: "体育用品",
    data3: "东西南北仓库",
    data4: "1500件",
    data5: "张军",
    data6: "停用",
    data7: "2023年11月",
    data8: "2030年11月",
    data9: "9000元",
    data10: "5500元",
    number: "789123456"
  },
  {
    data1: "洗护用品",
    data2: "日用品",
    data3: "中东北仓库",
    data4: "2500瓶",
    data5: "刘红",
    data6: "报废",
    data7: "2023年12月",
    data8: "2030年12月",
    data9: "8000元",
    data10: "4500元",
    number: "147789654"
  },
  {
    data1: "智能手环",
    data2: "电子产品",
    data3: "东西南北仓库",
    data4: "2000个",
    data5: "王明",
    data6: "正常",
    data7: "2024年1月",
    data8: "2032年1月",
    data9: "10000元",
    data10: "6000元",
    number: "123654987"
  },
  {
    data1: "速食品",
    data2: "食品",
    data3: "中东南北仓库",
    data4: "3000包",
    data5: "李华",
    data6: "正常",
    data7: "2024年2月",
    data8: "2032年2月",
    data9: "11000元",
    data10: "6500元",
    number: "456987321"
  },
  {
    data1: "篮球",
    data2: "体育用品",
    data3: "西南北仓库",
    data4: "800个",
    data5: "张强",
    data6: "停用",
    data7: "2024年3月",
    data8: "2031年3月",
    data9: "8000元",
    data10: "5000元",
    number: "789123654"
  },
  {
    data1: "洗发露",
    data2: "日用品",
    data3: "东南北仓库",
    data4: "1500瓶",
    data5: "刘红",
    data6: "报废",
    data7: "2024年4月",
    data8: "2031年4月",
    data9: "7000元",
    data10: "4000元",
    number: "987456123"
  }
]);
const currentData = ref(tableData.value); //渲染时所操作数据

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
// 点击修改按钮时触发的函数
const editRow = (index: number) => {
  // 找到需要修改的数据
  editData.value =
    currentData.value[index + pageSize.value * (currentPage.value - 1)];
  // 将数据填充到修改表单中
  form.data1 = editData.value.data1;
  form.data2 = editData.value.data2;
  form.data3 = editData.value.data3;
  form.data4 = editData.value.data4;
  form.data5 = editData.value.data5;
  form.data6 = editData.value.data6;
  form.data7 = editData.value.data7;
  form.data8 = editData.value.data8;
  form.data9 = editData.value.data9;
  form.number = editData.value.number;
  form.data10 = editData.value.data10;
  // 显示修改对话框
  dialogOverflowVisible.value = true;
};
// 提交修改表单后操作
const cancel = () => {
  dialogOverflowVisible.value = false;
  for (const key in form) {
    form[key] = "";
  }
};
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
// const dialogVisible = ref(false);
const isFormFilled = () => {
  for (const key in form) {
    if (!form[key]) {
      return false; // 如果任何一个属性的值为空，则返回 false
    }
  }
  return true; // 如果所有属性的值都不为空，则返回 true
};
const submitForm = () => {
  if (isFormFilled()) {
    // 如果数据都不为空
    // 将表单数据添加到表格数据中
    currentData.value.push({ ...form });
    // 更新currentData
    // currentData.value = tableData.value;
    console.log({ ...form });
    if (currentData.value !== tableData.value) {
      tableData.value.push({ ...form });
    }
    // 清空表单数据
    for (const key in form) {
      form[key] = "";
    }
    dialogFormVisible.value = false;
    totalItems.value = totalItems.value + 1;

    handleSizeChange(pageSize.value);
    //  else {
    //   dialogVisible.value = true;
    // }
  }
};
// 分页器
const currentPage = ref<number>(1); //当前页数
const pageSize = ref<number>(15); // 每页条数
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
  handleSizeChange(15);
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
        item.data8.toLowerCase().includes(keyword) ||
        item.data9.toLowerCase().includes(keyword) ||
        item.data10.toLowerCase().includes(keyword) ||
        item.number.toLowerCase().includes(keyword) ||
        regex.test(item.data1) // 使用正则表达式进行模糊匹配
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
const handleSearch = () => {
  searchItems();
};
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
.tip {
  text-align: center;
  color: red;
}
:deep(.el-table__header th) {
  font-weight: bold;
  color: black;
  background-color: #f5f7fa !important;
}
</style>
