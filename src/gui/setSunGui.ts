import * as THREE from "three";
import { LensflareElement } from "three/examples/jsm/objects/Lensflare.js";

const setSunGui = (
  directionalLight: THREE.DirectionalLight,
  lensflareElement: LensflareElement,
  gui: dat.GUI
) => {
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
};

export { setSunGui };
