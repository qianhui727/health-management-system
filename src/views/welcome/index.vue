<template>
  <div class="flex flex-col">
    <el-card
      ><div>数字化统计</div>
      <div style="margin-top: 7px; margin-bottom: 7px">
        <el-select
          v-model="value1"
          clearable
          placeholder="选择类型"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button style="margin-left: 5px" type="primary">点击</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="6"
          ><!-- 第一个卡片 -->
          <el-card
            style="width: 250px; height: 230px; background-color: #f8f7f6"
            shadow="hover"
          >
            <div class="card-header">
              <span style="font-size: 12px">实时仓库数量</span>
            </div>
            <p style="font-weight: bold; font-size: 40px; height: 0px">
              5,621个
            </p>
            <div id="chart3" style="height: 250px; width: 100%"></div> </el-card
        ></el-col>
        <el-col :span="6">
          <!-- 第二个卡片 -->
          <el-card
            style="width: 250px; height: 230px; background-color: #f8f7f6"
            shadow="hover"
          >
            <div class="card-header">
              <span style="font-size: 12px">可调配医疗工作人员数量</span>
            </div>
            <p style="font-weight: bold; font-size: 40px; height: 0px">
              2251人
            </p>
            <div id="chart4" style="height: 250px; width: 100%"></div>
            <template #footer>
              <span style="font-size: 12px"
                >周同比 11% <el-icon style="color: #54af37"></el-icon
              ></span>
              <span style="font-size: 12px; margin-left: 30px">
                日同比 5% <el-icon style="color: red"><ArrowDownBold /></el-icon
              ></span>
            </template> </el-card
        ></el-col>
        <el-col :span="6">
          <!-- 第三个卡片 -->
          <el-card
            style="width: 250px; height: 230px; background-color: #f8f7f6"
            shadow="hover"
          >
            <div class="card-header">
              <span style="font-size: 12px">总仓库剩余容量</span>
            </div>
            <p
              style="
                font-weight: bold;
                font-size: 40px;
                height: 80px;
                margin-top: 3px;
              "
            >
              85454m³
            </p>
            <el-progress
              :text-inside="true"
              :stroke-width="26"
              :percentage="70"
            />

            <template #footer>
              <span style="font-size: 12px"
                >周同比 12%
                <el-icon style="color: #54af37"><ArrowUpBold /></el-icon>
              </span>
              <span style="font-size: 12px; margin-left: 30px">
                日同比 32%
                <el-icon style="color: #54af37"><ArrowDownBold /></el-icon
              ></span>
            </template> </el-card
        ></el-col>
        <el-col :span="6"
          ><!-- 第四个卡片 -->
          <el-card
            style="width: 250px; height: 230px; background-color: #f8f7f6"
            shadow="hover"
          >
            <div class="card-header">
              <span style="font-size: 12px">可调用物资</span>
            </div>
            <p
              style="
                font-weight: bold;
                font-size: 40px;
                height: 80px;
                margin-top: 3px;
              "
            >
              25%
            </p>
            <el-progress
              :text-inside="true"
              :stroke-width="26"
              :percentage="25"
            />
            <template #footer>
              <span style="font-size: 12px"
                >周同比 15%
                <el-icon style="color: #54af37"><ArrowDownBold /></el-icon
              ></span>
              <span style="font-size: 12px; margin-left: 30px">
                日同比 9% <el-icon style="color: red"><ArrowDownBold /></el-icon
              ></span>
            </template> </el-card
        ></el-col>
      </el-row>
    </el-card>

    <!--  111111111111111111111111111111  -->

    <el-card style="margin-top: 15px">
      <div style="margin-bottom: 8px">可视化统计</div>
      <el-row :gutter="20">
        <el-col :span="16">
          <!-- 第五个卡片 -->
          <el-card shadow="hover" style="background-color: #f8f7f6">
            <div class="card-header">
              <span style="font-size: 20px">总出入库情况统计(kg)</span>
            </div>
            <div id="chart2" style="height: 300px; width: 100%"></div>
            <template #footer>
              <div>
                <span style="font-size: 12px"
                  >周同比入库 11%
                  <el-icon style="color: #54af37"><ArrowUpBold /></el-icon
                ></span>
                <span style="font-size: 12px; margin-left: 30px">
                  日同比入库 5%
                  <el-icon style="color: red"><ArrowDownBold /></el-icon
                ></span>
              </div>
              <div>
                <span style="font-size: 12px"
                  >周同比出库 10%
                  <el-icon style="color: #54af37"><ArrowUpBold /></el-icon
                ></span>
                <span style="font-size: 12px; margin-left: 30px">
                  日同比出库 23%
                  <el-icon style="color: red"><ArrowDownBold /></el-icon
                ></span>
              </div>
            </template>
          </el-card>
        </el-col>
        <el-col :span="6">
          <!-- 第六个卡片 -->
          <el-card
            style="width: 400px; background-color: #f8f7f6"
            shadow="hover"
          >
            <div class="card-header">
              <span style="font-size: 20px">仓库容量占用比</span>
            </div>
            <div id="chart1" style="height: 300px; width: 100%"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <!--  11111111111111111111111111111  -->

    <el-card style="margin-top: 15px">
      <div style="margin-bottom: 8px">描述性统计</div>
      <!-- 第七个卡片 -->
      <el-card shadow="hover" style="background-color: #f8f7f6; height: 600px">
        <div class="card-header">
          <span style="font-size: 20px; height: 800px"
            >人物消耗资金情况（亿元）</span
          >
          <div class="block" style="margin-top: 5px">
            <span class="demonstration" style="margin-right: 8px"
              >请选择日期</span
            >
            <el-date-picker
              v-model="value2"
              type="daterange"
              start-placeholder="起始时间"
              end-placeholder="截止时间"
              :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
            />
          </div>
        </div>
        <div id="chart5" style="height: 550px; width: 100%"></div>
      </el-card>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const value1 = ref("");
