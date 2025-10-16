import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NutrientRow } from "./NutrientRow";
import { convertFromMlPerGal, getUnitDescription } from "@/utils/unitConverter";
import type { WeekSchedule, UnitType } from "@/types";

interface NutrientCardProps {
  weekSchedule: WeekSchedule;
  currentUnit: UnitType;
}

/**
 * Displays the nutrient schedule for a given week
 */
export function NutrientCard({ weekSchedule, currentUnit }: NutrientCardProps) {
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
            {/* Base Nutrients */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">
                Base Nutrients
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <NutrientRow
                  name="FloraMicro"
                  amount={convertFromMlPerGal(
                    weekSchedule.floraMicro,
                    currentUnit
                  )}
                  color="bg-pink-100 text-pink-700 border-pink-200"
                />
                <NutrientRow
                  name="FloraGro"
                  amount={convertFromMlPerGal(weekSchedule.floraGro, currentUnit)}
                  color="bg-green-100 text-green-700 border-green-200"
                />
                <NutrientRow
                  name="FloraBloom"
                  amount={convertFromMlPerGal(
                    weekSchedule.floraBloom,
                    currentUnit
                  )}
                  color="bg-red-100 text-red-700 border-red-200"
                />
              </div>
            </div>

            {/* Optional Nutrients */}
            {(weekSchedule.caliMagic ||
              weekSchedule.floralicious ||
              weekSchedule.koolBloom) && (
              <div className="space-y-2 pt-2 border-t">
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Supplements
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {weekSchedule.caliMagic && (
                    <NutrientRow
                      name="CALiMAGic"
                      amount={convertFromMlPerGal(
                        weekSchedule.caliMagic,
                        currentUnit
                      )}
                      color="bg-orange-100 text-orange-700 border-orange-200"
                    />
                  )}
                  {weekSchedule.floralicious && (
                    <NutrientRow
                      name="Floralicious Plus"
                      amount={convertFromMlPerGal(
                        weekSchedule.floralicious,
                        currentUnit
                      )}
                      color="bg-yellow-100 text-yellow-700 border-yellow-200"
                    />
                  )}
                  {weekSchedule.koolBloom && (
                    <NutrientRow
                      name="Liquid KoolBloom"
                      amount={convertFromMlPerGal(
                        weekSchedule.koolBloom,
                        currentUnit
                      )}
                      color="bg-blue-100 text-blue-700 border-blue-200"
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

