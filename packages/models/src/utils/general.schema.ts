/* eslint-disable import/no-named-as-default-member */
import validator from "validator";
import { z, ZodErrorMap } from "zod";

export const validationErrors = {
  email: "Invalid email",
  positive: "Must be a positive number",
  alphanumericHebEn: "Must be a text in hebrew or english, can contain numbers",
  enumOption: "Must be a text in hebrew or english, can contain numbers",
  text: "Must be valid text, without special characters (@,#,$,*,^,+,=,<,>,~,`,|)",
  mongoId: "Invalid mongoId",
  time: "Invalid time format",
  coordinates: 'Invalid coordinates format: must be: "latitude, longitude"',
  googleId: "Not a valid StringNumber",
  googlePicture: "Not a valid picture url",
};

export const regexes = {
  coordinates:
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
  specialSigns:
    /[^a-zA-Z0-9\u0590-\u05FF \u0600-\u06FF \u0621-\u064A\u0660-\u0669-‎‏–%&..•,_“-”’?!::' ⁠ \n \t \\//״;"(){}[\] ]/gu,
  encodedFile: /[^a-zA-Z0-9\u0590-\u05FF \u0600-\u06FF-.%'"() \n\t]/gu,
  validFileName:
    /^[a-zA-Z0-9\u0590-\u05FF \u0600-\u06FF-. ]+\.(docx|pdf|pptx)$/iu,
  validImageName:
    /^[a-zA-Z0-9\u0590-\u05FF \u0600-\u06FF-. ]+\.(png|jpg|jpeg|pdf)$/iu,
};

export const CustomValidations = {
  alphanumericHebEn: z
    .string()
    .max(40)
    .refine((value: string) => {
      const isHebrew = validator.isAlphanumeric(value, "he", {
        ignore: "-,. ",
      });
      const isEnglish = validator.isAlphanumeric(value, "en-US", {
        ignore: "-,. ",
      });
      const isValid = isHebrew || isEnglish;
      return isValid;
    }, validationErrors.alphanumericHebEn),
  enumOption: z.string().refine((value: string) => {
    const isHebrew = validator.isAlphanumeric(value, "he", {
      ignore: "'\\ /",
    });
    const isEnglish = validator.isAlphanumeric(value, "en-US", {
      ignore: "'\\ /",
    });
    const isValid = isHebrew || isEnglish;
    return isValid;
  }, validationErrors.enumOption),
  text: z
    .string()
    .max(2500)
    .refine((value: string) => {
      return !regexes.specialSigns.test(value);
    }, validationErrors.text),
  encodedValue: z
    .string()
    .max(400)
    .refine((value: string) => {
      return !regexes.encodedFile.test(value);
    }, validationErrors.text),
  date: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  optionalDate: z.preprocess((arg) => {
    if (!arg) return undefined;
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date().nullish()),
  positiveNum: z
    .number()
    .int()
    .min(0, validationErrors.positive)
    .max(999)
    .default(0),
  mongoId: z
    .string()
    .refine(
      (value: string) => validator.isMongoId(value),
      validationErrors.mongoId
    ),
  fileName: z.string().regex(regexes.validFileName),
  imageName: z.string().regex(regexes.validImageName),
  time: z
    .string()
    .refine((value: string) => validator.isTime(value), validationErrors.time),
  coordinates: z
    .string()
    .refine(
      (value) => regexes.coordinates.test(value),
      validationErrors.coordinates
    ),
  googleId: z
    .string()
    .length(21)
    .refine((value) => Number(value), validationErrors.googleId),
  googlePicture: z
    .string()
    .startsWith(
      "https://lh3.googleusercontent.com",
      validationErrors.googlePicture
    ),
};

export default CustomValidations;
