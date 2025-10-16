import { Button } from "@/components/ui/button";
import { Download, Upload, Plus, Trash2 } from "lucide-react";
import type { FeedingPreset } from "@/types";

interface CustomPresetManagerProps {
  customPresets: FeedingPreset[];
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onCreate: () => void;
  onEdit: (preset: FeedingPreset) => void;
  onDelete: (id: string) => void;
}

/**
 * Component for managing custom presets (import/export/create/edit/delete)
 */
export function CustomPresetManager({
  customPresets,
  onImport,
  onExport,
  onCreate,
  onEdit,
  onDelete,
}: CustomPresetManagerProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4 mb-4">
        <p className="text-sm text-muted-foreground">
          Create and manage your own custom feeding schedules
        </p>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-2">
          <div className="flex gap-2 md:contents">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 md:flex-none"
              onClick={() => document.getElementById("import-file")?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <input
              id="import-file"
              type="file"
              accept=".json"
              className="hidden"
              onChange={onImport}
            />
            <Button
              variant="outline"
              size="sm"
              className="flex-1 md:flex-none"
              onClick={onExport}
              disabled={customPresets.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <Button size="sm" className="w-full md:w-auto" onClick={onCreate}>
            <Plus className="w-4 h-4 mr-2" />
            New Preset
          </Button>
        </div>
      </div>

      {customPresets.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
          <p className="mb-2">No custom presets yet.</p>
          <p className="text-sm">Click "New Preset" to create one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {customPresets.map((preset) => (
            <div
              key={preset.id}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <div className="font-semibold text-lg">{preset.name}</div>
                  <div className="text-sm text-gray-600">
                    {preset.schedule.length} weeks
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(preset)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(preset.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

