import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "/login"
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/components/redirect')
      }
    ]
  },
  {
    path: "/login",
    name: "layout",
    component: () =>
          import(/* webpackChunkName: "about" */ "@/views/login/Index.vue"),
  },
  {
    path: "/chat",
    name: "layout",
    component: Layout,
    redirect: "/chat/index",
    children: [
      {
        path: ":id",
        name: "chat",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/chat/Index.vue")
      }
    ]
  },
  {
    path: "/address-book",
    name: "layout",
    component: Layout,
    redirect: "/address-book/index",
    children: [
      {
        path: "index",
        name: "addressBook",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/addressBook/Index.vue")
      }
    ]
  },
  {
    path: "/group-book",
    name: "layout",
    component: Layout,
    redirect: "/group-book/index",
    children: [
      {
        path: "index",
        name: "addressBook",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/addressBook/Index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
