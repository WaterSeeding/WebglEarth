import * as THREE from "three";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare.js";

const setLensflare = (directionalLight: THREE.DirectionalLight) => {
  const lensflareTexture = new THREE.TextureLoader().load("./lensFlares.png");
  const lensflareColor = new THREE.Color(0xffffff);
  const lensflare = new Lensflare();
  const lensflareElement = new LensflareElement(
    lensflareTexture,
    300 * directionalLight.intensity,
    0,
    lensflareColor
  );

  return {
    lensflare,
    lensflareElement,
  };
};

export { setLensflare };
