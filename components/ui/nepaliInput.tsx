"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";
import googleTransliterate from "react-nepali-typing";

export const NepaliInput = ({
  name,
  placeholder,
  control,
}: {
  name: string;
  placeholder?: string;
  control: any;
  register: any;
}) => {
  const { field: controllerField } = useController({
    name,
    control,
  });

  const inputLanguage = "ne-t-i0-und";
  const maxResult = 1;

  function handleNepaliFont(inputValueEnglish: string, currentValue: string) {
    if (!inputValueEnglish.trim()) {
      return;
    }
    const request = new XMLHttpRequest();
    googleTransliterate(request, inputValueEnglish, inputLanguage, maxResult)
      .then((response: string[]) => {
        if (
          response.constructor === Array &&
          (response as string[]).length > 0
        ) {
          let translatedText = "";
          for (const item of response) {
            if (item?.[0]) {
              translatedText = item[0];
            }
          }
          const words = currentValue.split(" ");
          words[words.length - 1] = translatedText;
          const newValue = `${words.join(" ")} `;
          controllerField.onChange(newValue);
        }
      })
      .catch((error: string) => {
        console.error("Translation error:", error);
        const newValue = `${currentValue} `;
        controllerField.onChange(newValue);
      });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Space" || e.keyCode === 32) {
      e.preventDefault();
      const currentValue = (e.target as HTMLInputElement).value;
      const words = currentValue.split(" ");
      const lastWord = words[words.length - 1];

      if (lastWord.trim()) {
        handleNepaliFont(lastWord.trim(), currentValue);
      } else {
        const newValue = `${currentValue} `;
        controllerField.onChange(newValue);
      }
    }
  };

  return (
    <Input
      id={name}
      type="text"
      placeholder={placeholder}
      value={controllerField.value || ""}
      onChange={controllerField.onChange}
      onKeyDown={handleKeyDown}
      className="font-nepali"
    />
  );
};

export default NepaliInput;
