import type { UnitType } from "./storage";

// Conversion factors
const ML_PER_GALLON = 3785.41; // 1 US gallon = 3785.41 ml
const ML_PER_5L = 5000; // 5 liters = 5000 ml
const ML_PER_LITER = 1000; // 1 liter = 1000 ml

/**
 * Converts a value from ml/gal (base unit) to the target unit
 * @param mlPerGal Value in ml per gallon (base unit stored in presets)
 * @param targetUnit Target unit to convert to
 * @returns Converted value rounded to 2 decimal places
 */
export function convertFromMlPerGal(
  mlPerGal: number,
  targetUnit: UnitType
): number {
  if (targetUnit === "ml/gal") {
    return Number(mlPerGal.toFixed(2));
  }

  if (targetUnit === "ml/5L") {
    // ml/gal × (5L / 1gal) = ml/gal × (5000ml / 3785.41ml)
    return Number((mlPerGal * (ML_PER_5L / ML_PER_GALLON)).toFixed(2));
  }

  if (targetUnit === "ml/L") {
    // ml/gal × (1L / 1gal) = ml/gal × (1000ml / 3785.41ml)
    return Number((mlPerGal * (ML_PER_LITER / ML_PER_GALLON)).toFixed(2));
  }

  return mlPerGal;
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
    default:
      return "";
  }
}
