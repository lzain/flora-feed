import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NutrientRow } from "./NutrientRow";
import { convertFromMlPer5L, getUnitDescription } from "@/utils/unitConverter";
import { NUTRIENTS } from "@/constants/app";
import type { WeekSchedule, UnitType } from "@/types";

interface NutrientCardProps {
  weekSchedule: WeekSchedule;
  currentUnit: UnitType;
}

/**
 * Displays the nutrient schedule for a given week
 */
export function NutrientCard({ weekSchedule, currentUnit }: NutrientCardProps) {
  const baseNutrients = NUTRIENTS.filter((n) => n.group === "base");
  const supplements = NUTRIENTS.filter((n) => n.group === "supplement").filter(
    (n) => weekSchedule[n.key]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrients ({getUnitDescription(currentUnit)})</CardTitle>
        <CardDescription>
          {weekSchedule.phase === "flush"
            ? "Use plain water only - no nutrients"
            : "Add these amounts to your water"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {weekSchedule.phase === "flush" ? (
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-blue-600">💧 Flush Week</p>
            <p className="text-sm text-gray-600 mt-2">Use plain water only</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">
                Base Nutrients
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {baseNutrients.map((nutrient) => (
                  <NutrientRow
                    key={nutrient.key}
                    name={nutrient.label}
                    amount={convertFromMlPer5L(
                      weekSchedule[nutrient.key] ?? 0,
                      currentUnit
                    )}
                    color={nutrient.color}
                  />
                ))}
              </div>
            </div>

            {supplements.length > 0 && (
              <div className="space-y-2 pt-2 border-t">
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Supplements
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {supplements.map((nutrient) => (
                    <NutrientRow
                      key={nutrient.key}
                      name={nutrient.label}
                      amount={convertFromMlPer5L(
                        weekSchedule[nutrient.key] ?? 0,
                        currentUnit
                      )}
                      color={nutrient.color}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
