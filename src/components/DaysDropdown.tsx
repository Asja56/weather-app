import { ArrowDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "radix-ui";

type DaysDropdownProps = {
  selectedDay: string;
  onDayChange: (day: string) => void;
};

export default function DaysDropdown({
  selectedDay,
  onDayChange,
}: DaysDropdownProps) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="rounded-md flex items-center gap-2 text-base px-2 py-1 lg:px-3 lg:py-2 lg:text-lg bg-neutral-600 overflow-hidden "
        >
          {selectedDay ?? "Today"}
          <ArrowDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="z-10 min-w-[220px] rounded-md bg-neutral-700 p-3 shadow-lg">
        {days.map((day) => {
          const isSelected = selectedDay === day;

          return (
            <DropdownMenu.Item
              key={day}
              className={`DropdownMenuItem flex flex-row items-center gap-2 rounded-md px-3 py-2 ${
                isSelected ? "bg-neutral-800" : ""
              }`}
            >
              {isSelected && <CheckIcon />}

              <button
                type="button"
                className="w-full text-left"
                onClick={() => onDayChange(day)}
              >
                {day}
              </button>
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
