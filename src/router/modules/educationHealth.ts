// 最简代码，也就是这些字段必须有
export default {
  path: "/educationHealth",
  meta: {
    icon:"ep:school",
    title: "教育卫生管理"
  },
  children: [
    {
      path: "/educationHealth/msgShow",
      name: "educationHealth_msgShow",
      component: () => import("@/views/educationHealth/msgShow/index.vue"),
      meta: {
        title: "外部数据"
      }
    },
    {
      path: "/educationHealth/peopleData",
      name: "educationHealth_peopleData",
      component: () => import("@/views/educationHealth/peopleData/index.vue"),
      meta: {
        title: "打卡数据"
      }
    },
    {
      path: "/educationHealth/schoolCheck",
      name: "educationHealth_schoolCheck",
      component: () => import("@/views/educationHealth/schoolCheck/index.vue"),
      meta: {
        title: "晨午检数据"
      }
    }
  ]
};
