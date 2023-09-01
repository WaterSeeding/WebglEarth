import * as THREE from "three";
import * as dat from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare.js";
import "./style.css";
import { setEarth } from "./setEarth";
import { setCloud } from "./setCloud";
import { setPoints } from "./setPoints";

const container = document.querySelector<HTMLDivElement>("#app");

const gui = new dat.GUI();
const stats = new Stats();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);

const textureLoader = new THREE.TextureLoader();

camera.position.set(0.5 * 1.5, 0 * 1.5, 3 * 1.5);
scene.background = new THREE.Color(0x000514);
renderer.shadowMap.enabled = true;
controls.enableDamping = true;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
controls.dampingFactor = 0.05;
controls.maxDistance = 12;
controls.minDistance = 2;
controls.enablePan = false;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.75;

if (container) container.appendChild(renderer.domElement);

const gridHelper = new THREE.GridHelper(20, 30);
gridHelper.visible = false;
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const axis = new THREE.AxesHelper(1.75);
axis.visible = false;
scene.add(axis);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(-5, 2, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  5
);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);

directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;

const directionalLightShadowCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightShadowCameraHelper.visible = false;
scene.add(directionalLightShadowCameraHelper);

const lensFlaresImg = "./lensFlares.png";
const lensflareTexture = textureLoader.load(lensFlaresImg);
const lensflareColor = new THREE.Color(0xffffff);
const lensflare = new Lensflare();
const lensflareElement = new LensflareElement(
  lensflareTexture,
  300 * directionalLight.intensity,
  0,
  lensflareColor
);

lensflare.addElement(lensflareElement);
directionalLight.add(lensflare);

const earth = setEarth();
scene.add(earth);

const cloud = setCloud();
scene.add(cloud);

const points = setPoints();
scene.add(points);

gui.add(gridHelper, "visible").name("Grid Helper");
gui.add(axis, "visible").name("Axis Helper");
gui.add(controls, "autoRotate").name("Auto Rotate Scene");

const sunFolder = gui.addFolder("Sun");
sunFolder
  .add(directionalLight, "intensity")
  .min(0)
  .max(2)
  .step(0.01)
  .name("Sun Intensity")
  .onChange((val: any) => {
    lensflareElement.size = val * 300;
  });
sunFolder
  .add(directionalLight.position, "x")
  .min(-5)
  .max(5)
  .step(0.01)
  .name("Sun X");
sunFolder
  .add(directionalLight.position, "y")
  .min(-5)
  .max(5)
  .step(0.01)
  .name("Sun Y");
sunFolder
  .add(directionalLight.position, "z")
  .min(-5)
  .max(5)
  .step(0.01)
  .name("Sun Z");

const earthFolder = gui.addFolder("Earth");
earthFolder
  .add(earth.material, "metalness")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Earth Metalness");
earthFolder
  .add(earth.material, "roughness")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Earth Roughness");
earthFolder
  .add(earth.material, "bumpScale")
  .min(0)
  .max(0.05)
  .step(0.0001)
  .name("Earth Bump Scale");
earthFolder.add(earth.material, "wireframe").name("Earth Wireframe");
earthFolder
  .add(cloud.material, "opacity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Cloud Opacity");
earthFolder
  .add(cloud.scale, "x")
  .min(1.01)
  .max(1.1)
  .step(0.001)
  .name("Cloud Distance")
  .onChange((val) => {
    cloud.scale.y = val;
    cloud.scale.z = val;
  });

const clock = new THREE.Clock();

const animate = () => {
  stats.begin();
  const elapsedTime = clock.getElapsedTime();

  earth.rotation.y = elapsedTime / 10;
  cloud.rotation.y = elapsedTime / 10;
  controls.update();
  renderer.render(scene, camera);

  stats.end();
  requestAnimationFrame(animate);
};

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
