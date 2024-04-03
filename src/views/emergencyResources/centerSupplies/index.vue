<template>
  <div class="total">
    <el-card style="margin-bottom: 8px" shadow="hover">
      <!-- 第一行 -->
      <el-row :gutter="5" style="margin-top: 8px">
        <el-col :span="8"
          ><span>
            仓库类型：
            <el-input style="width: 240px" placeholder="请输入仓库类型" /></span
        ></el-col>
        <el-col :span="8"
          ><span
            >仓库名称：
            <el-input style="width: 240px" placeholder="请输入仓库名称" /></span
        ></el-col>
        <el-col :span="8"
          ><span
            >储存位置：
            <el-input style="width: 240px" placeholder="请输入储存位置" /></span
        ></el-col>
      </el-row>

      <!-- 第二行 -->
      <el-row :gutter="10" style="margin-top: 8px">
        <el-col :span="8"
          ><span style="width: 200px">
            质量情况：
            <el-input style="width: 240px" placeholder="请输入质量情况" /></span
        ></el-col>
        <el-col :span="8"
          ><span
            >主要负责人：
            <el-input
              style="width: 240px"
              placeholder="请输入主要负责人" /></span
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
          label="仓库类型"
          width="150"
        />
        <el-table-column prop="data11" label="仓库名称" width="130" />
        <el-table-column prop="data2" label="仓库容量" width="150" />
        <el-table-column prop="data3" label="储存位置" width="250" />
        <el-table-column prop="data4" label="储存条件" width="170" />
        <el-table-column prop="data5" label="库存情况" width="100" />
        <el-table-column prop="data6" label="质量检测" width="100" />
        <el-table-column prop="data7" label="申领记录" width="160" />
        <el-table-column prop="data8" label="主要负责人" width="150" />
        <el-table-column prop="data9" label="联系方式" width="150" />
        <el-table-column prop="number" label="物资编号" width="150" />
        <el-table-column prop="data10" label="备注" width="150" />

        <el-table-column fixed="right" width="170">
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
          :page-sizes="[13, 20, 30, 40]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="totalItems"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
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
        <el-form-item label="仓库类型" :label-width="formLabelWidth">
          <el-input v-model="form.data1" autocomplete="off" /> </el-form-item
        ><el-form-item label="仓库名称" :label-width="formLabelWidth">
          <el-input v-model="form.data11" autocomplete="off" />
        </el-form-item>
        <el-form-item label="仓库容量" :label-width="formLabelWidth">
          <el-input v-model="form.data2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="存储位置" :label-width="formLabelWidth">
          <el-input v-model="form.data3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="储存条件" :label-width="formLabelWidth">
          <el-input v-model="form.data4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="库存情况" :label-width="formLabelWidth">
          <el-input v-model="form.data5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="质量检测" :label-width="formLabelWidth">
          <el-input v-model="form.data6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="申领记录" :label-width="formLabelWidth">
          <el-input v-model="form.data7" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主要负责人" :label-width="formLabelWidth">
          <el-input v-model="form.data8" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.data9" autocomplete="off" />
        </el-form-item>
        <el-form-item label="物资编号" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.data10" autocomplete="off" />
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
      title="添加信息"
      width="500"
      align-center
    >
      <el-form :model="form" ref="formRef">
        <el-form-item label="仓库类型" :label-width="formLabelWidth">
          <el-input v-model="form.data1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="仓库名称" :label-width="formLabelWidth">
          <el-input v-model="form.data11" autocomplete="off" />
        </el-form-item>
        <el-form-item label="仓库容量" :label-width="formLabelWidth">
          <el-input v-model="form.data2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="存储位置" :label-width="formLabelWidth">
          <el-input v-model="form.data3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="储存条件" :label-width="formLabelWidth">
          <el-input v-model="form.data4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="库存情况" :label-width="formLabelWidth">
          <el-input v-model="form.data5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="质量检测" :label-width="formLabelWidth">
          <el-input v-model="form.data6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="申领记录" :label-width="formLabelWidth">
          <el-input v-model="form.data7" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主要负责人" :label-width="formLabelWidth">
          <el-input v-model="form.data8" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.data9" autocomplete="off" />
        </el-form-item>
        <el-form-item label="物资编号" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.data10" autocomplete="off" />
        </el-form-item>

        <div class="tip">数据为空将无法提交</div>
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

