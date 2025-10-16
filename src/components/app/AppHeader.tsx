import { Button } from "@/components/ui/button";
import { Sprout, Settings as SettingsIcon } from "lucide-react";

interface AppHeaderProps {
  onSettingsClick: () => void;
}

/**
 * Application header with logo and settings button
 */
export function AppHeader({ onSettingsClick }: AppHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sprout className="w-6 h-6 text-green-600" />
        <h1 className="text-2xl font-bold text-gray-900">Flora Feed</h1>
      </div>
      <Button variant="outline" size="sm" onClick={onSettingsClick}>
        <SettingsIcon className="w-4 h-4 mr-1" />
        Settings
      </Button>
    </div>
  );
}

