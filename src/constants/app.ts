/**
 * Application-wide constants
 */

export const APP_NAME = "Flora Feed";
export const APP_DESCRIPTION =
  "Feeding schedule tracker for the General Hydroponics Flora Series";

export const DEFAULT_PRESET_ID = "standard";
export const DEFAULT_UNIT = "ml/5L";

export const STORAGE_KEYS = {
  SCHEDULE: "gh-flora-schedule",
  WATERING: "gh-flora-watering",
  CUSTOM_PRESETS: "gh-flora-custom-presets",
  SETTINGS: "gh-flora-settings",
} as const;

export const NUTRIENTS = [
  {
    key: "floraMicro",
    label: "FloraMicro",
    group: "base",
    color: "bg-pink-100 text-pink-700 border-pink-200",
    textColor: "text-pink-700",
  },
  {
    key: "floraGro",
    label: "FloraGro",
    group: "base",
    color: "bg-green-100 text-green-700 border-green-200",
    textColor: "text-green-700",
  },
  {
    key: "floraBloom",
    label: "FloraBloom",
    group: "base",
    color: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
    textColor: "text-fuchsia-700",
  },
  {
    key: "calmag",
    label: "calmag",
    group: "supplement",
    color: "bg-red-100 text-red-700 border-red-200",
    textColor: "text-red-700",
  },
  {
    key: "armorSi",
    label: "armor SI",
    group: "supplement",
    color: "bg-sky-100 text-sky-700 border-sky-200",
    textColor: "text-sky-700",
  },
  {
    key: "diamondNectar",
    label: "diamond nectar",
    group: "supplement",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    textColor: "text-amber-700",
  },
] as const;

export const NUTRIENT_COLORS = {
  floraMicro: "bg-pink-100 text-pink-700 border-pink-200",
  floraGro: "bg-green-100 text-green-700 border-green-200",
  floraBloom: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  calmag: "bg-red-100 text-red-700 border-red-200",
  armorSi: "bg-sky-100 text-sky-700 border-sky-200",
  diamondNectar: "bg-amber-100 text-amber-700 border-amber-200",
} as const;

export const NUTRIENT_TEXT_COLORS = {
  floraMicro: "text-pink-700",
  floraGro: "text-green-700",
  floraBloom: "text-fuchsia-700",
  calmag: "text-red-700",
  armorSi: "text-sky-700",
  diamondNectar: "text-amber-700",
} as const;

export const PHASE_STYLES = {
  vegetation: "bg-green-100 text-green-700",
  flowering: "bg-purple-100 text-purple-700",
  flush: "bg-blue-100 text-blue-700",
} as const;

export const PHASE_LABELS = {
  vegetation: "🌱 VEGETATION Phase",
  flowering: "🌸 FLOWERING Phase",
  flush: "💧 FLUSH",
} as const;
