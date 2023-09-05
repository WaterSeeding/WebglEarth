import { SelectiveBloom } from "../SelectiveBloom";

const setSelectiveBloomGui = (selectiveBloom: SelectiveBloom, gui: dat.GUI) => {
  const bloomFolder = gui.addFolder("Bloom");
  bloomFolder
    .add(selectiveBloom.bloomPass, "strength")
    .min(0)
    .max(5)
    .step(0.001)
    .name("Strength")
    .onChange((val: any) => {
      selectiveBloom.bloomPass.strength = val;
    });
  bloomFolder
    .add(selectiveBloom.bloomPass, "radius")
    .min(-5)
    .max(5)
    .step(0.001)
    .name("Radius")
    .onChange((val: any) => {
      selectiveBloom.bloomPass.radius = val;
    });
  bloomFolder
    .add(selectiveBloom.bloomPass, "threshold")
    .min(-5)
    .max(5)
    .step(0.001)
    .name("Threshold")
    .onChange((val: any) => {
      selectiveBloom.bloomPass.threshold = val;
    });
};

export { setSelectiveBloomGui };
