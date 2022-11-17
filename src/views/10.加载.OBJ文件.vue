<!--
 * @Author: thelostword
 * @Date: 2022-11-16 10:56:42
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-16 17:41:40
 * @FilePath: \threejs-playground\src\views\10.加载.OBJ文件.vue
-->
<template>
  <canvas id="canvas" />
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function main() {
  const canvas = document.querySelector('#canvas');
  // 创建一个WebGL渲染器(WebGLRenderer)
  const renderer = new THREE.WebGLRenderer({ canvas });

  // 透视摄像机(PerspectiveCamera)
  const fov = 75;
  const aspect = 2; // canvas 的默认宽高 300:150
  const near = 0.1;
  const far = 5;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const controls = new OrbitControls(camera, canvas);
  controls.update();

  // 创建一个场景(Scene)
  const scene = new THREE.Scene();
  {
    const near = 1;
    const far = 2;
    const color = 'lightblue';
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);
  }

  const cubeSize = 1;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({ color: 0x8844aa });
  const cube = new THREE.Mesh(cubeGeo, cubeMat);
  // cube.position.set(0, 0, 0);
  scene.add(cube);

  // 添加些光照
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
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
