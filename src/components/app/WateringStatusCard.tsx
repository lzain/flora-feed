import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Calendar } from "lucide-react";
import { convertFromMlPerGal, getUnitDescription } from "@/utils/unitConverter";
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

          {/* Display nutrients used */}
          <div className="pt-2 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Nutrients Used ({getUnitDescription(currentUnit)})
            </h4>
            <div className="space-y-1.5 text-sm">
              {wateringRecord.phase === "flush" ? (
                <p className="text-gray-600 italic">Plain water only</p>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-pink-700">FloraMicro:</span>
                    <span className="font-medium">
                      {convertFromMlPerGal(
                        wateringRecord.nutrients.floraMicro,
                        currentUnit
                      )}{" "}
                      ml
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">FloraGro:</span>
                    <span className="font-medium">
                      {convertFromMlPerGal(
                        wateringRecord.nutrients.floraGro,
                        currentUnit
                      )}{" "}
                      ml
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">FloraBloom:</span>
                    <span className="font-medium">
                      {convertFromMlPerGal(
                        wateringRecord.nutrients.floraBloom,
                        currentUnit
                      )}{" "}
                      ml
                    </span>
                  </div>
                  {wateringRecord.nutrients.caliMagic && (
                    <div className="flex justify-between">
                      <span className="text-orange-700">CALiMAGic:</span>
                      <span className="font-medium">
                        {convertFromMlPerGal(
                          wateringRecord.nutrients.caliMagic,
                          currentUnit
                        )}{" "}
                        ml
                      </span>
                    </div>
                  )}
                  {wateringRecord.nutrients.floralicious && (
                    <div className="flex justify-between">
                      <span className="text-yellow-700">Floralicious:</span>
                      <span className="font-medium">
                        {convertFromMlPerGal(
                          wateringRecord.nutrients.floralicious,
                          currentUnit
                        )}{" "}
                        ml
                      </span>
                    </div>
                  )}
                  {wateringRecord.nutrients.koolBloom && (
                    <div className="flex justify-between">
                      <span className="text-blue-700">KoolBloom:</span>
                      <span className="font-medium">
                        {convertFromMlPerGal(
                          wateringRecord.nutrients.koolBloom,
                          currentUnit
                        )}{" "}
                        ml
                      </span>
                    </div>
                  )}
                </>
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

