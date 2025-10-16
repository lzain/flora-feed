import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Sprout } from "lucide-react";
import type { FeedingPreset, WeekSchedule } from "@/types";

interface CustomPresetEditorProps {
  preset: FeedingPreset;
  onSave: (preset: FeedingPreset) => void;
  onClose: () => void;
}

/**
 * Editor for creating and modifying custom feeding presets
 */
export function CustomPresetEditor({
  preset,
  onSave,
  onClose,
}: CustomPresetEditorProps) {
  const [editedPreset, setEditedPreset] = useState<FeedingPreset>(preset);

  const handleNameChange = (name: string) => {
    setEditedPreset({ ...editedPreset, name });
  };

  const handleNutrientChange = (
    weekIndex: number,
    nutrient: keyof WeekSchedule,
    value: string
  ) => {
    const newSchedule = [...editedPreset.schedule];
    const numValue = parseFloat(value) || 0;
    newSchedule[weekIndex] = {
      ...newSchedule[weekIndex],
      [nutrient]: numValue,
    };
    setEditedPreset({ ...editedPreset, schedule: newSchedule });
  };

  const handleStageChange = (weekIndex: number, growthStage: string) => {
    const newSchedule = [...editedPreset.schedule];
    newSchedule[weekIndex] = {
      ...newSchedule[weekIndex],
      growthStage,
    };
    setEditedPreset({ ...editedPreset, schedule: newSchedule });
  };

  const handlePhaseChange = (
    weekIndex: number,
    phase: "vegetation" | "flowering" | "flush"
  ) => {
    const newSchedule = [...editedPreset.schedule];
    newSchedule[weekIndex] = {
      ...newSchedule[weekIndex],
      phase,
    };

    // If changing to flowering, update any subsequent vegetation weeks to flowering
    if (phase === "flowering") {
      for (let i = weekIndex + 1; i < newSchedule.length; i++) {
        if (newSchedule[i].phase === "vegetation") {
          newSchedule[i] = {
            ...newSchedule[i],
            phase: "flowering",
          };
        }
      }
    }

    setEditedPreset({ ...editedPreset, schedule: newSchedule });
  };

  const canSelectVegetation = (weekIndex: number) => {
    // Check if any previous week is flowering
    for (let i = 0; i < weekIndex; i++) {
      if (editedPreset.schedule[i].phase === "flowering") {
        return false;
      }
    }
    return true;
  };

  const handleAddWeek = () => {
    const lastWeek = editedPreset.schedule[editedPreset.schedule.length - 1];
    const newWeek: WeekSchedule = {
      week: editedPreset.schedule.length + 1,
      phase: lastWeek.phase,
      phaseWeek: lastWeek.phaseWeek + 1,
      growthStage: "New Stage",
      floraMicro: 0,
      floraGro: 0,
      floraBloom: 0,
    };
    setEditedPreset({
      ...editedPreset,
      schedule: [...editedPreset.schedule, newWeek],
    });
  };

  const handleRemoveWeek = (weekIndex: number) => {
    if (editedPreset.schedule.length <= 1) {
      alert("Cannot remove the last week!");
      return;
    }
    const newSchedule = editedPreset.schedule.filter((_, i) => i !== weekIndex);
    // Renumber weeks
    const renumberedSchedule = newSchedule.map((week, index) => ({
      ...week,
      week: index + 1,
    }));
    setEditedPreset({ ...editedPreset, schedule: renumberedSchedule });
  };

  const nutrients = [
    { key: "floraMicro", label: "FloraMicro", color: "text-pink-700" },
    { key: "floraGro", label: "FloraGro", color: "text-green-700" },
    { key: "floraBloom", label: "FloraBloom", color: "text-red-700" },
    { key: "caliMagic", label: "CALiMAGic", color: "text-orange-700" },
    { key: "floralicious", label: "Floralicious", color: "text-yellow-700" },
    { key: "koolBloom", label: "KoolBloom", color: "text-blue-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onClose}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Custom Preset
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-col sm:flex-row">
              <div>
                <CardTitle className="text-center sm:text-left sm:mb-0 mb-3">
                  Custom Feeding Schedule
                </CardTitle>
                <CardDescription className="text-center sm:text-left">
                  Customize nutrient values for each week
                  <br className="sm:hidden" /> (values in ml/gal)
                </CardDescription>
              </div>
              <div className="gap-2 sm:flex hidden">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={() => onSave(editedPreset)}>
                  Save Preset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="preset-name" className="mb-3">
                Preset Name
              </Label>
              <Input
                id="preset-name"
                value={editedPreset.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter preset name"
              />
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left sticky left-0 bg-gray-100 z-10">
                        Week
                      </th>
                      <th className="p-2 text-left min-w-[120px]">Phase</th>
                      <th className="p-2 text-left min-w-[150px]">Stage</th>
                      {nutrients.map((nutrient) => (
                        <th
                          key={nutrient.key}
                          className={`p-2 text-left ${nutrient.color}`}
                        >
                          {nutrient.label}
                        </th>
                      ))}
                      <th className="p-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editedPreset.schedule.map((week, index) => (
                      <tr key={week.week} className="border-t">
                        <td className="p-2 font-semibold sticky left-0 bg-white z-10">
                          {week.week}
                        </td>
                        <td className="p-2">
                          <Select
                            value={week.phase}
                            onValueChange={(
                              value: "vegetation" | "flowering" | "flush"
                            ) => handlePhaseChange(index, value)}
                          >
                            <SelectTrigger className="min-w-[110px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value="vegetation"
                                disabled={!canSelectVegetation(index)}
                              >
                                Vegetation
                              </SelectItem>
                              <SelectItem value="flowering">
                                Flowering
                              </SelectItem>
                              <SelectItem value="flush">Flush</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-2">
                          <Input
                            type="text"
                            value={week.growthStage}
                            onChange={(e) =>
                              handleStageChange(index, e.target.value)
                            }
                            className="min-w-[140px]"
                            placeholder="Stage name"
                          />
                        </td>
                        {nutrients.map((nutrient) => (
                          <td key={nutrient.key} className="p-2">
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              value={
                                (week[
                                  nutrient.key as keyof WeekSchedule
                                ] as number) || ""
                              }
                              onChange={(e) =>
                                handleNutrientChange(
                                  index,
                                  nutrient.key as keyof WeekSchedule,
                                  e.target.value
                                )
                              }
                              className="w-20"
                              disabled={week.phase === "flush"}
                            />
                          </td>
                        ))}
                        <td className="p-2 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveWeek(index)}
                            disabled={editedPreset.schedule.length <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                className="sm:w-auto w-full"
                onClick={handleAddWeek}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Week
              </Button>
            </div>
            <div className="flex gap-2 sm:hidden w-full">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 sm:flex-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={() => onSave(editedPreset)}
                className="flex-1 sm:flex-auto"
              >
                Save Preset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

