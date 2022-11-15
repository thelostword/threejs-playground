<!--
 * @Author: thelostword
 * @Date: 2022-11-15 18:10:23
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-15 18:23:19
 * @FilePath: \threejs-playground\src\views\2.响应式.vue
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
  const far = 5;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  // 创建一个场景(Scene)
  const scene = new THREE.Scene();

  // 创建一个包含盒子信息的立方几何体(BoxGeometry)
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // 创建一个基本的材质
  // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

  // 创建一个网格(Mesh)
  function makeInstance(_geometry, color, x) {
    const _material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(_geometry, _material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  // 将网格添加到场景中
  // scene.add(cube);

  // 添加些光照
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  // 将场景和摄像机传递给渲染器来渲染出整个场景
  renderer.render(scene, camera);

  function resizeRendererToDisplaySize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.2;
      const rot = (time / 1000) * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
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
