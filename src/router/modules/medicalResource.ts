// 最简代码，也就是这些字段必须有
export default {
  path: "/medicalResource",
  meta: {
    icon: "ep:school",
    title: "应急医疗资源管理"
  },
  children: [
    {
      path: "/medicalResource/medicalInstrument",
      name: "medicalResource_medicalInstrument",
      component: () =>
        import("@/views/medicalResource/medicalInstrument/index.vue"),
      meta: {
        title: "应急药械管理"
      }
    },
    {
      path: "/medicalResource/bloodResource",
      name: "medicalResource_bloodResource",
      component: () =>
        import("@/views/medicalResource/bloodResource/index.vue"),
      meta: {
        title: "血液资源管理"
      }
    }
  ]
};
