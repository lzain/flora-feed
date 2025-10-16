import { useState } from "react";
import { getTotalWeeks, getWeekSchedule } from "@/data/feedingSchedule";
import { SettingsPage } from "@/components/SettingsPage";
import {
  AppHeader,
  WelcomeScreen,
  WeekNavigation,
  NutrientCard,
  WateringStatusCard,
} from "@/components/app";
import { useSchedule, useSettings, useWatering } from "@/hooks";
import type { View, NutrientValues } from "@/types";
import "./App.css";

/**
 * Main application component for Flora Feed
 */
function App() {
  const [currentView, setCurrentView] = useState<View>("main");

  // Custom hooks for state management
  const {
    hasSchedule,
    startDate,
    currentWeek,
    selectedWeek,
    setupSchedule,
    navigateWeek,
    getWeekDateRange,
  } = useSchedule();

  const { currentPreset, currentUnit, loadSettings } = useSettings();
  const { wateringRecord, markAsWatered, unmarkAsWatered } =
    useWatering(selectedWeek);

  // Handlers
  const handleSettingsChange = () => {
    loadSettings();
  };

  const handleMarkWatered = () => {
    if (!weekSchedule) return;

    const nutrients: NutrientValues = {
      floraMicro: weekSchedule.floraMicro,
      floraGro: weekSchedule.floraGro,
      floraBloom: weekSchedule.floraBloom,
      caliMagic: weekSchedule.caliMagic,
      floralicious: weekSchedule.floralicious,
      koolBloom: weekSchedule.koolBloom,
    };

    markAsWatered(
      selectedWeek,
      nutrients,
      weekSchedule.phase,
      weekSchedule.growthStage
    );
  };

  const handleUnmarkWatered = () => {
    unmarkAsWatered(selectedWeek);
  };

  // Calculate values
  const totalWeeks = currentPreset ? getTotalWeeks(currentPreset.schedule) : 13;
  const weekSchedule = currentPreset
    ? getWeekSchedule(selectedWeek, currentPreset.schedule)
    : null;
  const weekDateRange = getWeekDateRange();

  // Show settings view
  if (currentView === "settings") {
    return (
      <SettingsPage
        onBack={() => setCurrentView("main")}
        onSettingsChange={handleSettingsChange}
      />
    );
  }

  // Show welcome screen if no schedule
  if (!hasSchedule) {
    return (
      <WelcomeScreen
        onSetupSchedule={setupSchedule}
        onSettingsClick={() => setCurrentView("settings")}
      />
    );
  }

  // Main app view
  if (!weekSchedule) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto space-y-4 py-8">
        {/* Header */}
        <AppHeader onSettingsClick={() => setCurrentView("settings")} />

        {/* Week Navigation */}
        <WeekNavigation
          weekSchedule={weekSchedule}
          selectedWeek={selectedWeek}
          currentWeek={currentWeek}
          totalWeeks={totalWeeks}
          weekDateRange={weekDateRange}
          onNavigate={(direction) => navigateWeek(direction, totalWeeks)}
        />

        {/* Nutrients Card */}
        <NutrientCard weekSchedule={weekSchedule} currentUnit={currentUnit} />

        {/* Watering Status */}
        <WateringStatusCard
          wateringRecord={wateringRecord}
          currentUnit={currentUnit}
          onMarkWatered={handleMarkWatered}
          onUnmarkWatered={handleUnmarkWatered}
        />

        {/* Info Footer */}
        {startDate && (
          <div className="text-center text-sm text-gray-600">
            Schedule started:{" "}
            {new Date(startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
