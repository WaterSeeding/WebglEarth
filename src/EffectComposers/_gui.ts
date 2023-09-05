import EffectComposers from "./index";
import { EffectComposersParamsInterface } from "./_typings.ts";
import { setGuiSlide } from "./utils/setGuiSlide";

const reviseGui = (
  effectComposers: EffectComposers,
  guiParams: EffectComposersParamsInterface
) => {
  // effectComposers.strength = guiParams.bloomStrength;
  // effectComposers.radius = guiParams.bloomRadius;
  // effectComposers.threshold = guiParams.bloomThreshold;
};

const storeGui = (
  guiParams: EffectComposersParamsInterface,
  storeCb: (data: EffectComposersParamsInterface) => void
) => {
  storeCb({
    exposure: 1,
    bloomStrength: Number(guiParams.bloomStrength),
    bloomThreshold: Number(guiParams.bloomThreshold),
    bloomRadius: Number(guiParams.bloomRadius),
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: EffectComposersParamsInterface,
  effectComposers: EffectComposers,
  storeCb?: (data: EffectComposersParamsInterface) => void
) => {
  let effectComposers_folder = gui.addFolder("EffectComposers");
  effectComposers_folder.open();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(effectComposers, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiSlide(
    effectComposers_folder,
    guiParams,
    "bloomStrength",
    "bloomStrength",
    {
      min: -255.0,
      max: 255.0,
      step: 0.01,
    },
    () => {
      reviseGui(effectComposers, guiParams);
    }
  );

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb!);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(effectComposers, initGuiParams);
      storeGui(initGuiParams, storeCb!);
      effectComposers_folder.revert(effectComposers_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
  };

  effectComposers_folder.add(obj, "ensure").name("确定参数");
  effectComposers_folder.add(obj, "reset").name("重置参数");

  return effectComposers_folder;
};
