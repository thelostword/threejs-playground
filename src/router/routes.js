/*
 * @Author: losting
 * @Date: 2022-06-10 09:58:20
 * @LastEditTime: 2022-11-15 18:12:14
 * @LastEditors: thelostword
 * @Description:
 * @FilePath: \threejs-playground\src\router\routes.js
 */
const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/1',
    component: () => import('@/views/1.基础.vue'),
    meta: {
      title: '1.基础',
    },
  },
  {
    path: '/2',
    component: () => import('@/views/2.响应式.vue'),
    meta: {
      title: '2.响应式',
    },
  },
];

export default routes;
