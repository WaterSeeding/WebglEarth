import * as THREE from "three";
import * as dat from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style.css";
import { setEarth } from "./setEarth";
import { setCloud } from "./setCloud";
import { setPoints } from "./setPoints";
import { setHelper } from "./setHelper";
import { setLight } from "./setLight";
import { setLensflare } from "./setLensflare";
import { setSunGui } from "./gui/setSunGui";
import { setEarthGui } from "./gui/setEarthGui";
import { SelectiveBloom } from "./SelectiveBloom";

const container = document.querySelector<HTMLDivElement>("#app");

const gui = new dat.GUI({
  width: 450,
  closed: true
});
const stats = new Stats();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000514);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0.5 * 1.8, 0 * 1.8, 3 * 1.8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

if (container) container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 12;
controls.minDistance = 2;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.75;
gui.add(controls, "autoRotate").name("Auto Rotate Scene");

setHelper(scene, gui);

const { directionalLight } = setLight(scene, gui);

const { lensflare, lensflareElement } = setLensflare(directionalLight);

lensflare.addElement(lensflareElement);
directionalLight.add(lensflare);

const earth = setEarth();
scene.add(earth);

const cloud = setCloud();
scene.add(cloud);

const points = setPoints();
scene.add(points);

setSunGui(directionalLight, lensflareElement, gui);

setEarthGui(earth, cloud, gui);

let selectiveBloom = new SelectiveBloom(scene, camera, renderer);

const bloomFolder = gui.addFolder("Bloom");
bloomFolder
  .add(selectiveBloom.bloomPass, "strength")
  .min(0)
  .max(5)
  .step(0.001)
  .name("Strength")
  .onChange((val: any) => {
    selectiveBloom.bloomPass.strength = val;
  });
bloomFolder
  .add(selectiveBloom.bloomPass, "radius")
  .min(-5)
  .max(5)
  .step(0.001)
  .name("Radius")
  .onChange((val: any) => {
    selectiveBloom.bloomPass.radius = val;
  });
bloomFolder
  .add(selectiveBloom.bloomPass, "threshold")
  .min(-5)
  .max(5)
  .step(0.001)
  .name("Threshold")
  .onChange((val: any) => {
    selectiveBloom.bloomPass.threshold = val;
  });

const clock = new THREE.Clock();

const animate = () => {
  stats.begin();
  const elapsedTime = clock.getElapsedTime();
  earth.rotation.y = elapsedTime / 10;
  cloud.rotation.y = elapsedTime / 10;

  if (earth) {
    earth.material.color.set(0x000000);
    cloud.material.color.set(0x000000);
    lensflareElement.color.set(0x000000);
    scene.background = null;
  }

  renderer.setClearColor(0x000000);
  selectiveBloom.bloomComposer.render();

  if (earth) {
    earth.material.color.set(earth.userData.color);
    cloud.material.color.set(cloud.userData.color);
    lensflareElement.color.set(0xffffff);
    scene.background = new THREE.Color(0x000514);
  }

  renderer.setClearColor(0x1d1d1d);
  selectiveBloom.finalComposer.render();

  // renderer.render(scene, camera);
  stats.end();

  controls.update();
  requestAnimationFrame(animate);
};

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  selectiveBloom.bloomComposer.setSize(window.innerWidth, window.innerHeight);
  selectiveBloom.finalComposer.setSize(window.innerWidth, window.innerHeight);
});
