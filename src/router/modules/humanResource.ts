// 最简代码，也就是这些字段必须有
export default {
  path: "/humanResource",
  meta: {
    icon: "ep:school",
    title: "应急人力资源管理"
  },
  children: [
    {
      path: "/humanResource/organizationManage",
      name: "humanResource_organizationManage",
      component: () =>
        import("@/views/humanResource/organizationManage/index.vue"),
      meta: {
        title: "应急机构管理"
      }
    },
    {
      path: "/humanResource/humanManage",
      name: "humanResource_humanManage",
      component: () => import("@/views/humanResource/humanManage/index.vue"),
      meta: {
        title: "应急人员管理"
      }
    },
    {
      path: "/humanResource/groupManage",
      name: "humanResource_groupManage",
      component: () => import("@/views/humanResource/groupManage/index.vue"),
      meta: {
        title: "应急队伍管理"
      }
    },
    {
      path: "/humanResource/expertManage",
      name: "humanResource_expertManage",
      component: () => import("@/views/humanResource/expertManage/index.vue"),
      meta: {
        title: "应急专家管理"
      }
    }
  ]
};
