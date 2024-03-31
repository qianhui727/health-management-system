// 最简代码，也就是这些字段必须有
export default {
  path: "/humanResource",
  meta: {
    icon: "ep:avatar",
    title: "应急人力资源管理"
  },
  children: [
    {
      path: "/humanResource/organizationManage",
      name: "humanResource_organizationManage",
      component: () =>
        import("@/views/humanResource/organizationManage/index.vue"),
      meta: {
        icon: "ep:office-building",
        title: "应急机构管理"
      }
    },
    {
      path: "/humanResource/humanManage",
      name: "humanResource_humanManage",
      component: () => import("@/views/humanResource/humanManage/index.vue"),
      meta: {
        icon: "ri:user-star-line",
        title: "应急人员管理"
      }
    },
    {
      path: "/humanResource/groupManage",
      name: "humanResource_groupManage",
      component: () => import("@/views/humanResource/groupManage/index.vue"),
      meta: {
        icon: "ri:medicine-bottle-line",
        title: "应急队伍管理"
      }
    },
    {
      path: "/humanResource/expertManage",
      name: "humanResource_expertManage",
      component: () => import("@/views/humanResource/expertManage/index.vue"),
      meta: {
        icon: "ri:medal-2-line",
        title: "应急专家管理"
      }
    }
  ]
};
