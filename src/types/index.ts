/**
 * Central type definitions for Flora Feed
 */

// ============================================
// Feeding Schedule Types
// ============================================

export interface WeekSchedule {
  week: number;
  phase: "vegetation" | "flowering" | "flush";
  phaseWeek: number;
  growthStage: string;
  ppm: string;
  floraMicro: number;
  floraGro: number;
  floraBloom: number;
  calmag?: number;
  armorSi?: number;
  diamondNectar?: number;
}

export type PresetType = "standard" | "custom";

export interface FeedingPreset {
  id: string;
  name: string;
  type: PresetType;
  schedule: WeekSchedule[];
}

// ============================================
// Storage Types
// ============================================

export interface ScheduleData {
  startDate: string; // ISO date string
}

export interface NutrientValues {
  floraMicro: number;
  floraGro: number;
  floraBloom: number;
  calmag?: number;
  armorSi?: number;
  diamondNectar?: number;
}

export interface WateringRecord {
  week: number;
  timestamp: string; // ISO date string
  nutrients: NutrientValues;
  phase: "vegetation" | "flowering" | "flush";
  growthStage: string;
}

export type UnitType = "ml/gal" | "ml/5L" | "ml/L" | "ml/1.5L";

export interface AppSettings {
  selectedPresetId: string;
  unit: UnitType;
}

// ============================================
// Component Props Types
// ============================================

export type View = "main" | "settings";

export interface NutrientRowProps {
  name: string;
  amount: number;
  color: string;
}
