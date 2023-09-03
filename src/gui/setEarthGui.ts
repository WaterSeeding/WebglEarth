import * as THREE from "three";

const setEarthGui = (earth: THREE.Mesh, cloud: THREE.Mesh, gui: dat.GUI) => {
  const earthFolder = gui.addFolder("Earth");
  earthFolder
    //@ts-ignore;
    .add(earth.material, "metalness")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Earth Metalness");
  earthFolder
    //@ts-ignore;
    .add(earth.material, "roughness")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Earth Roughness");
  earthFolder
    //@ts-ignore;
    .add(earth.material, "bumpScale")
    .min(0)
    .max(0.05)
    .step(0.0001)
    .name("Earth Bump Scale");
  //@ts-ignore;
  earthFolder.add(earth.material, "wireframe").name("Earth Wireframe");
  earthFolder
    //@ts-ignore;
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
};

export { setEarthGui };
