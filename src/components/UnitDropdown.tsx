import { useEffect, useState } from "react";
import { ArrowDownIcon, CheckIcon, GearIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "radix-ui";

type UnitSystem = "metric" | "imperial";
type TemperatureUnit = "Celsius" | "Fahrenheit";
type WindSpeedUnit = "km/h" | "mph";
type PrecipitationUnit = "mm" | "in";

type SettingsState = {
  system: UnitSystem;
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
};

const STORAGE_KEY = "weather-app-units";

const defaultSettingsBySystem: Record<
  UnitSystem,
  Omit<SettingsState, "system">
> = {
  metric: {
    temperature: "Celsius",
    windSpeed: "km/h",
    precipitation: "mm",
  },
  imperial: {
    temperature: "Fahrenheit",
    windSpeed: "mph",
    precipitation: "in",
  },
};

function getInitialSettings(): SettingsState {
  if (typeof window === "undefined") {
    return {
      system: "metric",
      ...defaultSettingsBySystem.metric,
    };
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return {
        system: "metric",
        ...defaultSettingsBySystem.metric,
      };
    }

    const parsed = JSON.parse(storedValue) as Partial<SettingsState>;
    const system = parsed.system === "imperial" ? "imperial" : "metric";

    return {
      system,
      temperature:
        parsed.temperature === "Fahrenheit" ? "Fahrenheit" : "Celsius",
      windSpeed: parsed.windSpeed === "mph" ? "mph" : "km/h",
      precipitation: parsed.precipitation === "in" ? "in" : "mm",
    };
  } catch {
    return {
      system: "metric",
      ...defaultSettingsBySystem.metric,
    };
  }
}

export default function UnitDropdown() {
  const [settings, setSettings] = useState<SettingsState>(getInitialSettings);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const switchSystem = (nextSystem: UnitSystem) => {
    setSettings({
      system: nextSystem,
      ...defaultSettingsBySystem[nextSystem],
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md  px-3 py-2 bg-neutral-800"
        >
          <GearIcon />
          Units
          <ArrowDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="min-w-[220px] rounded-md  bg-neutral-700 p-3 shadow-lg">
        <button
          type="button"
          className="mb-3 w-full rounded-md px-3 py-2 text-left"
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
            setSettings((current) => ({
              ...current,
              temperature: value as TemperatureUnit,
            }))
          }
        >
          <DropdownMenu.RadioItem
            className="flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="Celsius"
          >
            
            Celsius (°C)
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.RadioItem>

          <DropdownMenu.RadioItem
            className="flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="Fahrenheit"
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
            setSettings((current) => ({
              ...current,
              windSpeed: value as WindSpeedUnit,
            }))
          }
        >
          <DropdownMenu.RadioItem
            className="flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="km/h"
          >
            km/h
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.RadioItem>

          <DropdownMenu.RadioItem
            className="flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
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
            setSettings((current) => ({
              ...current,
              precipitation: value as PrecipitationUnit,
            }))
          }
        >
          <DropdownMenu.RadioItem
            className="flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="mm"
          >
            Millimeters (mm)
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.RadioItem>

          <DropdownMenu.RadioItem
            className="flex items-center gap-2 rounded-md px-2 py-1 justify-between data-[state=checked]:bg-neutral-800"
            value="in"
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
