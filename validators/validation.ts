"use client";
import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
export const imageSchema = z.any().refine(
  (files) => {
    return (
      files instanceof FileList &&
      files.length === 1 &&
      ACCEPTED_TYPES.includes(files[0]?.type) &&
      files[0]?.size <= MAX_FILE_SIZE
    );
  },
  {
    message: "Must be one image or PDF file under 5MB",
  }
);

export const schema = z.object({
  fullNameEnglish: z
    .string()
    .trim()
    .nonempty("Full name is required")
    .refine(
      (val) => /^[A-Za-z\s]+$/.test(val),
      "Only alphabets and spaces are allowed"
    )
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      "Please enter first and last name"
    ),
  fullNameNepali: z.string().trim().nonempty("Full name is required"),
  gender: z.string().min(1, "Please select a gender"),
  dobEnglish: z.string().min(1, "Date of birth is required"),
  dobNepali: z.string().min(1, "Date of birth is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone must be a number"),
  district: z.string().min(1, "District is required"),
  issuedDateAD: z.string().min(1, "Issued Date in AD is required"),
  issuedDateBS: z.string().min(1, "Issued Date in BS is required"),
  citizenshipFront: imageSchema,
  citizenshipBack: imageSchema,
});
