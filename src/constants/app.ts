/**
 * Application-wide constants
 */

export const APP_NAME = "Flora Feed";
export const APP_DESCRIPTION =
  "Feeding schedule tracker for the General Hydroponics Flora Series";

export const DEFAULT_PRESET_ID = "medium";
export const DEFAULT_UNIT = "ml/gal";

export const STORAGE_KEYS = {
  SCHEDULE: "gh-flora-schedule",
  WATERING: "gh-flora-watering",
  CUSTOM_PRESETS: "gh-flora-custom-presets",
  SETTINGS: "gh-flora-settings",
} as const;

export const NUTRIENT_COLORS = {
  floraMicro: "bg-pink-100 text-pink-700 border-pink-200",
  floraGro: "bg-green-100 text-green-700 border-green-200",
  floraBloom: "bg-red-100 text-red-700 border-red-200",
  caliMagic: "bg-orange-100 text-orange-700 border-orange-200",
  floralicious: "bg-yellow-100 text-yellow-700 border-yellow-200",
  koolBloom: "bg-blue-100 text-blue-700 border-blue-200",
} as const;

export const NUTRIENT_TEXT_COLORS = {
  floraMicro: "text-pink-700",
  floraGro: "text-green-700",
  floraBloom: "text-red-700",
  caliMagic: "text-orange-700",
  floralicious: "text-yellow-700",
  koolBloom: "text-blue-700",
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

export const GH_FEED_CHART_URL =
  "https://generalhydroponics.com/resources/flora-series-feedcharts/";

