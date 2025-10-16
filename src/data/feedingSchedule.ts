/**
 * General Hydroponics Flora Series - Feed Schedules
 *
 * This file contains the official GH Flora Series feeding schedules
 * All nutrient values are in ml/gal (base unit) and converted at display time
 *
 * Schedules include:
 * - Light Feed: Lower nutrient concentration for sensitive plants
 * - Medium Feed: Balanced nutrient levels for most plants (recommended)
 * - Aggressive Feed: Higher nutrient concentration for vigorous growth
 */

import type { WeekSchedule, FeedingPreset } from "@/types";

// Light Feed Schedule (ml/gal from screenshot)
const LIGHT_FEED_SCHEDULE: WeekSchedule[] = [
  // VEGETATION PHASE (18H Photoperiod) - Weeks 1-4
  {
    week: 1,
    phase: "vegetation",
    phaseWeek: 1,
    growthStage: "Seedling/Clone",
    floraMicro: 1.7,
    floraGro: 1.7,
    floraBloom: 1.7,
    floralicious: 1.0,
  },
  {
    week: 2,
    phase: "vegetation",
    phaseWeek: 2,
    growthStage: "Early Growth",
    floraMicro: 2.7,
    floraGro: 3.8,
    floraBloom: 1.9,
    caliMagic: 1.9,
    floralicious: 1.0,
  },
  {
    week: 3,
    phase: "vegetation",
    phaseWeek: 3,
    growthStage: "Early Growth",
    floraMicro: 3.8,
    floraGro: 5.3,
    floraBloom: 2.7,
    caliMagic: 1.9,
    floralicious: 1.0,
  },
  {
    week: 4,
    phase: "vegetation",
    phaseWeek: 4,
    growthStage: "Late Growth",
    floraMicro: 4.9,
    floraGro: 6.1,
    floraBloom: 3.4,
    caliMagic: 1.9,
    floralicious: 1.0,
  },
  // FLOWERING PHASE (12H Photoperiod) - Weeks 5-12
  {
    week: 5,
    phase: "flowering",
    phaseWeek: 1,
    growthStage: "Early Flowering",
    floraMicro: 3.8,
    floraGro: 4.7,
    floraBloom: 4.7,
    caliMagic: 1.9,
    floralicious: 1.0,
    koolBloom: 1.0,
  },
  {
    week: 6,
    phase: "flowering",
    phaseWeek: 2,
    growthStage: "Early Flowering",
    floraMicro: 3.8,
    floraGro: 4.7,
    floraBloom: 4.7,
    caliMagic: 1.9,
    floralicious: 1.0,
    koolBloom: 1.0,
  },
  {
    week: 7,
    phase: "flowering",
    phaseWeek: 3,
    growthStage: "Mid Flowering",
    floraMicro: 3.4,
    floraGro: 2.7,
    floraBloom: 6.1,
    caliMagic: 1.9,
    floralicious: 1.0,
    koolBloom: 1.8,
  },
  {
    week: 8,
    phase: "flowering",
    phaseWeek: 4,
    growthStage: "Mid Flowering",
    floraMicro: 3.4,
    floraGro: 2.7,
    floraBloom: 6.1,
    caliMagic: 1.9,
    floralicious: 1.0,
    koolBloom: 1.8,
  },
  {
    week: 9,
    phase: "flowering",
    phaseWeek: 5,
    growthStage: "Mid Flowering",
    floraMicro: 3.4,
    floraGro: 2.7,
    floraBloom: 6.1,
    caliMagic: 1.9,
    floralicious: 1.0,
    koolBloom: 1.8,
  },
  {
    week: 10,
    phase: "flowering",
    phaseWeek: 6,
    growthStage: "Late Flowering",
    floraMicro: 2.8,
    floraGro: 2.8,
    floraBloom: 3.0,
    caliMagic: 1.0,
    floralicious: 1.0,
    koolBloom: 1.0,
  },
  {
    week: 11,
    phase: "flowering",
    phaseWeek: 7,
    growthStage: "Late Flowering",
    floraMicro: 2.8,
    floraGro: 2.8,
    floraBloom: 3.0,
    caliMagic: 1.0,
    floralicious: 1.0,
    koolBloom: 1.0,
  },
  {
    week: 12,
    phase: "flowering",
    phaseWeek: 8,
    growthStage: "Ripen",
    floraMicro: 2.1,
    floraGro: 2.1,
    floraBloom: 3.2,
  },
  // FLUSH - Week 13
  {
    week: 13,
    phase: "flush",
    phaseWeek: 9,
    growthStage: "Flush",
    floraMicro: 0,
    floraGro: 0,
    floraBloom: 0,
  },
];

