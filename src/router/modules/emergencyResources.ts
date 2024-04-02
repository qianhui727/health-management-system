// 最简代码，也就是这些字段必须有
export default {
  path: "/emergencyResources",
  meta: {
    icon:"lets-icons:3d-box-fill",
    title: "应急物资管理"
  },
  children: [
    {
      path: "/emergencyResources/materialCatalog",
      name: "emergencyResources_materialCatalog",
      component: () => import("@/views/emergencyResources/materialCatalog/index.vue"),
      meta: {
        icon:"pixelarticons:align-justify",
        title: "物资目录管理"
      }
    },
    {
      path: "/emergencyResources/storehouse",
      name: "emergencyResources_storehouse",
      component: () => import("@/views/emergencyResources/storehouse/index.vue"),
      meta: {
        icon:"akar-icons:codepen-fill",
        title: "仓库管理"
      }
    },
    {
      path: "/emergencyResources/supplies",
      name: "emergencyResources_supplie",
      component: () => import("@/views/emergencyResources/supplies/index.vue"),
      meta: {
        icon:"akar-icons:dropbox-fill",
        title: "物资管理"
      }
    },
    {
      path: "/emergencyResources/centerSupplies",
      name: "emergencyResources_centerSupplies",
      component: () => import("@/views/emergencyResources/centerSupplies/index.vue"),
      meta: {
        icon: 'akar-icons:augmented-reality',
        title: "中心物资仓库"
      }
    },
     
  ]
};