//表单输入信息
const form = reactive({
  data1: "",
  data11: "",
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
    data1: "应急队伍物资仓库",
    data11: "太平仓库",
    data2: "15000平方米",
    data3: "北京市朝阳区光华路",
    data4: "20°C,湿度25%,通风",
    data5: "占用50%",
    data6: "合格",
    data7: "2023年5月18日",
    data8: "张孙殿",
    data9: "15869655458",
    number: "456212389",
    data10: "无破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "天安仓库",
    data2: "12000平方米",
    data3: "上海市浦东新区陆家嘴路",
    data4: "22°C,湿度30%,通风",
    data5: "占用60%",
    data6: "不合格",
    data7: "2023年6月12日",
    data8: "李王庄",
    data9: "13789562354",
    number: "893214567",
    data10: "受潮"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "紫禁城仓库",
    data2: "8000平方米",
    data3: "广东省广州市天河区珠江东路",
    data4: "18°C,湿度20%,通风",
    data5: "占用40%",
    data6: "合格",
    data7: "2023年8月5日",
    data8: "王李山",
    data9: "18965438721",
    number: "547896321",
    data10: "有破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "东方明珠仓库",
    data2: "18000平方米",
    data3: "四川省成都市武侯区人民南路",
    data4: "25°C,湿度35%,通风",
    data5: "占用70%",
    data6: "合格",
    data7: "2023年10月20日",
    data8: "赵刘村",
    data9: "15678965423",
    number: "654789321",
    data10: "丢失"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "西山仓库",
    data2: "20000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "28°C,湿度40%,通风",
    data5: "占用80%",
    data6: "不合格",
    data7: "2024年1月8日",
    data8: "孙王庄",
    data9: "13654789632",
    number: "412365897",
    data10: "受潮"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "九寨沟仓库",
    data2: "25000平方米",
    data3: "湖北省武汉市洪山区珞珈山路",
    data4: "30°C,湿度45%,通风",
    data5: "占用90%",
    data6: "合格",
    data7: "2024年3月15日",
    data8: "李赵山",
    data9: "15987456321",
    number: "987654321",
    data10: "无破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "西双版纳仓库",
    data2: "30000平方米",
    data3: "陕西省西安市未央区凤城四路",
    data4: "32°C,湿度50%,通风",
    data5: "占用100%",
    data6: "合格",
    data7: "2024年5月28日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "丢失"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "20000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "28°C,湿度40%,通风",
    data5: "占用80%",
    data6: "不合格",
    data7: "2024年1月8日",
    data8: "孙王庄",
    data9: "13654789632",
    number: "412365897",
    data10: "受潮"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "30000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "30°C,湿度45%,通风",
    data5: "占用90%",
    data6: "合格",
    data7: "2024年3月15日",
    data8: "李赵山",
    data9: "15987456321",
    number: "987654321",
    data10: "无破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "40000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "32°C,湿度50%,通风",
    data5: "占用100%",
    data6: "合格",
    data7: "2024年5月28日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "丢失"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "50000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "34°C,湿度55%,通风",
    data5: "占用120%",
    data6: "不合格",
    data7: "2024年7月12日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "受潮"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "60000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "36°C,湿度60%,通风",
    data5: "占用140%",
    data6: "合格",
    data7: "2024年9月25日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "有破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "70000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "38°C,湿度65%,通风",
    data5: "占用160%",
    data6: "不合格",
    data7: "2025年1月10日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "无破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "80000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "40°C,湿度70%,通风",
    data5: "占用180%",
    data6: "合格",
    data7: "2025年3月28日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "有破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "90000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "42°C,湿度75%,通风",
    data5: "占用200%",
    data6: "不合格",
    data7: "2025年5月15日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "受潮"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "100000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "44°C,湿度80%,通风",
    data5: "占用220%",
    data6: "合格",
    data7: "2025年7月20日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "无破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "110000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "46°C,湿度85%,通风",
    data5: "占用240%",
    data6: "合格",
    data7: "2025年9月5日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "丢失"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "120000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "48°C,湿度90%,通风",
    data5: "占用260%",
    data6: "不合格",
    data7: "2025年11月15日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "有破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "130000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "50°C,湿度95%,通风",
    data5: "占用280%",
    data6: "合格",
    data7: "2026年1月30日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "无破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "140000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "52°C,湿度100%,通风",
    data5: "占用300%",
    data6: "不合格",
    data7: "2026年3月20日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "受潮"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "150000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "54°C,湿度105%,通风",
    data5: "占用320%",
    data6: "合格",
    data7: "2026年5月5日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "有破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "160000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "56°C,湿度110%,通风",
    data5: "占用340%",
    data6: "不合格",
    data7: "2026年6月20日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "无破损"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "170000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "58°C,湿度115%,通风",
    data5: "占用360%",
    data6: "合格",
    data7: "2026年8月5日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "丢失"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "180000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "60°C,湿度120%,通风",
    data5: "占用380%",
    data6: "不合格",
    data7: "2026年10月20日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "受潮"
  },
  {
    data1: "应急队伍物资仓库",
    data11: "中心仓库",
    data2: "190000平方米",
    data3: "江苏省南京市玄武区中山东路",
    data4: "62°C,湿度125%,通风",
    data5: "占用400%",
    data6: "合格",
    data7: "2026年12月5日",
    data8: "孙刘村",
    data9: "13254789632",
    number: "785236914",
    data10: "无破损"
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
const editRow = (index: number) => {
  //找到修改的数据
  editData.value =
    currentData.value[index + pageSize.value * (currentPage.value - 1)];
  dialogOverflowVisible.value = true;
  // 将数据填充到修改表单中
  form.data1 = editData.value.data1;
  form.data11 = editData.value.data11;
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
const pageSize = ref<number>(13); // 每页条数
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
  handleSizeChange(13);
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
        item.data11.toLowerCase().includes(keyword) ||
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
