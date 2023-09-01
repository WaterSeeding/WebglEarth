import * as THREE from "three";

const setPoints = () => {
  const pointsCount = 1500;
  const pointsGeo = new THREE.BufferGeometry();
  const pointsPos = new Float32Array(pointsCount * 3);

  for (let i = 0; i < pointsCount * 3; i++) {
    pointsPos[i] = (Math.random() - 0.5) * 15;
  }
  pointsGeo.setAttribute("position", new THREE.BufferAttribute(pointsPos, 3));

  const pointsMat = new THREE.PointsMaterial({
    size: 0.015,
    sizeAttenuation: true,
    color: 0xffffff,
  });

  const points = new THREE.Points(pointsGeo, pointsMat);

  return points;
};

export { setPoints };
