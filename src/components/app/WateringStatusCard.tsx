import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Calendar } from "lucide-react";
import { convertFromMlPer5L, getUnitDescription } from "@/utils/unitConverter";
import { NUTRIENTS } from "@/constants/app";
import type { WateringRecord, UnitType } from "@/types";

interface WateringStatusCardProps {
  wateringRecord: WateringRecord | undefined;
  currentUnit: UnitType;
  onMarkWatered: () => void;
  onUnmarkWatered: () => void;
}

/**
 * Displays watering status and allows marking/unmarking as watered
 */
export function WateringStatusCard({
  wateringRecord,
  currentUnit,
  onMarkWatered,
  onUnmarkWatered,
}: WateringStatusCardProps) {
  if (!wateringRecord) {
    return (
      <Card>
        <CardContent className="pt-0">
          <Button
            onClick={onMarkWatered}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Droplet className="w-4 h-4 mr-2" />
            Mark as Watered
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-600">
            <Droplet className="w-5 h-5 fill-current" />
            <span className="font-semibold">Watered</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(wateringRecord.timestamp).toLocaleString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="pt-2 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Nutrients Used ({getUnitDescription(currentUnit)})
            </h4>
            <div className="space-y-1.5 text-sm">
              {wateringRecord.phase === "flush" ? (
                <p className="text-gray-600 italic">Plain water only</p>
              ) : (
                NUTRIENTS.filter((nutrient) => {
                  const amount = wateringRecord.nutrients[nutrient.key];
                  return nutrient.group === "base" || !!amount;
                }).map((nutrient) => (
                  <div key={nutrient.key} className="flex justify-between">
                    <span className={nutrient.textColor}>
                      {nutrient.label}:
                    </span>
                    <span className="font-medium">
                      {convertFromMlPer5L(
                        wateringRecord.nutrients[nutrient.key] ?? 0,
                        currentUnit
                      )}{" "}
                      ml
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <Button
            onClick={onUnmarkWatered}
            variant="outline"
            className="w-full"
          >
            Mark as Not Watered
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
