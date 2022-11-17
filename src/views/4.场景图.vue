<!--
 * @Author: thelostword
 * @Date: 2022-11-16 11:31:00
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-16 12:07:09
 * @FilePath: \threejs-playground\src\views\4.场景图.vue
-->
<template>
  <canvas id="canvas" />
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';

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
  camera.position.set(0, 50, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  // 创建一个场景(Scene)
  const scene = new THREE.Scene();

  const objects = [];

  // 星球公共几何体
  const sphereGeometry = new THREE.SphereGeometry(8, 8, 8);

  // 太阳系
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  // 太阳
  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);

  solarSystem.add(sunMesh);
  objects.push(sunMesh);

  // 地月系统
  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 25;

  solarSystem.add(moonOrbit);
  objects.push(moonOrbit);

  // 地球
  const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);

  earthMesh.scale.set(0.3, 0.3, 0.3);

  moonOrbit.add(earthMesh);

  // 月亮
  const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
  const moobMesh = new THREE.Mesh(sphereGeometry, moonMaterial);

  moobMesh.scale.set(0.1, 0.1, 0.1);
  moobMesh.position.x = 5;

  moonOrbit.add(moobMesh);

  // 添加些光照
  const color = 0xFFFFFF;
  const intensity = 2;
  const light = new THREE.PointLight(color, intensity);
  light.position.set(0, 0, 0);
  scene.add(light);

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
    objects.forEach((obj) => {
      obj.rotation.y = time / 1000;
    });

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