const value2 = ref("");
const options = [
  {
    value: "实时仓库数量",
    label: "实时仓库数量"
  },
  {
    value: "可调配医疗工作人员数量",
    label: "可调配医疗工作人员数量"
  },
  {
    value: "总仓库剩余容量",
    label: "总仓库剩余容量"
  },
  {
    value: "可调用物资",
    label: "可调用物资"
  }
];
import * as echarts from "echarts";
import { onMounted, reactive } from "vue";
onMounted(() => {
  var chartDom = document.getElementById("chart1");
  var chartDom2 = document.getElementById("chart2");
  var chartDom3 = document.getElementById("chart3");
  var chartDom4 = document.getElementById("chart4");
  var chartDom5 = document.getElementById("chart5");
  var myChart = echarts.init(chartDom);
  var myChart2 = echarts.init(chartDom2);
  var myChart3 = echarts.init(chartDom3);
  var myChart4 = echarts.init(chartDom4);
  var myChart5 = echarts.init(chartDom5);
  var option;
  var option2;
  var option3;
  var option4;
  var option5;
  option = {
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 20, name: "医疗器械" },
          { value: 3, name: "药物" },
          { value: 12, name: "防护装备" },
          { value: 25, name: "康复设备" },
          { value: 40, name: "日用平" }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
  option && myChart.setOption(option);
  option2 = {
    tooltip: {
      trigger: "axis"
    },

    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "2023-3-4",
        "2023-3-5",
        "2023-3-6",
        "2024-3-7",
        "2024-3-8",
        "2024-3-9",
        "2024-3-10"
      ]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "出库量",
        type: "line",
        stack: "Total",
        data: [1235, 1220, 955, 1112, 3520, 1520, 3620]
      },
      {
        name: "入库量",
        type: "line",
        stack: "Total",
        data: [1023, 2362, 1021, 3202, 1110, 3021, 1552]
      }
    ]
  };
  option2 && myChart2.setOption(option2);
  option3 = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      show: false
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "30%"],
      show: false
    },
    series: [
      {
        type: "line",
        smooth: 0.6,
        symbol: "none",
        lineStyle: {
          color: "transparent",
          width: 0
        },
        markLine: {
          color: "transparent",
          width: 0
        },
        areaStyle: {},
        data: [
          ["2024-3-7", 200],
          ["2024-3-8", 560],
          ["2024-3-9", 750],
          ["2024-3-10", 580],
          ["2024-3-11", 250],
          ["2024-3-12", 300],
          ["2024-3-13", 450],
          ["2024-3-14", 300],
          ["2024-3-15", 100]
        ]
      }
    ]
  };
  option3 && myChart3.setOption(option3);
  option4 = {
    xAxis: {
      type: "category",
      data: ["100", "200", "300", "400", "500", "600", "700"],
      show: false
    },
    yAxis: {
      type: "value",
      show: false
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line"
      }
    ]
  };
  option4 && myChart4.setOption(option4);
  option5 = {
    tooltip: {
      trigger: "axis"
    },

    toolbox: {
      feature: {
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: ['2023-5', '2023-6', '2023-7', '2023-8', '2023-9', '2023-10', '2023-11', '2023-12', '2024-1', '2024-2', '2024-3', '2024-4']
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "人力",
        type: "bar",
        data: [
          8.53, 7.62, 7.5, 6.45, 4.76, 5.69, 8.52, 5.12, 7.63, 4.52, 5.63, 4.26
        ],
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" }
          ]
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }]
        }
      },
      {
        name: "物力",
        type: "bar",
        data: [
          16.35, 13.25, 12.25, 10.22, 9.63, 15.32, 14.32, 12.32, 18.63, 14.92,
          12.32, 8.32
        ],
        markPoint: {
          data: [
            { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
            { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 }
          ]
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }]
        }
      }
    ]
  };
  option5 && myChart5.setOption(option5);
});
</script>
<style lang="scss" scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
