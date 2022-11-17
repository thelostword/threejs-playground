/*
 * @Author: losting
 * @Date: 2022-06-10 09:58:20
 * @LastEditTime: 2022-11-17 15:22:28
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
  {
    path: '/3',
    component: () => import('@/views/3.图元.vue'),
    meta: {
      title: '3.图元',
    },
  },
  {
    path: '/4',
    component: () => import('@/views/4.场景图.vue'),
    meta: {
      title: '4.场景图',
    },
  },
  {
    path: '/5',
    component: () => import('@/views/5.纹理.vue'),
    meta: {
      title: '5.纹理',
    },
  },
  {
    path: '/6',
    component: () => import('@/views/6.光照.vue'),
    meta: {
      title: '6.光照',
    },
  },
  {
    path: '/7',
    component: () => import('@/views/7.雾.vue'),
    meta: {
      title: '7.雾',
    },
  },
  {
    path: '/10',
    component: () => import('@/views/10.加载.OBJ文件.vue'),
    meta: {
      title: '10.加载.OBJ文件',
    },
  },
  {
    path: '/11',
    component: () => import('@/views/11.加载.GLTF文件.vue'),
    meta: {
      title: '11.加载.GLTF文件',
    },
  },
  {
    path: '/12',
    component: () => import('@/views/12.背景与天空盒.vue'),
    meta: {
      title: '12.背景与天空盒',
    },
  },
];

export default routes;
