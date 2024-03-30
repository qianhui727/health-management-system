import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { faker } from "@faker-js/faker/locale/zh_CN";

let organizationList: Recordable<any> = [
  {
    id: "o1",
    organizationName: "健康疾控中心",
    organizationType: "疾控中心",
    organizationAddress: "健康路1号",
    organizationPhone: 15836302360,
    organizationHuman: "张主任",
    organizationInfo: "负责疾病预防与控制工作",
    organizationState: "运营中",
    createTime: 1465142400000
  },
  {
    id: "o2",
    organizationName: "明日卫生监督所",
    organizationType: "卫生监督所",
    organizationAddress: "明日路8号",
    organizationPhone: 15836302361,
    organizationHuman: "李监督",
    organizationInfo: "负责卫生监督与检查工作",
    organizationState: "暂停运营",
    createTime: 1063036800000
  },
  {
    id: "o3",
    organizationName: "爱心医疗机构",
    organizationType: "医疗机构",
    organizationAddress: "爱心街99号",
    organizationPhone: 15836302362,
    organizationHuman: "王院长",
    organizationInfo: "提供医疗服务与救治",
    organizationState: "运营中",
    createTime: 1222704000000
  },
  {
    id: "o4",
    organizationName: "未来社区卫生服务中心",
    organizationType: "社区卫生服务中心",
    organizationAddress: "未来大道100号",
    organizationPhone: 15836302387,
    organizationHuman: "赵主任",
    organizationInfo: "提供基本医疗与公共卫生服务",
    organizationState: "运营中",
    createTime: 1583683200000
  }
];
let groupList: Recordable<any> = [
  {
    id: "g1",
    groupName: "应急救援队",
    groupScale: "20-99",
    organizationName: "未来社区卫生服务中心",
    groupMember: "张三,李四,王五,...",
    groupHuman: "赵队长",
    groupPhone: "13800138000",
    allocateState: "已分配",
    trainingRecord: "2023年Q1应急救援培训",
    testRecord: "优秀"
  },
  {
    id: "g2",
    groupName: "医疗救援队",
    groupScale: "100-499",
    organizationName: "爱心医疗机构",
    groupMember: "李四,孙七,周九,...",
    groupHuman: "钱主任",
    groupPhone: "13900139000",
    allocateState: "分配中",
    trainingRecord: "2023年Q2医疗救援培训",
    testRecord: "良好"
  },
  {
    id: "g3",
    groupName: "疫情防控队",
    groupScale: "0-20",
    organizationName: "健康疾控中心",
    groupMember: "王五,赵六,陈八,...",
    groupHuman: "吴领队",
    groupPhone: "13700137000",
    allocateState: "待分配",
    trainingRecord: "2023年Q3疫情防控培训",
    testRecord: "合格"
  },
  {
    id: "g4",
    groupName: "综合救援队",
    groupScale: "20-99",
    organizationName: "明日卫生监督所",
    groupMember: "郑七,刘十,吴十一,...",
    groupHuman: "冯队长",
    groupPhone: "13600136000",
    allocateState: "待分配",
    trainingRecord: "2023年Q4综合救援培训",
    testRecord: "优秀"
  }
];
let expertList: Recordable<any> = [
  {
    id: "e1",
    expertName: "张三",
    expertField: "化学应急处理",
    expertUnit: "国家化学应急中心",
    expertDuty: "高级研究员",
    expertPhone: "13800138000",
    expertState: "审核通过"
  },
  {
    id: "e2",
    expertName: "李四",
    expertField: "地震灾害应对",
    expertUnit: "地质环境研究所",
    expertDuty: "首席专家",
    expertPhone: "13700137000",
    expertState: "待审核"
  },
  {
    id: "e3",
    expertName: "赵六",
    expertField: "火灾应急救援",
    expertUnit: "消防科学技术研究所",
    expertDuty: "高级工程师",
    expertPhone: "13500135000",
    expertState: "审核通过"
  },
  {
    id: "e4",
    expertName: "孙七",
    expertField: "公共卫生应急",
    expertUnit: "公共卫生研究院",
    expertDuty: "主任医师",
    expertPhone: "13400134000",
    expertState: "待审核"
  },
  {
    id: "e5",
    expertName: "周八",
    expertField: "自然灾害风险评估",
    expertUnit: "自然灾害研究所",
    expertDuty: "教授",
    expertPhone: "13300133000",
    expertState: "审核不通过"
  },
  {
    id: "e6",
    expertName: "吴九",
    expertField: "核应急处理",
    expertUnit: "核安全研究院",
    expertDuty: "资深专家",
    expertPhone: "13200132000",
    expertState: "审核通过"
  }
];
let staffList: Recordable<any> = [
  {
    id: "s1",
    staffName: "李四",
    staffSex: "女",
    staffDuty: "应急指挥员",
    organization: "XX市消防局",
    staffPhone: "13900139000",
    emergencyPrepare: "全天待命",
    emergencyTask: "现场指挥与协调",
    trainingRecord: "2023年度应急指挥培训合格",
    testRecord: "2023年第三季度考核良好"
  },
  {
    id: "s2",
    staffName: "王五",
    staffSex: "男",
    staffDuty: "救援队长",
    organization: "XX市救援队",
    staffPhone: "13700137000",
    emergencyPrepare: "随时出发",
    emergencyTask: "负责现场救援工作",
    trainingRecord: "2023年度救援技能培训合格",
    testRecord: "2023年上半年考核合格"
  },
  {
    id: "s3",
    staffName: "赵六",
    staffSex: "男",
    staffDuty: "医疗救护员",
    organization: "XX市急救中心",
    staffPhone: "13600136000",
    emergencyPrepare: "24小时待命",
    emergencyTask: "负责现场医疗救护",
    trainingRecord: "2023年度医疗救护培训合格",
    testRecord: "2023年第一季度考核优秀"
  },
  {
    id: "s4",
    staffName: "孙七",
    staffSex: "女",
    staffDuty: "应急协调员",
    organization: "XX市政府应急办",
    staffPhone: "13500135000",
    emergencyPrepare: "随叫随到",
    emergencyTask: "负责应急资源协调",
    trainingRecord: "2023年度应急协调培训合格",
    testRecord: "2023年考核合格"
  },
  {
    id: "s5",
    staffName: "周八",
    staffSex: "男",
    staffDuty: "通讯保障员",
    organization: "XX市通讯管理局",
    staffPhone: "13400134000",
    emergencyPrepare: "随时在线",
    emergencyTask: "负责应急通讯保障",
    trainingRecord: "2023年度通讯保障培训合格",
    testRecord: "2023年考核良好"
  },
  {
    id: "s6",
    staffName: "吴九",
    staffSex: "男",
    staffDuty: "物资保障员",
    organization: "XX市应急物资储备中心",
    staffPhone: "13300133000",
    emergencyPrepare: "随时准备物资",
    emergencyTask: "负责应急物资调配",
    trainingRecord: "2023年度物资保障培训合格",
    testRecord: "2023年考核优秀"
  },
  {
    id: "s7",
    staffName: "郑十",
    staffSex: "女",
    staffDuty: "信息报告员",
    organization: "XX市应急信息中心",
    staffPhone: "13200132000",
    emergencyPrepare: "随时上报信息",
    emergencyTask: "负责应急信息收集与报告",
    trainingRecord: "2023年度信息报告培训合格",
    testRecord: "2023年考核合格"
  }
];
let healthList: Recordable<any> = [
  {
    id: "h1",
    healthName: "李专家",
    healthSex: "女",
    healthID: "234567890123456789",
    healthDuty: "副教授",
    organization: "XX大学医学院",
    healthPhone: "13900139002"
  },
  {
    id: "h2",
    healthName: "王专家",
    healthSex: "男",
    healthID: "345678901234567890",
    healthDuty: "研究员",
    organization: "XX研究所",
    healthPhone: "13700137003"
  },
  {
    id: "h3",
    healthName: "赵专家",
    healthSex: "女",
    healthID: "456789012345678901",
    healthDuty: "高级工程师",
    organization: "XX科技公司",
    healthPhone: "13600136004"
  },
  {
    id: "h4",
    healthName: "孙专家",
    healthSex: "男",
    healthID: "567890123456789012",
    healthDuty: "资深咨询师",
    organization: "XX咨询公司",
    healthPhone: "13500135005"
  },
  {
    id: "h5",
    healthName: "周专家",
    healthSex: "女",
    healthID: "678901234567890123",
    healthDuty: "副主任医师",
    organization: "XX医院",
    healthPhone: "13400134006"
  },
  {
    id: "h6",
    healthName: "吴专家",
    healthSex: "男",
    healthID: "789012345678901234",
    healthDuty: "教授",
    organization: "XX大学",
    healthPhone: "13300133007"
  },
  {
    id: "h7",
    healthName: "郑专家",
    healthSex: "女",
    healthID: "890123456789012345",
    healthDuty: "副研究员",
    organization: "XX研究院",
    healthPhone: "13200132008"
  },
  {
    id: "h8",
    healthName: "陈专家",
    healthSex: "男",
    healthID: "901234567890123456",
    healthDuty: "主任医师",
    organization: "XX医院",
    healthPhone: "13100131009"
  },
  {
    id: "h9",
    healthName: "郭专家",
    healthSex: "女",
    healthID: "012345678901234567",
    healthDuty: "主任药师",
    organization: "XX医院",
    healthPhone: "13000130010"
  }
];
export default defineFakeRoute([
  // 获取应急机构管理
  {
    url: "/organizationList",
    method: "post",
    response: ({ body }) => {
      let list;
      list = organizationList.filter(item =>
        item.organizationName.includes(body?.organizationName)
      );
      if (body.organizationType)
        list = organizationList.filter(
          item => item.organizationType === body.organizationType
        );

      if (body.organizationState)
        list = organizationList.filter(
          item => item.organizationState === body.organizationState
        );

      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 修改应急机构管理
  {
    url: "/updateOrganization",
    method: "put",
    response: ({ body }) => {
      for (let i = 0; i < organizationList.length; i++) {
        if (organizationList[i].id === body.id) {
          (organizationList[i].organizationName = body.organizationName),
            (organizationList[i].organizationType = body.organizationType),
            (organizationList[i].organizationAddress =
              body.organizationAddress),
            (organizationList[i].organizationPhone = body.organizationPhone),
            (organizationList[i].organizationHuman = body.organizationHuman),
            (organizationList[i].organizationInfo = body.organizationInfo),
            (organizationList[i].organizationState = body.organizationState),
            (organizationList[i].createTime = body.createTime);
          break;
        }
        if (
          i == organizationList.length - 1 &&
          organizationList[i].id !== body.id
        ) {
          organizationList.push(body);
        }
      }

      return {
        success: true,
        data: {
          list: organizationList,
          total: organizationList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 删除应急机构管理
  {
    url: "/deleteOrganization",
    method: "delete",
    response: ({ body }) => {
      organizationList = organizationList.filter(item => item.id !== body.id);

      return {
        success: true,
        data: {
          list: organizationList,
          total: organizationList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 获取应急人员管理
  {
    url: "/staffList",
    method: "post",
    response: ({ body }) => {
      let list;
      list = staffList.filter(item => item.staffName.includes(body?.staffName));
      if (body.organization) {
        list = staffList.filter(item =>
          item.organization.includes(body.organization)
        );
      }
      if (body.staffDuty) {
        list = staffList.filter(item =>
          item.staffDuty.includes(body.staffDuty)
        );
      }

      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 修改应急人员管理
  {
    url: "/updateStaff",
    method: "put",
    response: ({ body }) => {
      for (let i = 0; i < staffList.length; i++) {
        if (staffList[i].id === body.id) {
          (staffList[i].staffName = body.staffName),
            (staffList[i].staffSex = body.staffSex),
            (staffList[i].staffDuty = body.staffDuty),
            (staffList[i].organization = body.organization),
            (staffList[i].staffPhone = body.staffPhone),
            (staffList[i].emergencyPrepare = body.emergencyPrepare),
            (staffList[i].emergencyTask = body.emergencyTask),
            (staffList[i].trainingRecord = body.trainingRecord),
            (staffList[i].testRecord = body.testRecord);

          break;
        }
        if (i == staffList.length - 1 && staffList[i].id !== body.id) {
          staffList.push(body);
        }
      }

      return {
        success: true,
        data: {
          list: staffList,
          total: staffList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 删除应急人员管理
  {
    url: "/deleteStaff",
    method: "delete",
    response: ({ body }) => {
      staffList = staffList.filter(item => item.id !== body.id);

      return {
        success: true,
        data: {
          list: staffList,
          total: staffList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 获取应急卫生专家管理
  {
    url: "/healthList",
    method: "post",
    response: ({ body }) => {
      let list;
      list = healthList.filter(item =>
        item.healthName.includes(body?.healthName)
      );
      if (body.organization) {
        list = healthList.filter(item =>
          item.organization.includes(body.organization)
        );
      }
      if (body.healthDuty) {
        list = healthList.filter(item =>
          item.healthDuty.includes(body.healthDuty)
        );
      }

      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 修改应急卫生专家管理
  {
    url: "/updateHealth",
    method: "put",
    response: ({ body }) => {
      for (let i = 0; i < healthList.length; i++) {
        if (healthList[i].id === body.id) {
          (healthList[i].healthName = body.healthName),
            (healthList[i].healthSex = body.healthSex),
            (healthList[i].healthID = body.healthID),
            (healthList[i].healthDuty = body.healthDuty),
            (healthList[i].organization = body.organization);
          break;
        }
        if (i == healthList.length - 1 && healthList[i].id !== body.id) {
          healthList.push(body);
        }
      }

      return {
        success: true,
        data: {
          list: healthList,
          total: healthList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 删除应急卫生专家管理
  {
    url: "/deleteHealth",
    method: "delete",
    response: ({ body }) => {
      healthList = healthList.filter(item => item.id !== body.id);

      return {
        success: true,
        data: {
          list: healthList,
          total: healthList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 获取应急队伍管理
  {
    url: "/groupList",
    method: "post",
    response: ({ body }) => {
      let list;
      list = groupList.filter(item => item.groupName.includes(body?.groupName));
      if (body.groupScale)
        list = groupList.filter(item => item.groupScale === body.groupScale);

      if (body.allocateState)
        list = groupList.filter(
          item => item.allocateState === body.allocateState
        );

      return {
        success: true,
        data: {
          list,
          total: groupList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 修改应急队伍管理
  {
    url: "/updateGroup",
    method: "put",
    response: ({ body }) => {
      for (let i = 0; i < groupList.length; i++) {
        if (groupList[i].id === body.id) {
          (groupList[i].groupName = body.groupName),
            (groupList[i].groupScale = body.groupScale),
            (groupList[i].organizationName = body.organizationName),
            (groupList[i].groupMember = body.groupMember),
            (groupList[i].groupHuman = body.groupHuman),
            (groupList[i].groupPhone = body.groupPhone),
            (groupList[i].allocateState = body.allocateState),
            (groupList[i].trainingRecord = body.trainingRecord),
            (groupList[i].testRecord = body.testRecord);
          break;
        }
        if (i == groupList.length - 1 && groupList[i].id !== body.id) {
          groupList.push(body);
        }
      }

      return {
        success: true,
        data: {
          list: groupList,
          total: groupList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 删除应急队伍管理
  {
    url: "/deleteGroup",
    method: "delete",
    response: ({ body }) => {
      groupList = groupList.filter(item => item.id !== body.id);

      return {
        success: true,
        data: {
          list: groupList,
          total: groupList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 获取应急专家管理
  {
    url: "/expertList",
    method: "post",
    response: ({ body }) => {
      let list;
      list = expertList.filter(item =>
        item.expertName.includes(body?.expertName)
      );
      if (body.expertField) {
        list = expertList.filter(item =>
          item.expertField.includes(body.expertField)
        );
      }
      if (body.expertState)
        list = organizationList.filter(
          item => item.expertState === body.expertState
        );

      return {
        success: true,
        data: {
          list,
          total: expertList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 修改应急专家管理
  {
    url: "/updateExpert",
    method: "put",
    response: ({ body }) => {
      for (let i = 0; i < expertList.length; i++) {
        if (expertList[i].id === body.id) {
          (expertList[i].expertName = body.expertName),
            (expertList[i].expertField = body.expertField),
            (expertList[i].expertUnit = body.expertUnit),
            (expertList[i].expertDuty = body.expertDuty),
            (expertList[i].expertPhone = body.expertPhone),
            (expertList[i].expertState = body.expertState);

          break;
        }
        if (i == expertList.length - 1 && expertList[i].id !== body.id) {
          expertList.push(body);
        }
      }

      return {
        success: true,
        data: {
          list: expertList,
          total: expertList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 删除应急专家管理
  {
    url: "/deleteExpert",
    method: "delete",
    response: ({ body }) => {
      expertList = expertList.filter(item => item.id !== body.id);

      return {
        success: true,
        data: {
          list: expertList,
          total: expertList.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 用户管理
  {
    url: "/user",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          username: "admin",
          nickname: "admin",
          avatar: "https://avatars.githubusercontent.com/u/44761321",
          phone: "15888886789",
          email: faker.internet.email(),
          sex: 0,
          id: 1,
          status: 1,
          dept: {
            // 部门id
            id: 103,
            // 部门名称
            name: "研发部门"
          },
          remark: "管理员",
          createTime: 1605456000000
        },
        {
          username: "common",
          nickname: "common",
          avatar: "https://avatars.githubusercontent.com/u/52823142",
          phone: "18288882345",
          email: faker.internet.email(),
          sex: 1,
          id: 2,
          status: 1,
          dept: {
            id: 105,
            name: "测试部门"
          },
          remark: "普通用户",
          createTime: 1605456000000
        }
      ];
      list = list.filter(item => item.username.includes(body?.username));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      if (body.phone) list = list.filter(item => item.phone === body.phone);
      if (body.deptId) list = list.filter(item => item.dept.id === body.deptId);
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 用户管理-获取所有角色列表
  {
    url: "/list-all-role",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [
          { id: 1, name: "超级管理员" },
          { id: 2, name: "普通角色" }
        ]
      };
    }
  },
  // 用户管理-根据 userId 获取对应角色 id 列表（userId：用户id）
  {
    url: "/list-role-ids",
    method: "post",
    response: ({ body }) => {
      if (body.userId) {
        if (body.userId == 1) {
          return {
            success: true,
            data: [1]
          };
        } else if (body.userId == 2) {
          return {
            success: true,
            data: [2]
          };
        }
      } else {
        return {
          success: false,
          data: []
        };
      }
    }
  },
  // 角色管理
  {
    url: "/role",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          createTime: 1605456000000, // 时间戳（毫秒ms）
          updateTime: 1684512000000,
          id: 1,
          name: "超级管理员",
          code: "admin",
          status: 1, // 状态 1 启用 0 停用
          remark: "超级管理员拥有最高权限"
        },
        {
          createTime: 1605456000000,
          updateTime: 1684512000000,
          id: 2,
          name: "普通角色",
          code: "common",
          status: 1,
          remark: "普通角色拥有部分权限"
        }
      ];
      list = list.filter(item => item.name.includes(body?.name));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      if (body.code) list = list.filter(item => item.code === body.code);
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 角色管理-权限-菜单权限
  {
    url: "/role-menu",
    method: "post",
    response: () => {
      return {
        success: true,
        data: [
          // 外部页面
          {
            parentId: 0,
            id: 100,
            menuType: 0, // 菜单类型（0代表菜单、1代表iframe、2代表外链、3代表按钮）
            title: "menus.pureExternalPage"
          },
          {
            parentId: 100,
            id: 101,
            menuType: 0,
            title: "menus.pureExternalDoc"
          },
          {
            parentId: 101,
            id: 102,
            menuType: 2,
            title: "menus.pureExternalLink"
          },
          {
            parentId: 101,
            id: 103,
            menuType: 2,
            title: "menus.pureUtilsLink"
          },
          {
            parentId: 100,
            id: 104,
            menuType: 1,
            title: "menus.pureEmbeddedDoc"
          },
          {
            parentId: 104,
            id: 105,
            menuType: 1,
            title: "menus.pureEpDoc"
          },
          {
            parentId: 104,
            id: 106,
            menuType: 1,
            title: "menus.pureTailwindcssDoc"
          },
          {
            parentId: 104,
            id: 107,
            menuType: 1,
            title: "menus.pureVueDoc"
          },
          {
            parentId: 104,
            id: 108,
            menuType: 1,
            title: "menus.pureViteDoc"
          },
          {
            parentId: 104,
            id: 109,
            menuType: 1,
            title: "menus.purePiniaDoc"
          },
          {
            parentId: 104,
            id: 110,
            menuType: 1,
            title: "menus.pureRouterDoc"
          },
          // 权限管理
          {
            parentId: 0,
            id: 200,
            menuType: 0,
            title: "menus.purePermission"
          },
          {
            parentId: 200,
            id: 201,
            menuType: 0,
            title: "menus.purePermissionPage"
          },
          {
            parentId: 200,
            id: 202,
            menuType: 0,
            title: "menus.purePermissionButton"
          },
          {
            parentId: 202,
            id: 203,
            menuType: 3,
            title: "添加"
          },
          {
            parentId: 202,
            id: 204,
            menuType: 3,
            title: "修改"
          },
          {
            parentId: 202,
            id: 205,
            menuType: 3,
            title: "删除"
          },
          // 系统管理
          {
            parentId: 0,
            id: 300,
            menuType: 0,
            title: "menus.pureSysManagement"
          },
          {
            parentId: 300,
            id: 301,
            menuType: 0,
            title: "menus.pureUser"
          },
          {
            parentId: 300,
            id: 302,
            menuType: 0,
            title: "menus.pureRole"
          },
          {
            parentId: 300,
            id: 303,
            menuType: 0,
            title: "menus.pureSystemMenu"
          },
          {
            parentId: 300,
            id: 304,
            menuType: 0,
            title: "menus.pureDept"
          },
          // 系统监控
          {
            parentId: 0,
            id: 400,
            menuType: 0,
            title: "menus.pureSysMonitor"
          },
          {
            parentId: 400,
            id: 401,
            menuType: 0,
            title: "menus.pureOnlineUser"
          },
          {
            parentId: 400,
            id: 402,
            menuType: 0,
            title: "menus.pureLoginLog"
          },
          {
            parentId: 400,
            id: 403,
            menuType: 0,
            title: "menus.pureOperationLog"
          },
          {
            parentId: 400,
            id: 404,
            menuType: 0,
            title: "menus.pureSystemLog"
          },
          // 标签页操作
          {
            parentId: 0,
            id: 500,
            menuType: 0,
            title: "menus.pureTabs"
          },
          {
            parentId: 500,
            id: 501,
            menuType: 0,
            title: "menus.pureTabs"
          },
          {
            parentId: 500,
            id: 502,
            menuType: 0,
            title: "query传参模式"
          },
          {
            parentId: 500,
            id: 503,
            menuType: 0,
            title: "params传参模式"
          }
        ]
      };
    }
  },
  // 角色管理-权限-菜单权限-根据角色 id 查对应菜单
  {
    url: "/role-menu-ids",
    method: "post",
    response: ({ body }) => {
      if (body.id == 1) {
        return {
          success: true,
          data: [
            100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 200, 201,
            202, 203, 204, 205, 300, 301, 302, 303, 304, 400, 401, 402, 403,
            404, 500, 501, 502, 503
          ]
        };
      } else if (body.id == 2) {
        return {
          success: true,
          data: [
            100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 404, 500,
            501, 502, 503
          ]
        };
      }
    }
  },
  // 菜单管理
  {
    url: "/menu",
    method: "post",
    response: () => {
      return {
        success: true,
        data: [
          // 外部页面
          {
            parentId: 0,
            id: 100,
            menuType: 0, // 菜单类型（0代表菜单、1代表iframe、2代表外链、3代表按钮）
            title: "menus.pureExternalPage",
            name: "PureIframe",
            path: "/iframe",
            component: "",
            rank: 7,
            redirect: "",
            icon: "ri:links-fill",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 100,
            id: 101,
            menuType: 0,
            title: "menus.pureExternalDoc",
            name: "PureIframeExternal",
            path: "/iframe/external",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 101,
            id: 102,
            menuType: 2,
            title: "menus.pureExternalLink",
            name: "https://yiming_chang.gitee.io/pure-admin-doc",
            path: "/external",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 101,
            id: 103,
            menuType: 2,
            title: "menus.pureUtilsLink",
            name: "https://pure-admin-utils.netlify.app/",
            path: "/pureUtilsLink",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 100,
            id: 104,
            menuType: 1,
            title: "menus.pureEmbeddedDoc",
            name: "PureIframeEmbedded",
            path: "/iframe/embedded",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 105,
            menuType: 1,
            title: "menus.pureEpDoc",
            name: "FrameEp",
            path: "/iframe/ep",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://element-plus.org/zh-CN/",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 106,
            menuType: 1,
            title: "menus.pureTailwindcssDoc",
            name: "FrameTailwindcss",
            path: "/iframe/tailwindcss",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://tailwindcss.com/docs/installation",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 107,
            menuType: 1,
            title: "menus.pureVueDoc",
            name: "FrameVue",
            path: "/iframe/vue3",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://cn.vuejs.org/",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 108,
            menuType: 1,
            title: "menus.pureViteDoc",
            name: "FrameVite",
            path: "/iframe/vite",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://cn.vitejs.dev/",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 109,
            menuType: 1,
            title: "menus.purePiniaDoc",
            name: "FramePinia",
            path: "/iframe/pinia",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://pinia.vuejs.org/zh/index.html",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 110,
            menuType: 1,
            title: "menus.pureRouterDoc",
            name: "FrameRouter",
            path: "/iframe/vue-router",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://router.vuejs.org/zh/",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          // 权限管理
          {
            parentId: 0,
            id: 200,
            menuType: 0,
            title: "menus.purePermission",
            name: "PurePermission",
            path: "/permission",
            component: "",
            rank: 9,
            redirect: "",
            icon: "ep:lollipop",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 200,
            id: 201,
            menuType: 0,
            title: "menus.purePermissionPage",
            name: "PermissionPage",
            path: "/permission/page/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 200,
            id: 202,
            menuType: 0,
            title: "menus.purePermissionButton",
            name: "PermissionButton",
            path: "/permission/button/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 202,
            id: 203,
            menuType: 3,
            title: "添加",
            name: "",
            path: "",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "permission:btn:add",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 202,
            id: 204,
            menuType: 3,
            title: "修改",
            name: "",
            path: "",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "permission:btn:edit",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 202,
            id: 205,
            menuType: 3,
            title: "删除",
            name: "",
            path: "",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "permission:btn:delete",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          // 系统管理
          {
            parentId: 0,
            id: 300,
            menuType: 0,
            title: "menus.pureSysManagement",
            name: "PureSystem",
            path: "/system",
            component: "",
            rank: 10,
            redirect: "",
            icon: "ri:settings-3-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 300,
            id: 301,
            menuType: 0,
            title: "menus.pureUser",
            name: "SystemUser",
            path: "/system/user/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "ri:admin-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 300,
            id: 302,
            menuType: 0,
            title: "menus.pureRole",
            name: "SystemRole",
            path: "/system/role/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "ri:admin-fill",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 300,
            id: 303,
            menuType: 0,
            title: "menus.pureSystemMenu",
            name: "SystemMenu",
            path: "/system/menu/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "ep:menu",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 300,
            id: 304,
            menuType: 0,
            title: "menus.pureDept",
            name: "SystemDept",
            path: "/system/dept/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "ri:git-branch-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          // 系统监控
          {
            parentId: 0,
            id: 400,
            menuType: 0,
            title: "menus.pureSysMonitor",
            name: "PureMonitor",
            path: "/monitor",
            component: "",
            rank: 11,
            redirect: "",
            icon: "ep:monitor",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 400,
            id: 401,
            menuType: 0,
            title: "menus.pureOnlineUser",
            name: "OnlineUser",
            path: "/monitor/online-user",
            component: "monitor/online/index",
            rank: null,
            redirect: "",
            icon: "ri:user-voice-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 400,
            id: 402,
            menuType: 0,
            title: "menus.pureLoginLog",
            name: "LoginLog",
            path: "/monitor/login-logs",
            component: "monitor/logs/login/index",
            rank: null,
            redirect: "",
            icon: "ri:window-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 400,
            id: 403,
            menuType: 0,
            title: "menus.pureOperationLog",
            name: "OperationLog",
            path: "/monitor/operation-logs",
            component: "monitor/logs/operation/index",
            rank: null,
            redirect: "",
            icon: "ri:history-fill",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 400,
            id: 404,
            menuType: 0,
            title: "menus.pureSystemLog",
            name: "SystemLog",
            path: "/monitor/system-logs",
            component: "monitor/logs/system/index",
            rank: null,
            redirect: "",
            icon: "ri:file-search-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          // 标签页操作
          {
            parentId: 0,
            id: 500,
            menuType: 0,
            title: "menus.pureTabs",
            name: "PureTabs",
            path: "/tabs",
            component: "",
            rank: 12,
            redirect: "",
            icon: "ri:bookmark-2-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 500,
            id: 501,
            menuType: 0,
            title: "menus.pureTabs",
            name: "Tabs",
            path: "/tabs/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 500,
            id: 502,
            menuType: 0,
            title: "query传参模式",
            name: "TabQueryDetail",
            path: "/tabs/query-detail",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "/tabs/index",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: false,
            showParent: false
          },
          {
            parentId: 500,
            id: 503,
            menuType: 0,
            title: "params传参模式",
            name: "TabParamsDetail",
            path: "/tabs/params-detail/:id",
            component: "params-detail",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "/tabs/index",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            showLink: false,
            showParent: false
          }
        ]
      };
    }
  },
  // 部门管理
  {
    url: "/dept",
    method: "post",
    response: () => {
      return {
        success: true,
        data: [
          {
            name: "杭州总公司",
            parentId: 0,
            id: 100,
            sort: 0,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1, // 状态 1 启用 0 停用
            type: 1, // 1 公司 2 分公司 3 部门
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "郑州分公司",
            parentId: 100,
            id: 101,
            sort: 1,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 2,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "研发部门",
            parentId: 101,
            id: 103,
            sort: 1,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "市场部门",
            parentId: 102,
            id: 108,
            sort: 1,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "深圳分公司",
            parentId: 100,
            id: 102,
            sort: 2,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 2,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "市场部门",
            parentId: 101,
            id: 104,
            sort: 2,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "财务部门",
            parentId: 102,
            id: 109,
            sort: 2,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "测试部门",
            parentId: 101,
            id: 105,
            sort: 3,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 0,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "财务部门",
            parentId: 101,
            id: 106,
            sort: 4,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "运维部门",
            parentId: 101,
            id: 107,
            sort: 5,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 0,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          }
        ]
      };
    }
  },
  // 在线用户
  {
    url: "/online-logs",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          id: 1,
          username: "admin",
          ip: faker.internet.ipv4(),
          address: "中国河南省信阳市",
          system: "macOS",
          browser: "Chrome",
          loginTime: new Date()
        },
        {
          id: 2,
          username: "common",
          ip: faker.internet.ipv4(),
          address: "中国广东省深圳市",
          system: "Windows",
          browser: "Firefox",
          loginTime: new Date()
        }
      ];
      list = list.filter(item => item.username.includes(body?.username));
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 登录日志
  {
    url: "/login-logs",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          id: 1,
          username: "admin",
          ip: faker.internet.ipv4(),
          address: "中国河南省信阳市",
          system: "macOS",
          browser: "Chrome",
          status: 1, // 登录状态 1 成功 0 失败
          behavior: "账号登录",
          loginTime: new Date()
        },
        {
          id: 2,
          username: "common",
          ip: faker.internet.ipv4(),
          address: "中国广东省深圳市",
          system: "Windows",
          browser: "Firefox",
          status: 0,
          behavior: "第三方登录",
          loginTime: new Date()
        }
      ];
      list = list.filter(item => item.username.includes(body?.username));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 操作日志
  {
    url: "/operation-logs",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          id: 1,
          username: "admin",
          ip: faker.internet.ipv4(),
          address: "中国河南省信阳市",
          system: "macOS",
          browser: "Chrome",
          status: 1, // 操作状态 1 成功 0 失败
          summary: "菜单管理-添加菜单", // 操作概要
          module: "系统管理", // 所属模块
          operatingTime: new Date() // 操作时间
        },
        {
          id: 2,
          username: "common",
          ip: faker.internet.ipv4(),
          address: "中国广东省深圳市",
          system: "Windows",
          browser: "Firefox",
          status: 0,
          summary: "列表分页查询",
          module: "在线用户",
          operatingTime: new Date()
        }
      ];
      list = list.filter(item => item.module.includes(body?.module));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 系统日志
  {
    url: "/system-logs",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          id: 1, // 日志ID
          /**
           * 日志级别
           * 0 debug调试（最低级别的日志，用于调试和开发阶段）
           * 1 info信息（默认级别，用于记录一般的信息）
           * 2 warn警告（表示可能出现的问题或潜在的错误，但不会影响系统的正常运行）
           * 3 error错误（表示发生了错误，但不会导致系统崩溃）
           * 4 fatal致命（最高级别的日志，表示发生了严重错误，导致系统无法继续运行）
           */
          level: 1,
          module: "菜单管理", // 所属模块
          url: "/menu", // 请求接口
          method: "post", // 请求方法
          ip: faker.internet.ipv4(),
          address: "中国河南省信阳市",
          system: "macOS",
          browser: "Chrome",
          /**
           * 请求耗时（单位：ms 毫秒）
           * 正常耗时：一般认为在几百毫秒（0.1-0.5秒）范围内的请求耗时较为正常
           * 较慢耗时：在1秒以上的耗时可以被认为是较慢的请求，但具体是否较慢还需要根据具体业务场景和性能要求来判断
           */
          takesTime: 10,
          requestTime: new Date() // 请求时间
        },
        {
          id: 2,
          level: 0,
          module: "地图",
          url: "/get-map-info",
          method: "get",
          ip: faker.internet.ipv4(),
          address: "中国广东省深圳市",
          system: "Windows",
          browser: "Firefox",
          takesTime: 1200,
          requestTime: new Date()
        }
      ];
      list = list.filter(item => item.module.includes(body?.module));
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 系统日志-根据 id 查日志详情
  {
    url: "/system-logs-detail",
    method: "post",
    response: ({ body }) => {
      if (body.id == 1) {
        return {
          id: 1,
          level: 1,
          module: "菜单管理",
          url: "/menu",
          method: "post",
          ip: faker.internet.ipv4(),
          address: "中国河南省信阳市",
          system: "macOS",
          browser: "Chrome",
          takesTime: 10,
          responseHeaders: {
            traceId: "1495502411171032",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            "Keep-Alive": "timeout=5",
            "Content-Length": 17019
          },
          responseBody: {
            success: true,
            data: [
              {
                parentId: 0,
                id: 400,
                menuType: 0,
                title: "menus.pureSysMonitor",
                name: "PureMonitor",
                path: "/monitor",
                component: "",
                rank: 11,
                redirect: "",
                icon: "ep:monitor",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 401,
                menuType: 0,
                title: "menus.pureOnlineUser",
                name: "OnlineUser",
                path: "/monitor/online-user",
                component: "monitor/online/index",
                rank: null,
                redirect: "",
                icon: "ri:user-voice-line",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 402,
                menuType: 0,
                title: "menus.pureLoginLog",
                name: "LoginLog",
                path: "/monitor/login-logs",
                component: "monitor/logs/login/index",
                rank: null,
                redirect: "",
                icon: "ri:window-line",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 403,
                menuType: 0,
                title: "menus.pureOperationLog",
                name: "OperationLog",
                path: "/monitor/operation-logs",
                component: "monitor/logs/operation/index",
                rank: null,
                redirect: "",
                icon: "ri:history-fill",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 404,
                menuType: 0,
                title: "menus.pureSystemLog",
                name: "SystemLog",
                path: "/monitor/system-logs",
                component: "monitor/logs/system/index",
                rank: null,
                redirect: "",
                icon: "ri:file-search-line",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                showLink: true,
                showParent: false
              }
            ]
          },
          requestHeaders: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,eo;q=0.7",
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.admin",
            Connection: "keep-alive",
            "Content-Length": 0,
            Cookie:
              "_ga=GA1.1.231800979.1704562367; _ga_M74ZHEQ1M1=GS1.1.1709299375.7.1.1709299476.0.0.0; Hm_lvt_6a7dac00248d3b6ad8479d7249bb29c5=1709032753,1709359575; Hm_lvt_23a157b7d0d9867f7a51e42628f052f5=1708960489,1709485849,1709879672; authorized-token={%22accessToken%22:%22eyJhbGciOiJIUzUxMiJ9.admin%22%2C%22expires%22:1919520000000}; multiple-tabs=true",
            Host: "192.168.2.121:8848",
            Origin: "http://192.168.2.121:8848",
            Referer: "http://192.168.2.121:8848/",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
          },
          requestBody: {
            title: "系统监控"
          },
          traceId: "1495502411171032",
          requestTime: new Date()
        };
      } else if (body.id == 2) {
        return {
          id: 2,
          level: 0,
          module: "地图",
          url: "/get-map-info?plateNumber=豫A59778U",
          method: "get",
          ip: faker.internet.ipv4(),
          address: "中国广东省深圳市",
          system: "Windows",
          browser: "Firefox",
          takesTime: 1200,
          responseHeaders: {
            traceId: "2280443117103208",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            "Keep-Alive": "timeout=5",
            "Content-Length": 28693
          },
          responseBody: {
            plateNumber: "豫A59778U",
            driver: "子骞",
            orientation: 289,
            lng: 113.8564,
            lat: 34.373
          },
          requestHeaders: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,eo;q=0.7",
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.admin",
            Connection: "keep-alive",
            "Content-Length": 0,
            Cookie:
              "_ga=GA1.1.231800979.1704562367; _ga_M74ZHEQ1M1=GS1.1.1709299375.7.1.1709299476.0.0.0; Hm_lvt_6a7dac00248d3b6ad8479d7249bb29c5=1709032753,1709359575; Hm_lvt_23a157b7d0d9867f7a51e42628f052f5=1708960489,1709485849,1709879672; authorized-token={%22accessToken%22:%22eyJhbGciOiJIUzUxMiJ9.admin%22%2C%22expires%22:1919520000000}; multiple-tabs=true",
            Host: "192.168.2.121:8848",
            Origin: "http://192.168.2.121:8848",
            Referer: "http://192.168.2.121:8848/",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
          },
          requestBody: null,
          traceId: "2280443117103208",
          requestTime: new Date()
        };
      }
    }
  }
]);
