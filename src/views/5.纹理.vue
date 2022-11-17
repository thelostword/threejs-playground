<!--
 * @Author: thelostword
 * @Date: 2022-11-16 10:56:42
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-16 12:46:11
 * @FilePath: \threejs-playground\src\views\5.纹理.vue
-->
<template>
  <canvas id="canvas" />
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import WallImg from '@/assets/wall.jpg';

function main() {
  const canvas = document.querySelector('#canvas');
  // 创建一个WebGL渲染器(WebGLRenderer)
  const renderer = new THREE.WebGLRenderer({ canvas });

  // 透视摄像机(PerspectiveCamera)
  const fov = 75;
  const aspect = 2; // 相机默认值
  const near = 0.1;
  const far = 100;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 40;

  // 创建一个场景(Scene)
  const scene = new THREE.Scene();

  // 创建一个包含盒子信息的立方几何体(BoxGeometry)
  const geometry = new THREE.BoxGeometry(20, 25, 20);

  // 创建一个基本的材质
  const loader = new THREE.TextureLoader();
  const material = new THREE.MeshBasicMaterial({ map: loader.load(WallImg) });

  // 创建一个网格(Mesh)
  const cube = new THREE.Mesh(geometry, material);

  // 将网格添加到场景中
  scene.add(cube);

  // 添加些光照
  // const color = 0xFFFFFF;
  // const intensity = 1;
  // const light = new THREE.DirectionalLight(color, intensity);
  // light.position.set(-1, 2, 4);
  // scene.add(light);

  // 将场景和摄像机传递给渲染器来渲染出整个场景
  renderer.render(scene, camera);

  function resizeRendererToDisplaySize() {
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    cube.rotation.x = time / 5000;
    cube.rotation.y = time / 5000;
    if (resizeRendererToDisplaySize()) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

onMounted(() => {
  main();
});
</script>

<style lang="scss" scoped>
#canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
