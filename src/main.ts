import * as THREE from "three";
import * as dat from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style.css";
import { setHelper } from "./setHelper";
import { setLight } from "./setLight";
import { SelectiveBloom } from "./SelectiveBloom";
import { setSelectiveBloomGui } from './gui/setSelectiveBloomGui.ts';

const container = document.querySelector<HTMLDivElement>("#app");

const gui = new dat.GUI({
  width: 450,
  closed: true,
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

let selectiveBloom = new SelectiveBloom(scene, camera, renderer);

setSelectiveBloomGui(selectiveBloom, gui);

const animate = () => {
  stats.begin();
  scene.background = null;

  renderer.setClearColor(0x000000);
  selectiveBloom.bloomComposer.render();

  scene.background = new THREE.Color(0x000514);

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
