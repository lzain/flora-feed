import type { UnitType } from "./storage";

// Conversion factors
const ML_PER_GALLON = 3785.41; // 1 US gallon = 3785.41 ml
const ML_PER_5L = 5000; // 5 liters = 5000 ml
const ML_PER_LITER = 1000; // 1 liter = 1000 ml
const ML_PER_1_5L = 1500; // 1.5 liters = 1500 ml

/**
 * Converts a value from ml/5L (base unit stored in presets) to the target unit
 * @param mlPer5L Value in ml per 5 liters
 * @param targetUnit Target unit to convert to
 * @returns Converted value rounded to 2 decimal places
 */
export function convertFromMlPer5L(
  mlPer5L: number,
  targetUnit: UnitType
): number {
  if (targetUnit === "ml/5L") {
    return Number(mlPer5L.toFixed(2));
  }

  if (targetUnit === "ml/gal") {
    return Number((mlPer5L * (ML_PER_GALLON / ML_PER_5L)).toFixed(2));
  }

  if (targetUnit === "ml/L") {
    return Number((mlPer5L * (ML_PER_LITER / ML_PER_5L)).toFixed(2));
  }

  if (targetUnit === "ml/1.5L") {
    return Number((mlPer5L * (ML_PER_1_5L / ML_PER_5L)).toFixed(2));
  }

  return mlPer5L;
}

/**
 * Gets the unit label for display
 */
export function getUnitLabel(unit: UnitType): string {
  switch (unit) {
    case "ml/gal":
      return "ml";
    case "ml/5L":
      return "ml";
    case "ml/L":
      return "ml";
    case "ml/1.5L":
      return "ml";
    default:
      return "ml";
  }
}

/**
 * Gets the full unit description
 */
export function getUnitDescription(unit: UnitType): string {
  switch (unit) {
    case "ml/gal":
      return "per Gallon";
    case "ml/5L":
      return "per 5 Liters";
    case "ml/L":
      return "per Liter";
    case "ml/1.5L":
      return "per 1.5 Liters";
    default:
      return "";
  }
}
