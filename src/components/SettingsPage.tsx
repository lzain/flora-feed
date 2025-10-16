import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  getSettings,
  saveSettings,
  getCustomPresets,
  saveCustomPreset,
  deleteCustomPreset,
  importCustomPresets,
  clearSchedule,
  PRESETS,
} from "@/utils/storage";
import {
  CustomPresetEditor,
  PresetSelector,
  CustomPresetManager,
} from "@/components/settings";
import { ArrowLeft, Sprout } from "lucide-react";
import type { UnitType, FeedingPreset } from "@/types";

interface SettingsPageProps {
  onBack: () => void;
  onSettingsChange: () => void;
}

/**
 * Main settings page with preset selection, custom preset management, and general settings
 */
export function SettingsPage({ onBack, onSettingsChange }: SettingsPageProps) {
  const [selectedPreset, setSelectedPreset] = useState("medium");
  const [selectedUnit, setSelectedUnit] = useState<UnitType>("ml/gal");
  const [customPresets, setCustomPresets] = useState<FeedingPreset[]>([]);
  const [editingPreset, setEditingPreset] = useState<FeedingPreset | null>(null);

  useEffect(() => {
    const settings = getSettings();
    setSelectedPreset(settings.selectedPresetId);
    setSelectedUnit(settings.unit);
    setCustomPresets(getCustomPresets());
  }, []);

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const settings = getSettings();
    settings.selectedPresetId = presetId;
    saveSettings(settings);
    onSettingsChange();
  };

  const handleUnitChange = (unit: UnitType) => {
    setSelectedUnit(unit);
    const settings = getSettings();
    settings.unit = unit;
    saveSettings(settings);
    onSettingsChange();
  };

  const handleResetSchedule = () => {
    if (
      confirm(
        "Are you sure you want to reset the schedule? This will clear all data including watering records."
      )
    ) {
      clearSchedule();
      onSettingsChange();
      onBack();
      window.location.reload();
    }
  };

  const handleCreateCustomPreset = () => {
    const newPreset: FeedingPreset = {
      id: `custom-${Date.now()}`,
      name: "New Custom Preset",
      type: "custom",
      schedule: PRESETS[1].schedule.map((week) => ({ ...week })), // Clone medium schedule as template
    };
    setEditingPreset(newPreset);
  };

  const handleSaveCustomPreset = (preset: FeedingPreset) => {
    saveCustomPreset(preset);
    setCustomPresets(getCustomPresets());
    setEditingPreset(null);
    onSettingsChange();
  };

  const handleDeleteCustomPreset = (id: string) => {
    if (confirm("Are you sure you want to delete this preset?")) {
      deleteCustomPreset(id);
      setCustomPresets(getCustomPresets());
      if (selectedPreset === id) {
        handlePresetChange("medium");
      }
    }
  };

  const handleExportPresets = () => {
    const dataStr = JSON.stringify(customPresets, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gh-flora-custom-presets.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportPresets = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const presets = JSON.parse(
          e.target?.result as string
        ) as FeedingPreset[];
        importCustomPresets(presets);
        setCustomPresets(getCustomPresets());
        alert("Presets imported successfully!");
      } catch {
        alert("Error importing presets. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  // Show preset editor if editing
  if (editingPreset) {
    return (
      <CustomPresetEditor
        preset={editingPreset}
        onSave={handleSaveCustomPreset}
        onClose={() => setEditingPreset(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>
        </div>

        <Card>
          <CardContent>
            <Tabs defaultValue="presets" className="w-full gap-6">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
                <TabsTrigger value="presets">Presets</TabsTrigger>
                <TabsTrigger value="custom">Custom Presets</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
              </TabsList>

              {/* Presets Tab */}
              <TabsContent value="presets" className="space-y-4">
                <PresetSelector
                  presets={PRESETS}
                  customPresets={customPresets}
                  selectedPresetId={selectedPreset}
                  onSelect={handlePresetChange}
                />
              </TabsContent>

              {/* Custom Presets Tab */}
              <TabsContent value="custom" className="space-y-4">
                <CustomPresetManager
                  customPresets={customPresets}
                  onImport={handleImportPresets}
                  onExport={handleExportPresets}
                  onCreate={handleCreateCustomPreset}
                  onEdit={setEditingPreset}
                  onDelete={handleDeleteCustomPreset}
                />
              </TabsContent>

              {/* General Settings Tab */}
              <TabsContent value="general" className="space-y-6">
                <div className="my-4">
                  <Label className="mb-3" htmlFor="unit-select">
                    Measurement Unit
                  </Label>
                  <Select value={selectedUnit} onValueChange={handleUnitChange}>
                    <SelectTrigger id="unit-select" className="max-w-xs mb-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ml/gal">
                        ml per Gallon (ml/gal)
                      </SelectItem>
                      <SelectItem value="ml/5L">
                        ml per 5 Liters (ml/5L)
                      </SelectItem>
                      <SelectItem value="ml/L">ml per Liter (ml/L)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose how nutrient amounts are displayed throughout the app
                  </p>
                </div>

                <div className="border-t pt-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-red-600">
                        Danger Zone
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        These actions cannot be undone
                      </p>
                    </div>
                    <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
                      <Button
                        variant="destructive"
                        onClick={handleResetSchedule}
                      >
                        Reset Schedule
                      </Button>
                      <p className="text-sm text-gray-600 mt-3">
                        This will clear your start date and all watering records
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