// Medium Feed Schedule (ml/gal)
const MEDIUM_FEED_SCHEDULE: WeekSchedule[] = [
  // VEGETATION PHASE (18H Photoperiod) - Weeks 1-4
  {
    week: 1,
    phase: "vegetation",
    phaseWeek: 1,
    growthStage: "Seedling/Clone",
    floraMicro: 1.9,
    floraGro: 1.9,
    floraBloom: 1.9,
    caliMagic: 1.9,
    floralicious: 1.0,
  },
  {
    week: 2,
    phase: "vegetation",
    phaseWeek: 2,
    growthStage: "Early Growth",
    floraMicro: 3.0,
    floraGro: 4.5,
    floraBloom: 2.3,
    caliMagic: 1.9,
    floralicious: 1.0,
  },
  {
    week: 3,
    phase: "vegetation",
    phaseWeek: 3,
    growthStage: "Early Growth",
    floraMicro: 4.5,
    floraGro: 6.1,
    floraBloom: 3.0,
    caliMagic: 1.9,
    floralicious: 1.0,
  },
  {
    week: 4,
    phase: "vegetation",
    phaseWeek: 4,
    growthStage: "Late Growth",
    floraMicro: 5.7,
    floraGro: 6.6,
    floraBloom: 4.2,
    caliMagic: 1.9,
    floralicious: 1.0,
  },
  // FLOWERING PHASE (12H Photoperiod) - Weeks 5-12
  {
    week: 5,
    phase: "flowering",
    phaseWeek: 1,
    growthStage: "Early Flowering",
    floraMicro: 4.2,
    floraGro: 5.3,
    floraBloom: 5.3,
    caliMagic: 1.9,
    floralicious: 1.0,
    koolBloom: 1.0,
  },
  {
    week: 6,
    phase: "flowering",
    phaseWeek: 2,
    growthStage: "Early Flowering",
    floraMicro: 4.2,
    floraGro: 5.3,
    floraBloom: 5.3,
    caliMagic: 1.9,
    floralicious: 1.0,
    koolBloom: 1.0,
  },
  {
    week: 7,
    phase: "flowering",
    phaseWeek: 3,
    growthStage: "Mid Flowering",
    floraMicro: 3.8,
    floraGro: 2.8,
    floraBloom: 6.8,
    caliMagic: 1.9,
    floralicious: 1.0,
    koolBloom: 2.0,
  },
  {
    week: 8,
    phase: "flowering",
    phaseWeek: 4,
    growthStage: "Mid Flowering",
    floraMicro: 3.8,
    floraGro: 2.8,
    floraBloom: 6.8,
    caliMagic: 1.9,
    floralicious: 1.0,
    koolBloom: 2.0,
  },
  {
    week: 9,
    phase: "flowering",
    phaseWeek: 5,
    growthStage: "Mid Flowering",
    floraMicro: 3.8,
    floraGro: 2.8,
    floraBloom: 6.8,
    caliMagic: 1.9,
    floralicious: 1.0,
    koolBloom: 2.0,
  },
  {
    week: 10,
    phase: "flowering",
    phaseWeek: 6,
    growthStage: "Late Flowering",
    floraMicro: 3.0,
    floraGro: 3.0,
    floraBloom: 3.4,
    caliMagic: 1.0,
    floralicious: 1.0,
    koolBloom: 1.0,
  },
  {
    week: 11,
    phase: "flowering",
    phaseWeek: 7,
    growthStage: "Late Flowering",
    floraMicro: 3.0,
    floraGro: 3.0,
    floraBloom: 3.4,
    caliMagic: 1.0,
    floralicious: 1.0,
    koolBloom: 1.0,
  },
  {
    week: 12,
    phase: "flowering",
    phaseWeek: 8,
    growthStage: "Ripen",
    floraMicro: 2.5,
    floraGro: 2.5,
    floraBloom: 3.6,
  },
  // FLUSH - Week 13
  {
    week: 13,
    phase: "flush",
    phaseWeek: 9,
    growthStage: "Flush",
    floraMicro: 0,
    floraGro: 0,
    floraBloom: 0,
  },
];

