// 最简代码，也就是这些字段必须有
export default {
  path: "/medicalResource",
  meta: {
    icon: "ep:briefcase",
    title: "应急医疗资源管理"
  },
  children: [
    {
      path: "/medicalResource/medicalInstrument",
      name: "medicalResource_medicalInstrument",
      component: () =>
        import("@/views/medicalResource/medicalInstrument/index.vue"),
      meta: {
        icon: "ep:box",
        title: "应急药械管理"
      }
    },
    {
      path: "/medicalResource/bloodResource",
      name: "medicalResource_bloodResource",
      component: () =>
        import("@/views/medicalResource/bloodResource/index.vue"),
      meta: {
        icon: "ri:drop-line",
        title: "血液资源管理"
      }
    },
    {
      path: "/medicalResource/emergencyBed",
      name: "medicalResource_emergencyBed",
      component: () => import("@/views/medicalResource/emergencyBed/index.vue"),
      meta: {
        icon: "ri:hotel-bed-line",
        title: "应急床位管理"
      }
    }
  ]
};
