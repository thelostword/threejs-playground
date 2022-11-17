<!--
 * @Author: thelostword
 * @Date: 2022-11-16 10:56:42
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-17 09:53:09
 * @FilePath: \threejs-playground\src\views\6.光照.vue
-->
<template>
  <canvas id="canvas" />
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }

  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }

  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

function main() {
  const canvas = document.querySelector('#canvas');
  // 创建一个WebGL渲染器(WebGLRenderer)
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.shadowMap.enabled = true;

  // 透视摄像机(PerspectiveCamera)
  const fov = 45;
  const aspect = 2; // canvas 的默认宽高 300:150
  const near = 0.1;
  const far = 1000;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  // 创建一个场景(Scene)
  const scene = new THREE.Scene();

  const planeSize = 100;
  const loader = new THREE.TextureLoader();
  const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  const repeats = planeSize / 2;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * -0.5;
  mesh.receiveShadow = true;
  scene.add(mesh);

  function mesh1() {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
    const demo1Mesh = new THREE.Mesh(cubeGeo, cubeMat);
    demo1Mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(demo1Mesh);
    demo1Mesh.castShadow = true;
    demo1Mesh.receiveShadow = true;
  }
  mesh1();

  function mesh2() {
    const sphereRadius = 3;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 32, 16);
    const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
    const demoMesh2 = new THREE.Mesh(sphereGeo, sphereMat);
    demoMesh2.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(demoMesh2);
    demoMesh2.castShadow = true;
    demoMesh2.receiveShadow = true;
  }
  mesh2();

  // 添加些光照
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.PointLight(color, intensity);
  light.position.set(0, 50, 20);
  light.castShadow = true;
  scene.add(light);
  const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(cameraHelper);
  const helper = new THREE.PointLightHelper(light);
  scene.add(helper);

  const gui = new GUI();
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  gui.add(light, 'intensity', 0, 2, 0.01);

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

  function render() {
    // cube.rotation.x = time / 5000;
    // cube.rotation.y = time / 5000;
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
