import { useState, useEffect } from "react";
import {
  addWateringRecord,
  getWateringRecord,
  removeWateringRecord,
} from "@/utils/storage";
import type { NutrientValues, WateringRecord } from "@/types";

/**
 * Custom hook for managing watering records
 */
export function useWatering(selectedWeek: number) {
  const [wateringRefresh, setWateringRefresh] = useState(0);
  const [wateringRecord, setWateringRecord] = useState<WateringRecord | undefined>(
    undefined
  );

  useEffect(() => {
    setWateringRecord(getWateringRecord(selectedWeek));
  }, [selectedWeek, wateringRefresh]);

  const markAsWatered = (
    week: number,
    nutrients: NutrientValues,
    phase: "vegetation" | "flowering" | "flush",
    growthStage: string
  ) => {
    addWateringRecord(week, nutrients, phase, growthStage);
    setWateringRefresh((prev) => prev + 1);
  };

  const unmarkAsWatered = (week: number) => {
    removeWateringRecord(week);
    setWateringRefresh((prev) => prev + 1);
  };

  return {
    wateringRecord,
    markAsWatered,
    unmarkAsWatered,
  };
}

