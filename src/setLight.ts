import * as THREE from "three";

const setLight = (scene: THREE.Scene, gui: dat.GUI) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

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

  const sunFolder = gui.addFolder("Sun Helper");
  sunFolder.add(directionalLightHelper, "visible").name("Helper");
  sunFolder
    .add(directionalLightShadowCameraHelper, "visible")
    .name("ShadowCameraHelper");

  return {
    ambientLight,
    directionalLight,
  };
};

export { setLight };
