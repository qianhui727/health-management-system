// 最简代码，也就是这些字段必须有
export default {
  path: "/publicHealth",
  meta: {
    icon:"ep:grid",
    title: "公共卫生"
  },
  children: [
    {
      path: "/publicHealth/msgShow",
      name: "publicHealth_msgShow",
      component: () => import("@/views/publicHealth/msgShow/index.vue"),
      meta: {
        title: "外部数据"
      }
    },
    {
      path: "/publicHealth/peopleData",
      name: "publicHealth_peopleData",
      component: () => import("@/views/publicHealth/peopleData/index.vue"),
      meta: {
        title: "打卡数据"
      }
    }
  ]
};
