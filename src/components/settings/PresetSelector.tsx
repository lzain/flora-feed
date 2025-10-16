import { Info } from "lucide-react";
import type { FeedingPreset } from "@/types";

interface PresetSelectorProps {
  presets: FeedingPreset[];
  customPresets: FeedingPreset[];
  selectedPresetId: string;
  onSelect: (presetId: string) => void;
}

/**
 * Component for selecting feeding presets
 */
export function PresetSelector({
  presets,
  customPresets,
  selectedPresetId,
  onSelect,
}: PresetSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Choose a feeding schedule for your plants
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mt-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Built-in Presets
          </h3>
          <a
            href="https://generalhydroponics.com/resources/flora-series-feedcharts/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="View GH Flora Series Feed Charts"
          >
            <Info className="w-4 h-4" />
          </a>
        </div>
        {presets.map((preset) => (
          <div
            key={preset.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedPresetId === preset.id
                ? "border-green-500 bg-green-50 shadow-sm"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => onSelect(preset.id)}
          >
            <div className="font-semibold text-lg">{preset.name}</div>
            <div className="text-sm text-gray-600 mt-1">
              {preset.type === "light" &&
                "Lower nutrient concentration for sensitive plants"}
              {preset.type === "medium" &&
                "Balanced nutrient levels for most plants"}
              {preset.type === "aggressive" &&
                "Higher nutrient concentration for vigorous growth"}
            </div>
          </div>
        ))}
      </div>

      {customPresets.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 mt-6">
            Your Custom Presets
          </h3>
          {customPresets.map((preset) => (
            <div
              key={preset.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedPresetId === preset.id
                  ? "border-green-500 bg-green-50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => onSelect(preset.id)}
            >
              <div className="font-semibold text-lg">{preset.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                {preset.schedule.length} weeks • Custom preset
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

