/* eslint-disable import/no-named-as-default-member */
import validator from "validator";
import { z, ZodErrorMap } from "zod";

export const validationErrors = {
  alphabet: "צריך להיות אותיות באנגלית או בעברית בלבד",
  english: "צריך להיות אותיות באנגלית בלבד",
  localPhone: "מספר טלפון אינו תקין",
  email: "האימייל אינו תקין",
  positive: "חייב להיות מספר חיובי",
  alphanumericHebEn: "חייב להיות טקסט בעברית או אנגלית, יכול להכיל גם מספרים",
  enumOption: "חייב להיות טקסט בעברית או אנגלית, יכול להכיל גם מספרים",
  text: "חייב להיות טקסט תקין, ללא סימנים מיוחדים (@,#,$,*,^,+,=,<,>,~,`,|)",
  mongoId: "צריך להיות מזהה יחודי תקין",
  time: "צריך להיות שעה תקינה",
  coordinates: 'פורמט נ"צ שגוי: הפורמט הנכון הוא "קו רוחב, קו אורך"',
  location: "חייב להיות לפחות כתובת או נקודות ציון",
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
  googleId: z.coerce.number().min(21).max(21),
  googlePicture: z
    .string()
    .startsWith("https://lh3.googleusercontent.com", "Not a valid picture url"),
};

const CustomErrorMap: ZodErrorMap = (error, ctx) => {
  /*
  This is where you override the various error codes
  */
  switch (error.code) {
    case z.ZodIssueCode.invalid_date:
      return { message: "תאריך אינו תקין" };
    case z.ZodIssueCode.invalid_type:
      if (error.received !== "undefined") {
        if (error.expected === "integer") {
          return {
            message: `סוג הערך שגוי, הסוג הרצוי הוא מספר שלם`,
          };
        }
        return {
          message: `סוג הערך שגוי, הסוג הרצוי הוא ${error.expected}`,
        };
      } else {
        return { message: "שדה חובה" };
      }
    case z.ZodIssueCode.invalid_enum_value:
      return { message: "יש לבחור ערך מהרשימה" };
    case z.ZodIssueCode.too_big:
      return { message: "ערך גדול מידי" };
    case z.ZodIssueCode.too_small:
      return { message: "ערך קטן מידי" };
  }

  // fall back to default message!
  return { message: ctx.defaultError };
};

z.setErrorMap(CustomErrorMap);

export default CustomValidations;
