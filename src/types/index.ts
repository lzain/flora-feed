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
  floraMicro: number;
  floraGro: number;
  floraBloom: number;
  caliMagic?: number;
  floralicious?: number;
  koolBloom?: number;
}

export type PresetType = "light" | "medium" | "aggressive";

export interface FeedingPreset {
  id: string;
  name: string;
  type: PresetType | "custom";
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

// ============================================
// Component Props Types
// ============================================

export type View = "main" | "settings";

export interface NutrientRowProps {
  name: string;
  amount: number;
  color: string;
}
