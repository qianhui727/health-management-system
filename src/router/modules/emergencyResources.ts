// 最简代码，也就是这些字段必须有
export default {
  path: "/emergencyResources",
  meta: {
    icon:"ep:school",
    title: "应急物资管理"
  },
  children: [
    {
      path: "/emergencyResources/materialCatalog",
      name: "emergencyResources_materialCatalog",
      component: () => import("@/views/emergencyResources/materialCatalog/index.vue"),
      meta: {
        icon:"cil:airplay",
        title: "物资目录管理"
      }
    },
    {
      path: "/emergencyResources/storehouse",
      name: "emergencyResources_storehouse",
      component: () => import("@/views/emergencyResources/storehouse/index.vue"),
      meta: {
        icon:"cil:couch",
        title: "仓库管理"
      }
    },
    {
      path: "/emergencyResources/supplies",
      name: "emergencyResources_supplie",
      component: () => import("@/views/emergencyResources/supplies/index.vue"),
      meta: {
        icon:"cil:badge",
        title: "物资管理"
      }
    },
    {
      path: "/emergencyResources/centerSupplies",
      name: "emergencyResources_centerSupplies",
      component: () => import("@/views/emergencyResources/centerSupplies/index.vue"),
      meta: {
        icon: 'cil:burn',
        title: "中心物资仓库"
      }
    },
     {
      path: "/emergencyResources/bloodResources",
      name: "emergencyResources_bloodResources",
      component: () => import("@/views/emergencyResources/bloodResources/index.vue"),
      meta: {
        icon: 'cil:burn',
        title: "血液资源"
      }
    }
  ]
};
