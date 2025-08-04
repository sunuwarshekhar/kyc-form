"use client";
import React, { useState } from "react";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";

interface NepaliCalendarProps {
  onValueChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  label?: string;
  errorMsg?: string;
  required?: boolean;
  type?: "BS" | "AD";
}

function NepaliCalendar({
  onValueChange,
  value,
  placeholder = "मिति छान्नुहोस्",
  errorMsg,
  type = "BS",
}: NepaliCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<NepaliDate | Date | null>(
    value ? new Date(value) : new NepaliDate()
  );
  const [open, setOpen] = useState(false);

  const handleDateChange = (date: NepaliDate | Date | null) => {
    setSelectedDate(date);
    if (date instanceof NepaliDate) {
      const bsDate = date.format("YYYY-MM-DD");
      onValueChange?.(bsDate); // ✅ Save in BS format
    } else {
      onValueChange?.("");
    }
    setTimeout(() => setOpen(false), 100);
  };

  return (
    <div className="w-full">
      <div className="border rounded-lg p-1.5">
        <NepaliDatePicker
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={(date: NepaliDate | Date | null) => handleDateChange(date)}
          showclear={true}
          open={open}
          calendarClassName="bg-white dark:bg-neutral-600"
          menuContainerClassName="bg-white border shadow-md dark:bg-neutral-600 rounded-lg"
        />
      </div>
      {errorMsg && <p className="text-sm text-red-500 mt-1">{errorMsg}</p>}
    </div>
  );
}

export default NepaliCalendar;
