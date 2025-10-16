import type { NutrientRowProps } from "@/types";

/**
 * Displays a single nutrient with its amount and color styling
 */
export function NutrientRow({ name, amount, color }: NutrientRowProps) {
  return (
    <div
      className={`flex justify-between items-center p-3 rounded-lg border ${color}`}
    >
      <span className="font-medium">{name}</span>
      <span className="text-lg font-bold">{amount} ml</span>
    </div>
  );
}

