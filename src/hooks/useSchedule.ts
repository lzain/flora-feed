import { useState, useEffect } from "react";
import { saveSchedule, getSchedule, getCurrentWeek } from "@/utils/storage";

/**
 * Custom hook for managing feeding schedule state
 */
export function useSchedule() {
  const [hasSchedule, setHasSchedule] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    const schedule = getSchedule();
    if (schedule) {
      const start = new Date(schedule.startDate);
      setStartDate(start);
      const week = getCurrentWeek(start);
      setCurrentWeek(week);
      setSelectedWeek(week);
      setHasSchedule(true);
    }
  }, []);

  const setupSchedule = (date: Date) => {
    saveSchedule(date);
    setStartDate(date);
    const week = getCurrentWeek(date);
    setCurrentWeek(week);
    setSelectedWeek(week);
    setHasSchedule(true);
  };

  const navigateWeek = (direction: number, totalWeeks: number) => {
    const newWeek = selectedWeek + direction;
    if (newWeek >= 1 && newWeek <= totalWeeks) {
      setSelectedWeek(newWeek);
    }
  };

  const getWeekDateRange = () => {
    if (!startDate) return null;
    const weekStartOffset = (selectedWeek - 1) * 7;
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + weekStartOffset);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return { start: weekStart, end: weekEnd };
  };

  return {
    hasSchedule,
    startDate,
    currentWeek,
    selectedWeek,
    setupSchedule,
    navigateWeek,
    getWeekDateRange,
  };
}

