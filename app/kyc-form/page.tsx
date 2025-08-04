"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { schema } from "@/validators/validation";
import FieldComps from "./_components/FieldComps";
import { fields } from "@/constants/constant";

export default function KycForm() {
  const [step, setStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fullNameEnglish: "",
      fullNameNepali: "",
      gender: "",
      dobEnglish: "",
      dobNepali: "",
      phoneNumber: "",
      district: "",
      issuedDateAD: "",
      issuedDateBS: "",
      citizenshipFront: null,
      citizenshipBack: null,
    },
  });

  const nextStep = async () => {
    const currentFields = fields[step].map((f) => f.name);
    const isValid = await trigger(currentFields);
    if (isValid) {
      clearErrors();
      setStep((prev) => prev + 1);
    } else {
      setShowErrors(true);
      setSubmitAttempted(true);
    }
  };

  const prevStep = () => {
    clearErrors();
    setShowErrors(false);
    setSubmitAttempted(false);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data) => {
    console.log("Final Submission", data);
    setShowErrors(false);
    setSubmitAttempted(false);
  };

  const getCurrentStepErrors = () => {
    const currentFieldNames = fields[step].map((f) => f.name);
    const currentStepErrors = {};

    currentFieldNames.forEach((fieldName) => {
      if (errors[fieldName]) {
        if (submitAttempted || showErrors) {
          currentStepErrors[fieldName] = errors[fieldName];
        }
      }
    });
    return currentStepErrors;
  };

  const errorsToShow = getCurrentStepErrors();

  return (
    <div className="border">
      <form onSubmit={handleSubmit(onSubmit)} className="px-12 py-12 space-y-6">
        <h2 className="text-2xl font-bold mb-4">General Information</h2>
        <div className="grid grid-cols-3 gap-6">
          {fields[step].map((field, idx) => (
            <div key={field.name + idx} className="w-full">
              <FieldComps
                key={field.name}
                step={step}
                field={field}
                register={register}
                errors={errorsToShow}
                control={control}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-6">
          {step > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 rounded bg-gray-300"
            >
              Back
            </button>
          )}

          {step < fields.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 rounded bg-blue-500 text-white"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
