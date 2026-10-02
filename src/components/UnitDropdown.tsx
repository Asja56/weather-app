import { ArrowDownIcon, CheckIcon, GearIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "radix-ui";

export type UnitSystem = "metric" | "imperial";
export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "inch";

export type SettingsState = {
  system: UnitSystem;
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
};

const defaultSettingsBySystem: Record<
  UnitSystem,
  Omit<SettingsState, "system">
> = {
  metric: {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  },
  imperial: {
    temperature: "fahrenheit",
    windSpeed: "mph",
    precipitation: "inch",
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export const defaultSettings: SettingsState = {
  system: "metric",
  ...defaultSettingsBySystem.metric,
};

type UnitDropdownProps = {
  settings: SettingsState;
  onSettingsChange: (settings: SettingsState) => void;
};

export default function UnitDropdown({
  settings,
  onSettingsChange,
}: UnitDropdownProps) {

  const switchSystem = (nextSystem: UnitSystem) => {
    onSettingsChange({
      system: nextSystem,
      ...defaultSettingsBySystem[nextSystem],
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md text-base px-2 py-1 lg:px-3 lg:py-2 lg:text-lg bg-neutral-800"
        >
          <GearIcon />
          Units
          <ArrowDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="min-w-[220px] rounded-md  bg-neutral-700 p-3 shadow-lg">
        <button
          type="button"
          className="mb-3 w-full rounded-md px-3 py-2 text-left border-1 border border-neutral-700 focus:border-white hover:bg-neutral-800"
          onClick={() =>
            switchSystem(settings.system === "metric" ? "imperial" : "metric")
          }
        >
          {settings.system === "metric"
            ? "Switch to Imperial"
            : "Switch to Metric"}
        </button>

        <DropdownMenu.Separator className="my-2" />
        <DropdownMenu.Label className="px-2 text-sm font-semibold text-gray-600">
          Temperature
        </DropdownMenu.Label>

        <DropdownMenu.RadioGroup
          value={settings.temperature}
          onValueChange={(value) =>
            onSettingsChange({
              ...settings,
              temperature: value as TemperatureUnit,
            })
          }
        >
          <DropdownMenu.RadioItem
            className="hover:cursor-pointer flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="celsius"
          >
            Celsius (°C)
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.RadioItem>

          <DropdownMenu.RadioItem
            className="hover:cursor-pointer flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="fahrenheit"
          >
            Fahrenheit (°F)
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>

        <DropdownMenu.Separator className="my-2" />
        <DropdownMenu.Label className="px-2 text-sm font-semibold text-gray-600">
          Wind Speed
        </DropdownMenu.Label>
        <DropdownMenu.RadioGroup
          value={settings.windSpeed}
          onValueChange={(value) =>
            onSettingsChange({
              ...settings,
              windSpeed: value as WindSpeedUnit,
            })
          }
        >
          <DropdownMenu.RadioItem
            className="hover:cursor-pointer flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="kmh"
          >
            km/h
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.RadioItem>

          <DropdownMenu.RadioItem
            className="hover:cursor-pointer flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="mph"
          >
            mph
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>

        <DropdownMenu.Separator className="my-2" />
        <DropdownMenu.Label className="px-2 text-sm font-semibold text-gray-600">
          Precipitation
        </DropdownMenu.Label>
        <DropdownMenu.RadioGroup
          value={settings.precipitation}
          onValueChange={(value) =>
            onSettingsChange({
              ...settings,
              precipitation: value as PrecipitationUnit,
            })
          }
        >
          <DropdownMenu.RadioItem
            className="hover:cursor-pointer flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="mm"
          >
            Millimeters (mm)
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.RadioItem>

          <DropdownMenu.RadioItem
            className="hover:cursor-pointer flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="inch"
          >
            Inches (in)
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
