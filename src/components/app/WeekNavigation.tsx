import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WeekSchedule } from "@/types";

interface WeekNavigationProps {
  weekSchedule: WeekSchedule;
  selectedWeek: number;
  currentWeek: number;
  totalWeeks: number;
  weekDateRange: { start: Date; end: Date } | null;
  onNavigate: (direction: number) => void;
}

/**
 * Week navigation component with date range and phase information
 */
export function WeekNavigation({
  weekSchedule,
  selectedWeek,
  currentWeek,
  totalWeeks,
  weekDateRange,
  onNavigate,
}: WeekNavigationProps) {
  return (
    <Card className="gap-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate(-1)}
            disabled={selectedWeek === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="text-center">
            <CardTitle className="text-3xl font-bold">
              Week {weekSchedule.week}
              {selectedWeek === currentWeek && (
                <span className="ml-2 text-sm font-normal text-green-600">
                  (Current)
                </span>
              )}
            </CardTitle>
            <CardDescription className="mt-1">
              {weekDateRange && (
                <div className="text-sm font-medium text-gray-700">
                  {weekDateRange.start.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {weekDateRange.end.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              )}
              {weekSchedule.phase !== "flush" && (
                <div className="text-sm font-medium text-gray-600">
                  {weekSchedule.phase === "vegetation"
                    ? "Vegetation"
                    : "Flowering"}{" "}
                  Week {weekSchedule.phaseWeek}
                </div>
              )}
              <div className="mt-0.5">{weekSchedule.growthStage}</div>
            </CardDescription>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate(1)}
            disabled={selectedWeek === totalWeeks}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-0 flex justify-center">
        <div
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            weekSchedule.phase === "vegetation"
              ? "bg-green-100 text-green-700"
              : weekSchedule.phase === "flowering"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {weekSchedule.phase === "vegetation"
            ? "🌱 VEGETATION Phase"
            : weekSchedule.phase === "flowering"
            ? "🌸 FLOWERING Phase"
            : "💧 FLUSH"}
        </div>
      </CardContent>
    </Card>
  );
}

