import { useState, useEffect } from "react";
import { getSettings, getCustomPresets, PRESETS } from "@/utils/storage";
import { DEFAULT_UNIT } from "@/constants/app";
import type { FeedingPreset, UnitType } from "@/types";

/**
 * Custom hook for managing app settings and presets
 */
export function useSettings() {
  const [currentPreset, setCurrentPreset] = useState<FeedingPreset | null>(null);
  const [currentUnit, setCurrentUnit] = useState<UnitType>(DEFAULT_UNIT);

  const loadSettings = () => {
    const settings = getSettings();
    const allPresets = [...PRESETS, ...getCustomPresets()];
    const preset =
      allPresets.find((p) => p.id === settings.selectedPresetId) || PRESETS[0];
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

