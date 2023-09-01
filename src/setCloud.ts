import * as THREE from "three";

const setCloud = () => {
  const cloudMap = new THREE.TextureLoader().load("./cloudMap.jpg");

  const cloud = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshStandardMaterial({
      map: cloudMap,
      alphaMap: cloudMap,
      bumpScale: 0.015,
      transparent: true,
      depthWrite: false,
      opacity: 0.2,
    })
  );
  cloud.scale.set(1.025, 1.025, 1.025);

  return cloud;
};

export { setCloud };
