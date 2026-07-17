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

const defaultSettingsBySystem: Record<UnitSystem, Omit<SettingsState, "system">> = {
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

export default function Dropdown() {
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
        <button type="button" className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2">
          <GearIcon />
          Units
          <ArrowDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="min-w-[220px] rounded-md border border-gray-200 bg-white p-3 shadow-lg">
        <button
          type="button"
          className="mb-3 w-full rounded-md border border-gray-300 px-3 py-2 text-left"
          onClick={() => switchSystem(settings.system === "metric" ? "imperial" : "metric")}
        >
          {settings.system === "metric" ? "Switch to Imperial" : "Switch to Metric"}
        </button>

        <DropdownMenu.Separator className="my-2" />
        <DropdownMenu.Label className="px-2 text-sm font-semibold text-gray-600">
          Temperature
        </DropdownMenu.Label>

        <DropdownMenu.RadioGroup
          value={settings.temperature}
          onValueChange={(value) =>
            setSettings((current) => ({ ...current, temperature: value as TemperatureUnit }))
          }
        >
          <DropdownMenu.RadioItem className="flex items-center gap-2 px-2 py-1" value="Celsius">
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Celsius (°C)
          </DropdownMenu.RadioItem>

          <DropdownMenu.RadioItem className="flex items-center gap-2 px-2 py-1" value="Fahrenheit">
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Fahrenheit (°F)
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>

        <DropdownMenu.Separator className="my-2" />
        <DropdownMenu.Label className="px-2 text-sm font-semibold text-gray-600">
          Wind Speed
        </DropdownMenu.Label>
        <DropdownMenu.RadioGroup
          value={settings.windSpeed}
          onValueChange={(value) =>
            setSettings((current) => ({ ...current, windSpeed: value as WindSpeedUnit }))
          }
        >
          <DropdownMenu.RadioItem className="flex items-center gap-2 px-2 py-1" value="km/h">
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            km/h
          </DropdownMenu.RadioItem>

          <DropdownMenu.RadioItem className="flex items-center gap-2 px-2 py-1" value="mph">
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            mph
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>

        <DropdownMenu.Separator className="my-2" />
        <DropdownMenu.Label className="px-2 text-sm font-semibold text-gray-600">
          Precipitation
        </DropdownMenu.Label>
        <DropdownMenu.RadioGroup
          value={settings.precipitation}
          onValueChange={(value) =>
            setSettings((current) => ({ ...current, precipitation: value as PrecipitationUnit }))
          }
        >
          <DropdownMenu.RadioItem className="flex items-center gap-2 px-2 py-1" value="mm">
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Millimeters (mm)
          </DropdownMenu.RadioItem>

          <DropdownMenu.RadioItem className="flex items-center gap-2 px-2 py-1" value="in">
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Inches (in)
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
