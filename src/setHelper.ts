import * as THREE from "three";
import * as dat from "dat.gui";

const setHelper = (scene: THREE.Scene, gui: dat.GUI) => {
  const gridHelper = new THREE.GridHelper(20, 30);
  gridHelper.visible = false;
  scene.add(gridHelper);

  const axis = new THREE.AxesHelper(1.75);
  axis.visible = false;
  scene.add(axis);

  gui.add(gridHelper, "visible").name("Grid Helper");
  gui.add(axis, "visible").name("Axis Helper");
};

export { setHelper };
