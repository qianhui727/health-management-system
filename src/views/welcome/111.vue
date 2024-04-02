<template>
  <div class="flex flex-col">
    <el-card style="width: 100%">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="数字化统计">
          <el-select
            style="width: 200px"
            v-model="formInline.region"
            placeholder="选择类型"
            clearable
          >
            <el-option label="实时仓库数量" value="shanghai" />
            <el-option label="可调配医疗工作人员数量" value="beijing" />
            <el-option label="总仓库剩余容量" value="shenzhen" />
            <el-option label="可调用物资" value="nanjing" />
          </el-select>
          <el-button type="primary" style="margin-left: 10px">提交</el-button>
        </el-form-item></el-form
      >
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
            <div id="chart3" style="height: 250px; width: 100%"></div>
            <template #footer>
              <span style="font-size: 12px"
                >周同比 11% <el-icon style="color: #54af37"><ArrowUp /></el-icon
              ></span>
              <span style="font-size: 12px; margin-left: 30px">
                日同比 5% <el-icon style="color: red"><ArrowDown /></el-icon
              ></span>
            </template> </el-card
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
                >周同比 11% <el-icon style="color: #54af37"><ArrowUp /></el-icon
              ></span>
              <span style="font-size: 12px; margin-left: 30px">
                日同比 5% <el-icon style="color: red"><ArrowDown /></el-icon
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
                >周同比 12% <el-icon style="color: #54af37"><ArrowUp /></el-icon
              ></span>
              <span style="font-size: 12px; margin-left: 30px">
                日同比 32% <el-icon style="color: #54af37"><ArrowUp /></el-icon
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
                >周同比 15% <el-icon style="color: #54af37"><ArrowUp /></el-icon
              ></span>
              <span style="font-size: 12px; margin-left: 30px">
                日同比 9% <el-icon style="color: red"><ArrowDown /></el-icon
              ></span>
            </template> </el-card
        ></el-col>
      </el-row>
    </el-card>

    <el-card style="width: 100%; margin-top: 20px">
      <div style="font-weight: bold; font-size: 20px" ;>可视化统计</div>
      <el-row :gutter="20">
        <el-col :span="16">
          <!-- 第六个卡片 -->
          <el-card shadow="hover" style="background-color: #f8f7f6">
            <div class="card-header">
              <span style="font-size: 20px">总出入库情况统计(kg)</span>
            </div>
            <div id="chart2" style="height: 300px; width: 100%"></div>
            <template #footer>
              <div>
                <span style="font-size: 12px"
                  >周同比入库 11%
                  <el-icon style="color: #54af37"><ArrowUp /></el-icon
                ></span>
                <span style="font-size: 12px; margin-left: 30px">
                  日同比入库 5%
                  <el-icon style="color: red"><ArrowDown /></el-icon
                ></span>
              </div>
              <div>
                <span style="font-size: 12px"
                  >周同比出库 10%
                  <el-icon style="color: #54af37"><ArrowUp /></el-icon
                ></span>
                <span style="font-size: 12px; margin-left: 30px">
                  日同比出库 23%
                  <el-icon style="color: red"><ArrowDown /></el-icon
                ></span>
              </div>
            </template>
          </el-card>
        </el-col>
        <el-col :span="6">
          <!-- 第五个卡片 -->
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
  </div>
</template>
<script setup lang="ts">
const formInline = reactive({
  user: "",
  region: "",
  date: ""
});

import * as echarts from "echarts";
import { onMounted, reactive } from "vue";
onMounted(() => {
  var chartDom = document.getElementById("chart1");
  var chartDom2 = document.getElementById("chart2");
  var chartDom3 = document.getElementById("chart3");
  var chartDom4 = document.getElementById("chart4");
  var myChart = echarts.init(chartDom);
  var myChart2 = echarts.init(chartDom2);
  var myChart3 = echarts.init(chartDom3);
  var myChart4 = echarts.init(chartDom4);
  var option;
  var option2;
  var option3;
  var option4;
  //第一个表格
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
  //第二个表格
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
        "2023-10",
        "2023-11",
        "2023-12",
        "2024-1",
        "2024-2",
        "2024-3",
        "2024-4"
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
});
</script>
<style lang="scss" scoped></style>
