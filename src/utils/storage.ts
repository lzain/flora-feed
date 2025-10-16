/**
 * Local storage utilities for managing feeding schedule data
 *
 * This module provides functions to manage:
 * - Schedule data (start date)
 * - Watering records
 * - Custom feeding presets
 * - App settings (unit, selected preset)
 *
 * All data is stored in browser localStorage for offline access
 */

import { PRESETS as FEEDING_PRESETS } from "@/data/feedingSchedule";
import type { FeedingPreset, WeekSchedule } from "@/types";

// Re-export PRESETS for convenience
export { PRESETS } from "@/data/feedingSchedule";

export interface ScheduleData {
  startDate: string; // ISO date string
}

export interface NutrientValues {
  floraMicro: number;
  floraGro: number;
  floraBloom: number;
  caliMagic?: number;
  floralicious?: number;
  koolBloom?: number;
}

export interface WateringRecord {
  week: number;
  timestamp: string; // ISO date string
  nutrients: NutrientValues;
  phase: "vegetation" | "flowering" | "flush";
  growthStage: string;
}

export type UnitType = "ml/gal" | "ml/5L" | "ml/L";

export interface AppSettings {
  selectedPresetId: string;
  unit: UnitType;
}

const SCHEDULE_KEY = "gh-flora-schedule";
const WATERING_KEY = "gh-flora-watering";
const CUSTOM_PRESETS_KEY = "gh-flora-custom-presets";
const SETTINGS_KEY = "gh-flora-settings";

// ============================================
// Schedule Management Functions
// ============================================

/**
 * Save the feeding schedule start date
 */
export const saveSchedule = (startDate: Date): void => {
  const data: ScheduleData = {
    startDate: startDate.toISOString(),
  };
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(data));
};

/**
 * Get the saved feeding schedule
 */
export const getSchedule = (): ScheduleData | null => {
  const data = localStorage.getItem(SCHEDULE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

/**
 * Clear the schedule and all watering records
 */
export const clearSchedule = (): void => {
  localStorage.removeItem(SCHEDULE_KEY);
  localStorage.removeItem(WATERING_KEY);
};

// ============================================
// Watering Record Functions
// ============================================

/**
 * Get all watering records
 */
export const getWateringRecords = (): WateringRecord[] => {
  const data = localStorage.getItem(WATERING_KEY);
  if (!data) return [];
  try {
    const records = JSON.parse(data);
    // Migrate old records that don't have nutrient data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return records.map((record: any) => {
      if (!record.nutrients) {
        return {
          ...record,
          nutrients: {
            floraMicro: 0,
            floraGro: 0,
            floraBloom: 0,
          },
          phase: record.phase || "vegetation",
          growthStage: record.growthStage || "Unknown",
        };
      }
      return record;
    });
  } catch {
    return [];
  }
};

/**
 * Add a watering record for a specific week
 */
export const addWateringRecord = (
  week: number,
  nutrients: NutrientValues,
  phase: "vegetation" | "flowering" | "flush",
  growthStage: string
): void => {
  const records = getWateringRecords();
  const newRecord: WateringRecord = {
    week,
    timestamp: new Date().toISOString(),
    nutrients,
    phase,
    growthStage,
  };

  // Remove any existing record for this week
  const filteredRecords = records.filter((r) => r.week !== week);
  filteredRecords.push(newRecord);

  localStorage.setItem(WATERING_KEY, JSON.stringify(filteredRecords));
};

/**
 * Get watering record for a specific week
 */
export const getWateringRecord = (week: number): WateringRecord | undefined => {
  const records = getWateringRecords();
  return records.find((r) => r.week === week);
};

/**
 * Remove watering record for a specific week
 */
export const removeWateringRecord = (week: number): void => {
  const records = getWateringRecords();
  const filteredRecords = records.filter((r) => r.week !== week);
  localStorage.setItem(WATERING_KEY, JSON.stringify(filteredRecords));
};

/**
 * Calculate current week number based on start date
 */
export const getCurrentWeek = (startDate: Date): number => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.ceil(diffDays / 7);
  return Math.max(1, Math.min(weekNumber, 13)); // Clamp between 1 and 13
};

// ============================================
// Custom Preset Functions
// ============================================

/**
 * Get all custom feeding presets
 */
export const getCustomPresets = (): FeedingPreset[] => {
  const data = localStorage.getItem(CUSTOM_PRESETS_KEY);
  if (!data) return [];
  try {
    const presets = JSON.parse(data) as FeedingPreset[];
    // Migrate old phase names to new ones
    const migratedPresets = presets.map((preset) => ({
      ...preset,
      schedule: preset.schedule.map((week: WeekSchedule) => {
        let phase = week.phase;
        // Migrate "grow" to "vegetation"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (phase === ("grow" as any)) phase = "vegetation";
        // Migrate "bloom" to "flowering"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (phase === ("bloom" as any)) phase = "flowering";
        return {
          ...week,
          phase,
        };
      }),
    }));
    return migratedPresets;
  } catch {
    return [];
  }
};

/**
 * Save or update a custom preset
 */
export const saveCustomPreset = (preset: FeedingPreset): void => {
  const presets = getCustomPresets();
  const existingIndex = presets.findIndex((p) => p.id === preset.id);

  if (existingIndex >= 0) {
    presets[existingIndex] = preset;
  } else {
    presets.push(preset);
  }

  localStorage.setItem(CUSTOM_PRESETS_KEY, JSON.stringify(presets));
};

/**
 * Delete a custom preset by ID
 */
export const deleteCustomPreset = (id: string): void => {
  const presets = getCustomPresets();
  const filtered = presets.filter((p) => p.id !== id);
  localStorage.setItem(CUSTOM_PRESETS_KEY, JSON.stringify(filtered));
};

/**
 * Import custom presets from JSON (merges with existing)
 */
export const importCustomPresets = (presets: FeedingPreset[]): void => {
  const existing = getCustomPresets();
  const merged = [...existing];

  presets.forEach((preset) => {
    const existingIndex = merged.findIndex((p) => p.id === preset.id);
    if (existingIndex >= 0) {
      // Replace existing
      merged[existingIndex] = preset;
    } else {
      merged.push(preset);
    }
  });

  localStorage.setItem(CUSTOM_PRESETS_KEY, JSON.stringify(merged));
};

// ============================================
// Settings Functions
// ============================================

/**
 * Get app settings (unit, selected preset)
 */
export const getSettings = (): AppSettings => {
  const data = localStorage.getItem(SETTINGS_KEY);
  if (!data) {
    return {
      selectedPresetId: FEEDING_PRESETS[1].id, // Default to medium
      unit: "ml/gal",
    };
  }
  try {
    return JSON.parse(data);
  } catch {
    return {
      selectedPresetId: FEEDING_PRESETS[1].id,
      unit: "ml/gal",
    };
  }
};

/**
 * Save app settings
 */
export const saveSettings = (settings: AppSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

/**
 * Update the selected preset ID
 */
export const updateSelectedPreset = (presetId: string): void => {
  const settings = getSettings();
  settings.selectedPresetId = presetId;
  saveSettings(settings);
};

/**
 * Update the measurement unit
 */
export const updateUnit = (unit: UnitType): void => {
  const settings = getSettings();
  settings.unit = unit;
  saveSettings(settings);
};
