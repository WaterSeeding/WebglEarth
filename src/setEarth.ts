import * as THREE from "three";

const setEarth = () => {
  const earthMap = new THREE.TextureLoader().load("./earthMap.jpg");

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: earthMap,
      bumpMap: earthMap,
      bumpScale: 0.018,
      metalness: 0.3,
      roughness: 0.7,
    })
  );

  earth.userData = {
    color: new THREE.Color().copy(earth.material.color),
  };

  return earth;
};

export { setEarth };
