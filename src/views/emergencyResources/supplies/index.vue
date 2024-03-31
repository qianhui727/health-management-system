<template>
  <div class="total">
    <!-- 添加物资按钮 -->
    <el-button plain @click="dialogFormVisible = true">
      添加物资信息
    </el-button>
    <!-- 表格 -->
    <el-table :data="currentTableData" height="620" style="width: 100%">
      <el-table-column fixed="left" prop="data1" label="物资名称" width="150" />
      <el-table-column prop="data2" label="物资类型" width="150" />
      <el-table-column prop="data3" label="储存仓库" width="150" />
      <el-table-column prop="data4" label="存储数量" width="150" />
      <el-table-column prop="data5" label="负责人" width="150" />
      <el-table-column prop="data6" label="质量检测记录" width="180" />
      <el-table-column label="出入库情况" min-width="150">
        <template #default="{ row }">
          <el-tooltip :content="'物资状态: ' + row.status" placement="top">
            <el-switch
              v-model="row.status"
              :active-value="'已出库'"
              :inactive-value="'已入库'"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: skyblue;
              "
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="data7" label="生产时间" width="150" />
      <el-table-column prop="data8" label="保质期或有效期" width="150" />
      <el-table-column prop="data9" label="价格" width="150" />
      <el-table-column prop="data10" label="成本" width="150" />
      <el-table-column prop="number" label="物资编号" width="150" />
      <el-table-column fixed="right" width="170">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="请输入您要查找的信息"
            @input="handleSearch"
          />
        </template>
        <template #default="scope"
          ><el-button size="small" @click.prevent="editRow(scope.$index)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[12, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="totalItems"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
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
        <el-form-item label="储存仓库" :label-width="formLabelWidth">
          <el-input v-model="form.data3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="存储数量" :label-width="formLabelWidth">
          <el-input v-model="form.data4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input v-model="form.data5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="质量检测记录" :label-width="formLabelWidth">
          <el-input v-model="form.data6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="(已出库/已入库)" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off" />
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
          <el-button @click="dialogOverflowVisible = false">取消</el-button>
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
        <el-form-item label="储存仓库" :label-width="formLabelWidth">
          <el-input v-model="form.data3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="存储数量" :label-width="formLabelWidth">
          <el-input v-model="form.data4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input v-model="form.data5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="质量检测记录" :label-width="formLabelWidth">
          <el-input v-model="form.data6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="(已出库/已入库)" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off" />
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
  data10: "",
  status: ""
});
//表格数据
const tableData = ref([
  {
    data1: "智能手机",
    data2: "通讯产品",
    data3: "平安仓库",
    data4: "8000部",
    data5: "王大明",
    data6: "2023年4月21日  正常",
    data7: "2022年6月",
    data8: "2030年6月",
    data9: "10000元",
    data10: "6000元",
    number: "987654321",
    status: "已出库"
  },
  {
    data1: "笔记本电脑",
    data2: "电子产品",
    data3: "永安仓库",
    data4: "5000台",
    data5: "李小明",
    data6: "2023年5月3日  正常",
    data7: "2022年7月",
    data8: "2030年7月",
    data9: "12000元",
    data10: "7000元",
    number: "456789012",
    status: "已出库"
  },
  {
    data1: "平板电脑",
    data2: "电子产品",
    data3: "中心仓库",
    data4: "3000台",
    data5: "赵小红",
    data6: "2023年5月5日  正常",
    data7: "2022年8月",
    data8: "2030年8月",
    data9: "15000元",
    data10: "8000元",
    number: "234567890",
    status: "已入库"
  },
  {
    data1: "智能音箱",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "4000个",
    data5: "张小强",
    data6: "2023年5月8日  正常",
    data7: "2022年9月",
    data8: "2030年9月",
    data9: "18000元",
    data10: "9000元",
    number: "345678901",
    status: "已出库"
  },
  {
    data1: "数码相机",
    data2: "摄影器材",
    data3: "小众仓库",
    data4: "2000台",
    data5: "王小明",
    data6: "2023年5月10日  正常",
    data7: "2022年10月",
    data8: "2030年10月",
    data9: "20000元",
    data10: "9500元",
    number: "456789012",
    status: "已入库"
  },
  {
    data1: "无线路由器",
    data2: "网络设备",
    data3: "天乐仓库",
    data4: "1000个",
    data5: "赵小强",
    data6: "2023年5月12日  正常",
    data7: "2022年11月",
    data8: "2030年11月",
    data9: "22000元",
    data10: "9800元",
    number: "567890123",
    status: "已出库"
  },
  {
    data1: "平板电视",
    data2: "家电产品",
    data3: "天乐仓库",
    data4: "500台",
    data5: "李小强",
    data6: "2023年5月14日  正常",
    data7: "2022年12月",
    data8: "2030年12月",
    data9: "24000元",
    data10: "9900元",
    number: "678901234",
    status: "已出库"
  },
  {
    data1: "空气净化器",
    data2: "家居用品",
    data3: "长安仓库",
    data4: "3000个",
    data5: "张小红",
    data6: "2023年5月16日  正常",
    data7: "2023年1月",
    data8: "2031年1月",
    data9: "26000元",
    data10: "10000元",
    number: "789012345",
    status: "已出库"
  },
  {
    data1: "智能手表",
    data2: "智能穿戴",
    data3: "天乐仓库",
    data4: "2000个",
    data5: "王小明",
    data6: "2023年5月18日  正常",
    data7: "2023年2月",
    data8: "2031年2月",
    data9: "28000元",
    data10: "10500元",
    number: "890123456",
    status: "已入库"
  },
  {
    data1: "智能手环",
    data2: "智能穿戴",
    data3: "太平仓库",
    data4: "1000个",
    data5: "李小红",
    data6: "2023年5月20日  正常",
    data7: "2023年3月",
    data8: "2031年3月",
    data9: "30000元",
    data10: "11000元",
    number: "901234567",
    status: "已出库"
  },
  {
    data1: "智能家居套装",
    data2: "智能家居",
    data3: "平安仓库",
    data4: "500套",
    data5: "张小明",
    data6: "2023年5月22日  正常",
    data7: "2023年4月",
    data8: "2031年4月",
    data9: "32000元",
    data10: "11500元",
    number: "012345678",
    status: "已出库"
  },
  {
    data1: "智能门锁",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "300个",
    data5: "赵小红",
    data6: "2023年5月24日  正常",
    data7: "2023年5月",
    data8: "2031年5月",
    data9: "34000元",
    data10: "12000元",
    number: "123456789",
    status: "已入库"
  },
  {
    data1: "智能摄像头",
    data2: "智能家居",
    data3: "小众仓库",
    data4: "200个",
    data5: "王小红",
    data6: "2023年5月26日  正常",
    data7: "2023年6月",
    data8: "2031年6月",
    data9: "36000元",
    data10: "12500元",
    number: "234567890",
    status: "已出库"
  },
  {
    data1: "VR眼镜",
    data2: "智能穿戴",
    data3: "天乐仓库",
    data4: "100个",
    data5: "李小明",
    data6: "2023年5月28日  正常",
    data7: "2023年7月",
    data8: "2031年7月",
    data9: "38000元",
    data10: "13000元",
    number: "345678901",
    status: "已出库"
  },
  {
    data1: "智能手环",
    data2: "智能穿戴",
    data3: "太平仓库",
    data4: "50个",
    data5: "赵小明",
    data6: "2023年5月30日  正常",
    data7: "2023年8月",
    data8: "2031年8月",
    data9: "40000元",
    data10: "13500元",
    number: "456789012",
    status: "已出库"
  },
  {
    data1: "智能音箱",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "20个",
    data5: "王小明",
    data6: "2023年6月1日  正常",
    data7: "2023年9月",
    data8: "2031年9月",
    data9: "42000元",
    data10: "14000元",
    number: "567890123",
    status: "已出库"
  },
  {
    data1: "智能家居套装",
    data2: "智能家居",
    data3: "平安仓库",
    data4: "10套",
    data5: "李小明",
    data6: "2023年6月3日  正常",
    data7: "2023年10月",
    data8: "2031年10月",
    data9: "44000元",
    data10: "14500元",
    number: "678901234",
    status: "已出库"
  },
  {
    data1: "智能门锁",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "5个",
    data5: "李小红",
    data6: "2023年6月5日  正常",
    data7: "2023年11月",
    data8: "2031年11月",
    data9: "46000元",
    data10: "15000元",
    number: "789012345",
    status: "已出库"
  },
  {
    data1: "智能门锁",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "5个",
    data5: "王小明",
    data6: "2023年6月7日  正常",
    data7: "2023年12月",
    data8: "2031年12月",
    data9: "48000元",
    data10: "15500元",
    number: "890123456",
    status: "已入库"
  },
  {
    data1: "智能摄像头",
    data2: "智能家居",
    data3: "小众仓库",
    data4: "2个",
    data5: "赵小明",
    data6: "2023年6月9日  正常",
    data7: "2024年1月",
    data8: "2032年1月",
    data9: "50000元",
    data10: "16000元",
    number: "901234567",
    status: "已出库"
  },
  {
    data1: "VR眼镜",
    data2: "智能穿戴",
    data3: "天乐仓库",
    data4: "1个",
    data5: "李小明",
    data6: "2023年6月11日  正常",
    data7: "2024年2月",
    data8: "2032年2月",
    data9: "52000元",
    data10: "16500元",
    number: "012345678",
    status: "已出库"
  },
  {
    data1: "智能手表",
    data2: "智能穿戴",
    data3: "太平仓库",
    data4: "10个",
    data5: "赵小红",
    data6: "2023年6月13日  正常",
    data7: "2024年3月",
    data8: "2032年3月",
    data9: "54000元",
    data10: "17000元",
    number: "123456789",
    status: "已入库"
  },
  {
    data1: "智能家居套装",
    data2: "智能家居",
    data3: "平安仓库",
    data4: "5套",
    data5: "王小明",
    data6: "2023年6月15日  正常",
    data7: "2024年4月",
    data8: "2032年4月",
    data9: "56000元",
    data10: "17500元",
    number: "234567890",
    status: "已出库"
  },
  {
    data1: "智能门锁",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "3个",
    data5: "李小明",
    data6: "2023年6月17日  正常",
    data7: "2024年5月",
    data8: "2032年5月",
    data9: "58000元",
    data10: "18000元",
    number: "345678901",
    status: "已入库"
  },
  {
    data1: "智能门锁",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "3个",
    data5: "赵小明",
    data6: "2023年6月19日  正常",
    data7: "2024年6月",
    data8: "2032年6月",
    data9: "60000元",
    data10: "18500元",
    number: "456789012",
    status: "已出库"
  },
  {
    data1: "智能摄像头",
    data2: "智能家居",
    data3: "小众仓库",
    data4: "1个",
    data5: "王小红",
    data6: "2023年6月21日  正常",
    data7: "2024年7月",
    data8: "2032年7月",
    data9: "62000元",
    data10: "19000元",
    number: "567890123",
    status: "已出库"
  },
  {
    data1: "VR眼镜",
    data2: "智能穿戴",
    data3: "天乐仓库",
    data4: "1个",
    data5: "李小红",
    data6: "2023年6月23日  正常",
    data7: "2024年8月",
    data8: "2032年8月",
    data9: "64000元",
    data10: "19500元",
    number: "678901234",
    status: "已入库"
  },
  {
    data1: "智能手表",
    data2: "智能穿戴",
    data3: "太平仓库",
    data4: "10个",
    data5: "张小红",
    data6: "2023年6月25日  正常",
    data7: "2024年9月",
    data8: "2032年9月",
    data9: "66000元",
    data10: "20000元",
    number: "789012345",
    status: "已出库"
  },
  {
    data1: "智能家居套装",
    data2: "智能家居",
    data3: "平安仓库",
    data4: "5套",
    data5: "赵小明",
    data6: "2023年6月27日  正常",
    data7: "2024年10月",
    data8: "2032年10月",
    data9: "68000元",
    data10: "20500元",
    number: "890123456",
    status: "已出库"
  },
  {
    data1: "智能门锁",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "3个",
    data5: "王小明",
    data6: "2023年6月29日  正常",
    data7: "2024年11月",
    data8: "2032年11月",
    data9: "70000元",
    data10: "21000元",
    number: "901234567",
    status: "已入库"
  },
  {
    data1: "智能门锁",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "3个",
    data5: "李小红",
    data6: "2023年7月1日  正常",
    data7: "2024年12月",
    data8: "2033年12月",
    data9: "72000元",
    data10: "21500元",
    number: "012345678",
    status: "已入库"
  },
  {
    data1: "智能摄像头",
    data2: "智能家居",
    data3: "小众仓库",
    data4: "1个",
    data5: "赵小红",
    data6: "2023年7月3日  正常",
    data7: "2025年1月",
    data8: "2033年1月",
    data9: "74000元",
    data10: "22000元",
    number: "123456789",
    status: "已出库"
  },
  {
    data1: "VR眼镜",
    data2: "智能穿戴",
    data3: "天乐仓库",
    data4: "1个",
    data5: "王小明",
    data6: "2023年7月5日  正常",
    data7: "2025年2月",
    data8: "2033年2月",
    data9: "76000元",
    data10: "22500元",
    number: "234567890",
    status: "已入库"
  },
  {
    data1: "智能手表",
    data2: "智能穿戴",
    data3: "太平仓库",
    data4: "10个",
    data5: "李小红",
    data6: "2023年7月7日  正常",
    data7: "2025年3月",
    data8: "2033年3月",
    data9: "78000元",
    data10: "23000元",
    number: "345678901",
    status: "已出库"
  },
  {
    data1: "智能家居套装",
    data2: "智能家居",
    data3: "平安仓库",
    data4: "5套",
    data5: "王小明",
    data6: "2023年7月9日  正常",
    data7: "2025年4月",
    data8: "2033年4月",
    data9: "80000元",
    data10: "23500元",
    number: "456789012",
    status: "已入库"
  },
  {
    data1: "智能门锁",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "3个",
    data5: "李小红",
    data6: "2023年7月11日  正常",
    data7: "2025年5月",
    data8: "2033年5月",
    data9: "82000元",
    data10: "24000元",
    number: "567890123",
    status: "已入库"
  },
  {
    data1: "智能门锁",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "3个",
    data5: "赵小红",
    data6: "2023年7月13日  正常",
    data7: "2025年6月",
    data8: "2033年6月",
    data9: "84000元",
    data10: "24500元",
    number: "678901234",
    status: "已出库"
  },
  {
    data1: "智能摄像头",
    data2: "智能家居",
    data3: "小众仓库",
    data4: "1个",
    data5: "王小红",
    data6: "2023年7月15日  正常",
    data7: "2025年7月",
    data8: "2033年7月",
    data9: "86000元",
    data10: "25000元",
    number: "789012345",
    status: "已出库"
  },
  {
    data1: "VR眼镜",
    data2: "智能穿戴",
    data3: "天乐仓库",
    data4: "1个",
    data5: "李小明",
    data6: "2023年7月17日  正常",
    data7: "2025年8月",
    data8: "2033年8月",
    data9: "88000元",
    data10: "25500元",
    number: "890123456",
    status: "已入库"
  },
  {
    data1: "智能手表",
    data2: "智能穿戴",
    data3: "太平仓库",
    data4: "10个",
    data5: "赵小明",
    data6: "2023年7月19日  正常",
    data7: "2025年9月",
    data8: "2033年9月",
    data9: "90000元",
    data10: "26000元",
    number: "901234567",
    status: "已出库"
  },
  {
    data1: "智能家居套装",
    data2: "智能家居",
    data3: "平安仓库",
    data4: "5套",
    data5: "李小明",
    data6: "2023年7月21日  正常",
    data7: "2025年10月",
    data8: "2033年10月",
    data9: "92000元",
    data10: "26500元",
    number: "012345678",
    status: "已入库"
  },
  {
    data1: "智能门锁",
    data2: "智能家居",
    data3: "大众仓库",
    data4: "3个",
    data5: "王小明",
    data6: "2023年7月23日  正常",
    data7: "2025年11月",
    data8: "2033年11月",
    data9: "94000元",
    data10: "27000元",
    number: "123456789",
    status: "已出库"
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
  currentData.value.push({ ...form });
  // 更新currentData
  // currentData.value = tableData.value;
  console.log({ ...form });
  if (currentData.value !== tableData.value) {
    tableData.value.push({ ...form });
  }
  /////////////////////////////////////////////////////////
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
  handleSizeChange(12);
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
        item.status.toLowerCase().includes(keyword) ||
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
</style>
