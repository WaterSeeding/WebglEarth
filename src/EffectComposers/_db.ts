import Dexie, { Table } from "dexie";
import { EffectComposersParamsInterface } from "./_typings.ts";

export const db = new Dexie("ThreeEffectComposersDB");

db.version(1).stores({
  EffectComposers: "++id, exposure, bloomStrength, bloomThreshold, bloomRadius",
});

export type EffectComposersTableInterface =
  Table<EffectComposersParamsInterface>;

export const effectComposersTable: EffectComposersTableInterface =
  db.table("EffectComposers");
