"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Calendar22Props = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
};

export function Calendar22({
  value,
  onChange,
  placeholder = "Select date",
}: Calendar22Props) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    onChange?.(selectedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal"
          onClick={() => setOpen((prev) => !prev)} // 🛠 Ensure toggle on click
        >
          {value ? value.toLocaleDateString() : placeholder}
          <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
