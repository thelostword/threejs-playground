<!--
 * @Author: thelostword
 * @Date: 2022-11-15 18:10:23
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-17 15:47:10
 * @FilePath: \threejs-playground\src\views\12.背景与天空盒.vue
-->
<template>
  <canvas id="canvas" />
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import aristeaWreckPuresky from '@/assets/aristea_wreck_puresky.jpg';
import gardenNook from '@/assets/garden_nook.jpg';

function main() {
  const canvas = document.querySelector('#canvas');
  // 创建一个WebGL渲染器(WebGLRenderer)
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

  // 透视摄像机(PerspectiveCamera)
  const fov = 75;
  const aspect = 2; // 相机默认值
  const near = 0.1;
  const far = 100;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  // 创建一个场景(Scene)
  const scene = new THREE.Scene();

  {
    // const loader = new THREE.CubeTextureLoader();
    // const texture = loader.load([
    //   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
    //   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
    //   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
    //   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
    //   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
    //   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-z.jpg',
    // ]);
    // scene.background = texture;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      gardenNook,
      () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;
      },
    );
  }

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

    // const canvasAspect = canvas.clientWidth / canvas.clientHeight;
    // const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1;
    // const aspect = imageAspect / canvasAspect;

    // bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
    // bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
    // bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
    // bgTexture.repeat.y = aspect > 1 ? 1 : aspect;

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
