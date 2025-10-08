import {createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions} from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * 静态路由
 */
const staticRoutes: RouteRecordRaw[] = [{
  name: "/",
  path: "/",
  component: () => import('@/views/demos/Main.vue')
}, {
  name: "app",
  path: "/app",
  component: () => import('@/views/demos/basic/AppMain.vue')
}, {
  name: "button",
  path: "/button",
  component: () => import('@/views/demos/basic/ButtonMain.vue')
}, {
  name: "form",
  path: "/form",
  component: () => import('@/views/demos/form/FormMain.vue')
}, {
  name: "dialog",
  path: "/dialog",
  component: () => import('@/views/demos/dialog/DialogMain.vue')
}, {
  name: "drawer",
  path: "/drawer",
  component: () => import('@/views/demos/dialog/DrawerMain.vue')
}, {
  name: "page",
  path: "/page",
  component: () => import('./views/demos/page/SubPage.vue')
}, {
  name: "nav",
  path: "/nav",
  component: () => import('@/views/demos/nav/NavMain.vue')
}, {
  name: "borderLayout",
  path: "/borderLayout",
  component: () => import('./views/demos/layout/BorderLayoutMain.vue')
}, {
  name: "stackLayout",
  path: "/stackLayout",
  component: () => import('./views/demos/layout/StackLayoutMain.vue')
}, {
  name: "tab",
  path: "/tab",
  component: () => import('./views/demos/tab/TabMain.vue')
}, {
  name: "table",
  path: "/table",
  component: () => import('@/views/demos/table/TableMain.vue')
}, {
  name: "editTable",
  path: "/editTable",
  component: () => import('@/views/demos/table/EditTableMain.vue')
}, {
  name: "tree",
  path: "/tree",
  component: () => import('@/views/demos/tree/TreeMain.vue')
}];

/**
 * 创建路由
 */
const routes = [...staticRoutes];
const router = createRouter(<RouterOptions>{
  history: createWebHashHistory(),
  routes: routes
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

/**
 * onError
 */
router.onError(() => {
  NProgress.done();
});

export default router;
