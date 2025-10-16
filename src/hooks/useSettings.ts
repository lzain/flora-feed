import { useState, useEffect } from "react";
import { getSettings, getCustomPresets, PRESETS } from "@/utils/storage";
import type { FeedingPreset, UnitType } from "@/types";

/**
 * Custom hook for managing app settings and presets
 */
export function useSettings() {
  const [currentPreset, setCurrentPreset] = useState<FeedingPreset | null>(null);
  const [currentUnit, setCurrentUnit] = useState<UnitType>("ml/gal");

  const loadSettings = () => {
    const settings = getSettings();
    const allPresets = [...PRESETS, ...getCustomPresets()];
    const preset =
      allPresets.find((p) => p.id === settings.selectedPresetId) || PRESETS[1];
    setCurrentPreset(preset);
    setCurrentUnit(settings.unit);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    currentPreset,
    currentUnit,
    loadSettings,
  };
}

