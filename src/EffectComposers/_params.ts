import { EffectComposersParamsInterface } from "./_typings.ts";
import { EffectComposersTableInterface } from "./_db";

const defaultParams = {
  exposure: 1,
  bloomStrength: 3.0,
  bloomRadius: 0.145,
  bloomThreshold: 0.203,
};

export const setParams = async (
  cameraTable: EffectComposersTableInterface
): Promise<EffectComposersParamsInterface> => {
  let res = await cameraTable.toArray();
  let latestResValue = res[res.length - 1] || {};
  return { ...latestResValue, ...defaultParams };
};
