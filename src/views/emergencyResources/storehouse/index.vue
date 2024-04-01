<template>
  <div class="total">
    <!-- 添加物资按钮 -->
    <el-button plain @click="dialogFormVisible = true">
      添加仓库信息
    </el-button>
    <!-- 表格 -->
    <el-table :data="currentTableData" height="620" style="width: 100%">
      <el-table-column fixed="left" prop="data1" label="仓库名称" width="150" />
      <el-table-column prop="data2" label="所属企业" width="150" />
      <el-table-column prop="data3" label="详细地址" width="160" />
      <el-table-column prop="data4" label="仓库占地面积" width="150" />
      <el-table-column prop="data5" label="物资类型" width="150" />
      <el-table-column prop="data6" label="存储容量（体积）" width="150" />
      <el-table-column prop="data7" label="运输设施" width="150" />
      <el-table-column prop="data8" label="主要负责人" width="150" />
      <el-table-column prop="data9" label="联系方式" width="150" />
      <el-table-column prop="number" label="仓库编号" width="150" />
      <el-table-column prop="data10" label="备注" width="150" />
      <el-table-column fixed="right" min-width="150">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="请输入您要搜索的内容"
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
    <!-- 修改对话框 -->
    <el-dialog
      v-model="dialogOverflowVisible"
      title="修改信息"
      width="500"
      draggable
      overflow
    >
      <el-form :model="form" ref="formRef">
        <el-form-item label="仓库名称" :label-width="formLabelWidth">
          <el-input v-model="form.data1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属企业" :label-width="formLabelWidth">
          <el-input v-model="form.data2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.data3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="仓库占地面积" :label-width="formLabelWidth">
          <el-input v-model="form.data4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="物资类型" :label-width="formLabelWidth">
          <el-input v-model="form.data5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="存储容量（体积）" :label-width="formLabelWidth">
          <el-input v-model="form.data6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="运输设施" :label-width="formLabelWidth">
          <el-input v-model="form.data7" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主要负责人" :label-width="formLabelWidth">
          <el-input v-model="form.data8" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.data9" autocomplete="off" />
        </el-form-item>
        <el-form-item label="仓库编号" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.data10" autocomplete="off" />
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
      title="添加仓库信息"
      width="500"
      align-center
    >
      <el-form :model="form" ref="formRef">
        <el-form-item label="仓库名称" :label-width="formLabelWidth">
          <el-input v-model="form.data1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属企业" :label-width="formLabelWidth">
          <el-input v-model="form.data2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.data3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="仓库占地面积" :label-width="formLabelWidth">
          <el-input v-model="form.data4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="物资类型" :label-width="formLabelWidth">
          <el-input v-model="form.data5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="存储容量（体积）" :label-width="formLabelWidth">
          <el-input v-model="form.data6" autocomplete="off" />
        </el-form-item>
        <el-form-item label="运输设施" :label-width="formLabelWidth">
          <el-input v-model="form.data7" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主要负责人" :label-width="formLabelWidth">
          <el-input v-model="form.data8" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.data9" autocomplete="off" />
        </el-form-item>
        <el-form-item label="仓库编号" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.data10" autocomplete="off" />
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
  data10: ""
});
//表格数据
const tableData = ref([
  {
    data1: "长安仓库",
    data2: "金玉公司",
    data3: "陕西省西安市雁塔区",
    data4: "2000平方米",
    data5: "医疗器械",
    data6: "3000件",
    data7: "分拨中心",
    data8: "李明",
    data9: "13987654321",
    number: "789456123",
    data10: "包装完好"
  },
  {
    data1: "未央仓库",
    data2: "银海公司",
    data3: "陕西省西安市未央区",
    data4: "1500平方米",
    data5: "家用电器",
    data6: "5000件",
    data7: "物流中心",
    data8: "王刚",
    data9: "13698765432",
    number: "654123789",
    data10: "正常发货"
  },
  {
    data1: "碑林仓库",
    data2: "宝石公司",
    data3: "陕西省西安市碑林区",
    data4: "1800平方米",
    data5: "家具用品",
    data6: "4000件",
    data7: "配送中心",
    data8: "张晓",
    data9: "18765432198",
    number: "987654321",
    data10: "需特别保护"
  },
  {
    data1: "雁塔仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市雁塔区",
    data4: "2450平方米",
    data5: "化妆品",
    data6: "6450件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "18321456987",
    number: "321789654",
    data10: "易碎品"
  },
  {
    data1: "新城仓库",
    data2: "钻石公司",
    data3: "陕西省西安市新城区",
    data4: "4545平方米",
    data5: "数码产品",
    data6: "4560件",
    data7: "运输中心",
    data8: "王艳",
    data9: "13987654321",
    number: "789123456",
    data10: "精密设备"
  },
  {
    data1: "莲湖仓库",
    data2: "金珠公司",
    data3: "陕西省西安市莲湖区",
    data4: "2456平方米",
    data5: "服装鞋帽",
    data6: "4560件",
    data7: "装配中心",
    data8: "李伟",
    data9: "13698765432",
    number: "654789123",
    data10: "时尚潮流"
  },
  {
    data1: "灞桥仓库",
    data2: "金玉公司",
    data3: "陕西省西安市灞桥区",
    data4: "2456平方米",
    data5: "家居用品",
    data6: "4564件",
    data7: "装配中心",
    data8: "王刚",
    data9: "18765432198",
    number: "321456987",
    data10: "环保材料"
  },
  {
    data1: "周至仓库",
    data2: "宝石公司",
    data3: "陕西省西安市周至县",
    data4: "2456平方米",
    data5: "食品饮料",
    data6: "4560件",
    data7: "分拨中心",
    data8: "张晓",
    data9: "18321456987",
    number: "987321654",
    data10: "新鲜蔬果"
  },
  {
    data1: "临潼仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市临潼区",
    data4: "4560平方米",
    data5: "健康保健",
    data6: "45660件",
    data7: "运输中心",
    data8: "赵丽",
    data9: "13987654321",
    number: "789654321",
    data10: "中草药"
  },
  {
    data1: "高陵仓库",
    data2: "钻石公司",
    data3: "陕西省西安市高陵区",
    data4: "4564平方米",
    data5: "玩具乐器",
    data6: "14550件",
    data7: "调度中心",
    data8: "王艳",
    data9: "13698765432",
    number: "654123789",
    data10: "创意礼品"
  },
  {
    data1: "鄠邑仓库",
    data2: "金珠公司",
    data3: "陕西省西安市鄠邑区",
    data4: "24560平方米",
    data5: "文具办公",
    data6: "45600件",
    data7: "物流中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321789654",
    data10: "办公用品"
  },
  {
    data1: "阎良仓库",
    data2: "金玉公司",
    data3: "陕西省西安市阎良区",
    data4: "24560平方米",
    data5: "工艺礼品",
    data6: "145600件",
    data7: "配送中心",
    data8: "王刚",
    data9: "18321456987",
    number: "987456321",
    data10: "艺术品"
  },
  {
    data1: "蓝田仓库",
    data2: "宝石公司",
    data3: "陕西省西安市蓝田县",
    data4: "4560平方米",
    data5: "工装安防",
    data6: "145600件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "13987654321",
    number: "789123456",
    data10: "个人防护"
  },
  {
    data1: "户县仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市户县",
    data4: "45645平方米",
    data5: "电工电料",
    data6: "145645件",
    data7: "装配中心",
    data8: "张晓",
    data9: "13698765432",
    number: "654789123",
    data10: "电气用品"
  },
  {
    data1: "周至仓库",
    data2: "钻石公司",
    data3: "陕西省西安市周至县",
    data4: "3456平方米",
    data5: "五金工具",
    data6: "4560件",
    data7: "分拨中心",
    data8: "王艳",
    data9: "18765432198",
    number: "321456987",
    data10: "工程设备"
  },
  {
    data1: "蓝田仓库",
    data2: "金珠公司",
    data3: "陕西省西安市蓝田县",
    data4: "3456平方米",
    data5: "安全防护",
    data6: "45650件",
    data7: "运输中心",
    data8: "李伟",
    data9: "18321456987",
    number: "987321654",
    data10: "安全设备"
  },
  {
    data1: "周至仓库",
    data2: "金玉公司",
    data3: "陕西省西安市周至县",
    data4: "45650平方米",
    data5: "劳保用品",
    data6: "14560件",
    data7: "装配中心",
    data8: "王刚",
    data9: "13987654321",
    number: "789654321",
    data10: "防护用品"
  },
  {
    data1: "鄠邑仓库",
    data2: "宝石公司",
    data3: "陕西省西安市鄠邑区",
    data4: "4560平方米",
    data5: "消防器材",
    data6: "45655件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "18321456987",
    number: "321789654",
    data10: "消防用品"
  },
  {
    data1: "阎良仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市阎良区",
    data4: "4560平方米",
    data5: "医疗器材",
    data6: "456450件",
    data7: "物流中心",
    data8: "李伟",
    data9: "18765432198",
    number: "987456321",
    data10: "医疗用品"
  },
  {
    data1: "蓝田仓库",
    data2: "钻石公司",
    data3: "陕西省西安市蓝田县",
    data4: "45650平方米",
    data5: "电子产品",
    data6: "22000件",
    data7: "分拨中心",
    data8: "王艳",
    data9: "13987654321",
    number: "789123456",
    data10: "电器设备"
  },
  {
    data1: "长安仓库",
    data2: "金珠公司",
    data3: "陕西省西安市雁塔区",
    data4: "4560平方米",
    data5: "家用电器",
    data6: "24560件",
    data7: "装配中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321456987",
    data10: "家用设备"
  },
  {
    data1: "未央仓库",
    data2: "宝石公司",
    data3: "陕西省西安市未央区",
    data4: "4560平方米",
    data5: "数码产品",
    data6: "24565件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "18321456987",
    number: "987654321",
    data10: "数码设备"
  },
  {
    data1: "碑林仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市碑林区",
    data4: "45655平方米",
    data5: "服装鞋帽",
    data6: "245600件",
    data7: "运输中心",
    data8: "王艳",
    data9: "13987654321",
    number: "789456123",
    data10: "时尚品牌"
  },
  {
    data1: "雁塔仓库",
    data2: "钻石公司",
    data3: "陕西省西安市雁塔区",
    data4: "456平方米",
    data5: "箱包配件",
    data6: "24560件",
    data7: "物流中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321789654",
    data10: "箱包饰品"
  },
  {
    data1: "新城仓库",
    data2: "金珠公司",
    data3: "陕西省西安市新城区",
    data4: "4200平方米",
    data5: "美妆护肤",
    data6: "24560件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "18321456987",
    number: "987321654",
    data10: "美妆用品"
  },
  {
    data1: "莲湖仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市莲湖区",
    data4: "44560平方米",
    data5: "食品饮料",
    data6: "45600件",
    data7: "分拨中心",
    data8: "王艳",
    data9: "13987654321",
    number: "789123456",
    data10: "食品保健"
  },
  {
    data1: "灞桥仓库",
    data2: "钻石公司",
    data3: "陕西省西安市灞桥区",
    data4: "4400平方米",
    data5: "酒水茶叶",
    data6: "29000件",
    data7: "装配中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321456987",
    data10: "饮品类"
  },
  {
    data1: "周至仓库",
    data2: "宝石公司",
    data3: "陕西省西安市周至县",
    data4: "4500平方米",
    data5: "休闲零食",
    data6: "34560件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "18321456987",
    number: "987654321",
    data10: "零食品类"
  },
  {
    data1: "蓝田仓库",
    data2: "金玉公司",
    data3: "陕西省西安市蓝田县",
    data4: "4600平方米",
    data5: "餐饮食材",
    data6: "4500件",
    data7: "物流中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321789654",
    data10: "食材类"
  },
  {
    data1: "阎良仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市阎良区",
    data4: "4700平方米",
    data5: "生鲜蔬果",
    data6: "4560件",
    data7: "分拨中心",
    data8: "王艳",
    data9: "13987654321",
    number: "789456123",
    data10: "生鲜类"
  },
  {
    data1: "蓝田仓库",
    data2: "钻石公司",
    data3: "陕西省西安市蓝田县",
    data4: "4800平方米",
    data5: "冷冻食品",
    data6: "456400件",
    data7: "装配中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321456987",
    data10: "冷冻品"
  },
  {
    data1: "周至仓库",
    data2: "宝石公司",
    data3: "陕西省西安市周至县",
    data4: "4560平方米",
    data5: "速冻食品",
    data6: "34000件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "18321456987",
    number: "987654321",
    data10: "速冻类"
  },
  {
    data1: "新城仓库",
    data2: "金珠公司",
    data3: "陕西省西安市新城区",
    data4: "5000平方米",
    data5: "粮油调料",
    data6: "35000件",
    data7: "物流中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321789654",
    data10: "粮油品类"
  },
  {
    data1: "莲湖仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市莲湖区",
    data4: "5100平方米",
    data5: "干货特产",
    data6: "36000件",
    data7: "分拨中心",
    data8: "王艳",
    data9: "13987654321",
    number: "789123456",
    data10: "特产类"
  },
  {
    data1: "灞桥仓库",
    data2: "钻石公司",
    data3: "陕西省西安市灞桥区",
    data4: "5200平方米",
    data5: "饮料饮品",
    data6: "37000件",
    data7: "装配中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321456987",
    data10: "饮料类"
  },
  {
    data1: "周至仓库",
    data2: "宝石公司",
    data3: "陕西省西安市周至县",
    data4: "5300平方米",
    data5: "奶制品",
    data6: "38000件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "18321456987",
    number: "987654321",
    data10: "奶制品类"
  },
  {
    data1: "蓝田仓库",
    data2: "金珠公司",
    data3: "陕西省西安市蓝田县",
    data4: "5400平方米",
    data5: "冷藏食品",
    data6: "39000件",
    data7: "物流中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321789654",
    data10: "冷藏品"
  },
  {
    data1: "阎良仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市阎良区",
    data4: "5500平方米",
    data5: "新鲜蔬菜",
    data6: "40000件",
    data7: "分拨中心",
    data8: "王艳",
    data9: "13987654321",
    number: "789456123",
    data10: "新鲜类"
  },
  {
    data1: "蓝田仓库",
    data2: "钻石公司",
    data3: "陕西省西安市蓝田县",
    data4: "5600平方米",
    data5: "新鲜水果",
    data6: "41000件",
    data7: "装配中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321456987",
    data10: "水果类"
  },
  {
    data1: "周至仓库",
    data2: "宝石公司",
    data3: "陕西省西安市周至县",
    data4: "5700平方米",
    data5: "农产品",
    data6: "42000件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "18321456987",
    number: "987654321",
    data10: "农产品类"
  },
  {
    data1: "新城仓库",
    data2: "金珠公司",
    data3: "陕西省西安市新城区",
    data4: "5800平方米",
    data5: "时令水果",
    data6: "43000件",
    data7: "物流中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321789654",
    data10: "时令类"
  },
  {
    data1: "莲湖仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市莲湖区",
    data4: "5900平方米",
    data5: "海鲜水产",
    data6: "44000件",
    data7: "分拨中心",
    data8: "王艳",
    data9: "13987654321",
    number: "789123456",
    data10: "海鲜类"
  },
  {
    data1: "灞桥仓库",
    data2: "钻石公司",
    data3: "陕西省西安市灞桥区",
    data4: "6000平方米",
    data5: "肉类禽蛋",
    data6: "45000件",
    data7: "装配中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321456987",
    data10: "肉禽类"
  },
  {
    data1: "周至仓库",
    data2: "宝石公司",
    data3: "陕西省西安市周至县",
    data4: "6100平方米",
    data5: "禽蛋蔬菜",
    data6: "46000件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "18321456987",
    number: "987654321",
    data10: "禽蛋类"
  },
  {
    data1: "蓝田仓库",
    data2: "金珠公司",
    data3: "陕西省西安市蓝田县",
    data4: "6200平方米",
    data5: "烘焙食品",
    data6: "47000件",
    data7: "物流中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321789654",
    data10: "烘焙类"
  },
  {
    data1: "阎良仓库",
    data2: "翡翠公司",
    data3: "陕西省西安市阎良区",
    data4: "6300平方米",
    data5: "速食冻品",
    data6: "48000件",
    data7: "分拨中心",
    data8: "王艳",
    data9: "13987654321",
    number: "789456123",
    data10: "速食类"
  },
  {
    data1: "蓝田仓库",
    data2: "钻石公司",
    data3: "陕西省西安市蓝田县",
    data4: "6400平方米",
    data5: "即食火锅",
    data6: "49000件",
    data7: "装配中心",
    data8: "李伟",
    data9: "18765432198",
    number: "321456987",
    data10: "火锅类"
  },
  {
    data1: "周至仓库",
    data2: "宝石公司",
    data3: "陕西省西安市周至县",
    data4: "6500平方米",
    data5: "速食便当",
    data6: "50000件",
    data7: "调度中心",
    data8: "赵丽",
    data9: "18321456987",
    number: "987654321",
    data10: "便当类"
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
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
