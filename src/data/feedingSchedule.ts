/**
 * Flora Series feed schedule
 *
 * Nutrient values are in ml/5L (base unit) and converted at display time
 */

import type { WeekSchedule, FeedingPreset } from "@/types";

const STANDARD_FEED_SCHEDULE: WeekSchedule[] = [
  // GROWTH PHASE - Weeks 1-4
  {
    week: 1,
    phase: "vegetation",
    phaseWeek: 1,
    growthStage: "Seedling/Clone",
    ppm: "300",
    floraMicro: 2.5,
    floraGro: 2.5,
    floraBloom: 2.5,
    calmag: 0,
  },
  {
    week: 2,
    phase: "vegetation",
    phaseWeek: 2,
    growthStage: "Early Growth",
    ppm: "500-700",
    floraMicro: 3.7,
    floraGro: 6.2,
    floraBloom: 3.0,
    calmag: 2.5,
    armorSi: 3.3,
    diamondNectar: 6.6,
  },
  {
    week: 3,
    phase: "vegetation",
    phaseWeek: 3,
    growthStage: "Mid Growth",
    ppm: "700-800",
    floraMicro: 6.2,
    floraGro: 7.5,
    floraBloom: 3.7,
    calmag: 2.5,
    armorSi: 3.3,
    diamondNectar: 6.6,
  },
  {
    week: 4,
    phase: "vegetation",
    phaseWeek: 4,
    growthStage: "Late Growth",
    ppm: "850-1000",
    floraMicro: 7.5,
    floraGro: 8.7,
    floraBloom: 5.0,
    calmag: 2.5,
    armorSi: 3.3,
    diamondNectar: 6.6,
  },
  // FLOWERING PHASE - Weeks 5-12 (Flowering weeks 1-8)
  {
    week: 5,
    phase: "flowering",
    phaseWeek: 1,
    growthStage: "Early Flowering",
    ppm: "800-1000",
    floraMicro: 6.2,
    floraGro: 5.0,
    floraBloom: 8.7,
    calmag: 2.5,
    armorSi: 3.3,
    diamondNectar: 6.6,
  },
  {
    week: 6,
    phase: "flowering",
    phaseWeek: 2,
    growthStage: "Early Flowering",
    ppm: "800-1000",
    floraMicro: 6.2,
    floraGro: 5.0,
    floraBloom: 8.7,
    calmag: 2.5,
    armorSi: 3.3,
    diamondNectar: 6.6,
  },
  {
    week: 7,
    phase: "flowering",
    phaseWeek: 3,
    growthStage: "Mid Flowering",
    ppm: "800-1000",
    floraMicro: 3.7,
    floraGro: 6.2,
    floraBloom: 8.1,
    calmag: 2.5,
    armorSi: 3.3,
    diamondNectar: 6.6,
  },
  {
    week: 8,
    phase: "flowering",
    phaseWeek: 4,
    growthStage: "Mid Flowering",
    ppm: "800-1000",
    floraMicro: 3.7,
    floraGro: 6.2,
    floraBloom: 8.1,
    calmag: 2.5,
    armorSi: 3.3,
    diamondNectar: 6.6,
  },
  {
    week: 9,
    phase: "flowering",
    phaseWeek: 5,
    growthStage: "Mid Flowering",
    ppm: "800-1000",
    floraMicro: 3.7,
    floraGro: 6.2,
    floraBloom: 8.1,
    calmag: 2.5,
    armorSi: 3.3,
    diamondNectar: 6.6,
  },
  {
    week: 10,
    phase: "flowering",
    phaseWeek: 6,
    growthStage: "Late Flowering",
    ppm: "550-750",
    floraMicro: 3.7,
    floraGro: 3.0,
    floraBloom: 3.7,
    calmag: 1.3,
    armorSi: 3.3,
    diamondNectar: 6.6,
  },
  {
    week: 11,
    phase: "flowering",
    phaseWeek: 7,
    growthStage: "Late Flowering",
    ppm: "550-750",
    floraMicro: 3.7,
    floraGro: 3.0,
    floraBloom: 3.7,
    calmag: 1.3,
    armorSi: 3.3,
    diamondNectar: 6.6,
  },
  {
    week: 12,
    phase: "flowering",
    phaseWeek: 8,
    growthStage: "Ripen",
    ppm: "500",
    floraMicro: 3.7,
    floraGro: 1.98,
    floraBloom: 3.04,
  },
];

/**
 * Built-in feeding preset from the custom Growth + Flowering chart
 */
export const PRESETS: FeedingPreset[] = [
  {
    id: "standard",
    name: "Standard Feed",
    type: "standard",
    schedule: STANDARD_FEED_SCHEDULE,
  },
];

/**
 * Get a preset by its ID
 */
export const getPresetById = (id: string): FeedingPreset | undefined => {
  return PRESETS.find((p) => p.id === id);
};

/**
 * Default feeding schedule
 */
export const FEEDING_SCHEDULE = STANDARD_FEED_SCHEDULE;

/**
 * Get the total number of weeks in a schedule
 */
export const getTotalWeeks = (schedule?: WeekSchedule[]) =>
  (schedule || FEEDING_SCHEDULE).length;

/**
 * Get the schedule for a specific week
 */
export const getWeekSchedule = (
  weekNumber: number,
  schedule?: WeekSchedule[],
): WeekSchedule | undefined => {
  return (schedule || FEEDING_SCHEDULE).find((w) => w.week === weekNumber);
};
