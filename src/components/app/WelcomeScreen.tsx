import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sprout, Settings as SettingsIcon } from "lucide-react";

interface WelcomeScreenProps {
  onSetupSchedule: (date: Date) => void;
  onSettingsClick: () => void;
}

/**
 * Initial welcome screen for setting up a new feeding schedule
 */
export function WelcomeScreen({
  onSetupSchedule,
  onSettingsClick,
}: WelcomeScreenProps) {
  const [startDateInput, setStartDateInput] = useState("");

  const handleSetup = () => {
    if (!startDateInput) return;
    const date = new Date(startDateInput);
    onSetupSchedule(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-1 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Sprout className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Flora Feed</CardTitle>
          <CardDescription>
            Feeding schedule tracker for the General Hydroponics Flora Series
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="startDate" className="text-sm font-medium">
              Select Your Start Date
            </label>
            <Input
              id="startDate"
              type="date"
              value={startDateInput}
              onChange={(e) => setStartDateInput(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
            <p className="text-xs text-muted-foreground">
              This is the date you started week 1 of your feeding schedule
            </p>
          </div>
          <Button
            onClick={handleSetup}
            className="w-full"
            disabled={!startDateInput}
          >
            Start Schedule
          </Button>
          <Button
            variant="outline"
            onClick={onSettingsClick}
            className="w-full"
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