// Aggressive Feed Schedule (ml/gal from screenshot)
const AGGRESSIVE_FEED_SCHEDULE: WeekSchedule[] = [
  // VEGETATION PHASE (18H Photoperiod) - Weeks 1-4
  {
    week: 1,
    phase: "vegetation",
    phaseWeek: 1,
    growthStage: "Seedling/Clone",
    floraMicro: 2.5,
    floraGro: 2.5,
    floraBloom: 2.5,
    caliMagic: 2.0,
    floralicious: 1.0,
  },
  {
    week: 2,
    phase: "vegetation",
    phaseWeek: 2,
    growthStage: "Early Growth",
    floraMicro: 3.8,
    floraGro: 5.7,
    floraBloom: 2.8,
    caliMagic: 2.0,
    floralicious: 1.0,
  },
  {
    week: 3,
    phase: "vegetation",
    phaseWeek: 3,
    growthStage: "Early Growth",
    floraMicro: 5.7,
    floraGro: 7.6,
    floraBloom: 3.8,
    caliMagic: 2.0,
    floralicious: 1.0,
  },
  {
    week: 4,
    phase: "vegetation",
    phaseWeek: 4,
    growthStage: "Late Growth",
    floraMicro: 7.6,
    floraGro: 8.5,
    floraBloom: 4.7,
    caliMagic: 2.0,
    floralicious: 2.0,
  },
  // FLOWERING PHASE (12H Photoperiod) - Weeks 5-12
  {
    week: 5,
    phase: "flowering",
    phaseWeek: 1,
    growthStage: "Early Flowering",
    floraMicro: 5.7,
    floraGro: 6.6,
    floraBloom: 6.6,
    caliMagic: 2.0,
    floralicious: 2.0,
    koolBloom: 1.0,
  },
  {
    week: 6,
    phase: "flowering",
    phaseWeek: 2,
    growthStage: "Early Flowering",
    floraMicro: 5.7,
    floraGro: 6.6,
    floraBloom: 6.6,
    caliMagic: 2.0,
    floralicious: 2.0,
    koolBloom: 1.0,
  },
  {
    week: 7,
    phase: "flowering",
    phaseWeek: 3,
    growthStage: "Mid Flowering",
    floraMicro: 4.7,
    floraGro: 3.8,
    floraBloom: 8.5,
    caliMagic: 2.0,
    floralicious: 2.0,
    koolBloom: 2.0,
  },
  {
    week: 8,
    phase: "flowering",
    phaseWeek: 4,
    growthStage: "Mid Flowering",
    floraMicro: 4.7,
    floraGro: 3.8,
    floraBloom: 8.5,
    caliMagic: 2.0,
    floralicious: 2.0,
    koolBloom: 2.0,
  },
  {
    week: 9,
    phase: "flowering",
    phaseWeek: 5,
    growthStage: "Mid Flowering",
    floraMicro: 4.7,
    floraGro: 3.8,
    floraBloom: 8.5,
    caliMagic: 2.0,
    floralicious: 2.0,
    koolBloom: 2.0,
  },
  {
    week: 10,
    phase: "flowering",
    phaseWeek: 6,
    growthStage: "Late Flowering",
    floraMicro: 3.8,
    floraGro: 3.8,
    floraBloom: 4.2,
    caliMagic: 2.0,
    floralicious: 2.0,
    koolBloom: 1.0,
  },
  {
    week: 11,
    phase: "flowering",
    phaseWeek: 7,
    growthStage: "Late Flowering",
    floraMicro: 3.8,
    floraGro: 3.8,
    floraBloom: 4.2,
    caliMagic: 2.0,
    floralicious: 2.0,
    koolBloom: 1.0,
  },
  {
    week: 12,
    phase: "flowering",
    phaseWeek: 8,
    growthStage: "Ripen",
    floraMicro: 2.8,
    floraGro: 2.8,
    floraBloom: 4.5,
  },
  // FLUSH - Week 13
  {
    week: 13,
    phase: "flush",
    phaseWeek: 9,
    growthStage: "Flush",
    floraMicro: 0,
    floraGro: 0,
    floraBloom: 0,
  },
];

/**
 * Built-in feeding presets based on official GH Flora Series feed charts
 */
export const PRESETS: FeedingPreset[] = [
  {
    id: "light",
    name: "Light Feed",
    type: "light",
    schedule: LIGHT_FEED_SCHEDULE,
  },
  {
    id: "medium",
    name: "Medium Feed",
    type: "medium",
    schedule: MEDIUM_FEED_SCHEDULE,
  },
  {
    id: "aggressive",
    name: "Aggressive Feed",
    type: "aggressive",
    schedule: AGGRESSIVE_FEED_SCHEDULE,
  },
];

/**
 * Get a preset by its ID
 */
export const getPresetById = (id: string): FeedingPreset | undefined => {
  return PRESETS.find((p) => p.id === id);
};

/**
 * Default feeding schedule (for backwards compatibility)
 */
export const FEEDING_SCHEDULE = MEDIUM_FEED_SCHEDULE;

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
  schedule?: WeekSchedule[]
): WeekSchedule | undefined => {
  return (schedule || FEEDING_SCHEDULE).find((w) => w.week === weekNumber);
};
