import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useController } from "react-hook-form";
import "@zener/nepali-datepicker-react/index.css";
import NepaliCalendar from "@/components/ui/nepaliDatePicker";
import { NepaliInput } from "@/components/ui/nepaliInput";
import { fields } from "@/constants/constant";
import { Calendar22 } from "@/components/ui/datePicker";

type FieldProps = {
  step: number;
  field: {
    name: string;
    label: string;
    isRequired?: boolean;
    type: string;
    placeholder?: string;
    options?: string[];
    elType?: string;
  };
  register: any;
  errors: any;
  control: any;
};

export default function FieldComps({
  step,
  field,
  register,
  errors,
  control,
}: FieldProps) {
  const { name, label, type, placeholder, isRequired } = field;
  const { field: controllerField } = useController({
    name,
    control,
  });
  let inputElement = null;

  switch (type) {
    case "text":
      inputElement = (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
        />
      );
      break;
    case "select":
      inputElement = (
        <Select
          onValueChange={controllerField.onChange}
          value={controllerField.value}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder || "Select option"} />
          </SelectTrigger>
          <SelectContent>
            {fields[step]
              ?.find((x) => x.name == name)
              ?.options?.map((opt, idx) => {
                return (
                  <SelectItem key={opt + idx} value={opt}>
                    {opt}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      );
      break;
    case "number":
      inputElement = (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
        />
      );
      break;
    case "date":
      inputElement = (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Calendar22
              value={field.value ? new Date(field.value) : undefined}
              onChange={(date) => {
                if (date) {
                  field.onChange(date.toISOString().split("T")[0]);
                } else {
                  field.onChange("");
                }
              }}
            />
          )}
        />
      );
      break;
    case "nepDate":
      inputElement = (
        <Controller
          name={name} // Use dynamic name instead of hardcoded "dateOfBirth"
          control={control}
          render={({ field }) => (
            <NepaliCalendar
              value={field.value}
              onValueChange={(val) => field.onChange(val)}
            />
          )}
        />
      );
      break;

    case "nepaliInput":
      inputElement = (
        <NepaliInput
          name={name}
          placeholder={placeholder}
          control={control}
          register={register}
        />
      );
      break;
    case "file":
      inputElement = <Input type="file" {...register(name)} />;
      break;

    default:
      inputElement = null;
  }

  if (!inputElement) return null;

  return (
    <div className="flex flex-col">
      <Label htmlFor={name} className="mb-1">
        {label} {isRequired && <span className="text-red-500 text-lg">*</span>}
      </Label>
      {inputElement}
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
}
