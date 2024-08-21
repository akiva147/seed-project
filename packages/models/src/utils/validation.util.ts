import { ObjectId } from "bson";
import { isEmpty } from "ramda";
import validator from "validator";
import { ZodErrorMap, z } from "zod";
import { isValidIsraeliID } from "./israeliId.util";

export const errorMessages = {
  url: "כתובת ה-URL מכילה נתיב לא חוקי",
  mongoId: "צריך להיות מזהה יחודי תקין",
  date: "פורמט תאריך לא תקין",
  minNumber: "חייב להיות מעל או שווה ל",
  maxNumber: "חייב להיות עד",
  numberString: "חייב להיות מספר חיובי/שלילי/שלם/עשרוני",
  fixedNumber: "חייב להיות מספר שלם",
  phone: "מספר טלפון לא תקין",
  positive: "חייב להיות מספר חיובי",
  idNumber: "תעודת זהות לא תקינה",
  required: "חובה להזין ערך בשדה זה",
  enumOption: "יש לבחור ערך מהרשימה",
  alphabet: "צריך להיות אותיות באנגלית או בעברית בלבד",
  english: "צריך להיות אותיות באנגלית בלבד",
  hebrew: "צריך להיות אותיות בעברית בלבד",
  israeliID: "מספר תעודת זהות אינו תקין",
  localPhone: "מספר טלפון אינו תקין",
  email: "האימייל אינו תקין",
  alphanumericHebEn: "חייב להיות טקסט בעברית או אנגלית, יכול להכיל גם מספרים",
  text: "חייב להיות טקסט תקין, ללא סימנים מיוחדים (@,#,%,&,$,*,^,+,=,<,>,~,`,|,',/,_)",
};

export class ValidationError extends Error {
  public name = "ValidationError";

  public inner: Array<{ path: string; message: string }> = [];

  public constructor(message: string) {
    super(message);
  }
}

const stringSchema = z.string().trim().max(255);
const textAreaSchema = z.string().trim().max(2000);
const dateLike = z.union([z.number(), z.string(), z.date()]);

// Backslash does not need to be escaped in character sets.
const validRegex = /^[a-zA-Z0-9\u0590-\u05FF-.,?!:';"(){}[\]/+\\ \n\t]*/giu;

export const customValidation = {
  alphabet: stringSchema.regex(/^[a-zA-Z\u0590-\u05FF() ,.'-]*$/i, errorMessages.alphabet),
  english: stringSchema.regex(/^[a-zA-z]*$/i, errorMessages.english),
  hebrew: stringSchema.regex(/^[\u0590-\u05FF]*$/i, errorMessages.hebrew),
  israeliID: stringSchema.refine((val) => isValidIsraeliID(val), errorMessages.israeliID),
  phone: {
    localPhone: stringSchema.refine((str) => validator.isMobilePhone(str, ["he-IL"]), {
      message: errorMessages.localPhone,
    }),
    optionalLocalPhone: stringSchema
      .refine((str) => validator.isMobilePhone(str, ["he-IL"]) || isEmpty(str), {
        message: errorMessages.localPhone,
      })
      .nullish(),
  },
  url: z.string().trim().url({ message: errorMessages.url }).max(1000),
  email: stringSchema.email(errorMessages.email),
  dateLikeToDate: dateLike.pipe(
    z.coerce.date({
      invalid_type_error: errorMessages.date,
      required_error: errorMessages.required,
    })
  ),
  age: z.coerce
    .number({ invalid_type_error: errorMessages.positive })
    .int()
    .min(0, `${errorMessages.minNumber} 0`)
    .max(120, `${errorMessages.maxNumber} 120`)
    .nullish(),
  number: z.coerce.number().max(99999).min(-99999),
  alphanumericHebEn: stringSchema.refine((value: string) => {
    const isHebrew = validator.isAlphanumeric(value, "he", {
      ignore: "-, ",
    });
    const isEnglish = validator.isAlphanumeric(value, "en-US", {
      ignore: "-, ",
    });

    return isHebrew || isEnglish;
  }, errorMessages.alphanumericHebEn),
  enumOption: stringSchema.refine((value: string) => {
    const isHebrew = validator.isAlphanumeric(value, "he", {
      ignore: "'\\ /",
    });
    const isEnglish = validator.isAlphanumeric(value, "en-US", {
      ignore: "'\\ /",
    });

    return isHebrew || isEnglish;
  }, errorMessages.enumOption),

  text: stringSchema.regex(validRegex, errorMessages.text),

  longText: textAreaSchema.regex(validRegex, errorMessages.text),

  ObjectId: z.preprocess(
    (arg) => {
      if (ObjectId.isValid(arg as any)) {
        // We know that arg is a valid ObjectId
        return new ObjectId(arg as any);
      } else {
        // throw new Error("Not a valid ObjectId");
        return undefined;
      }
    },
    z.instanceof(ObjectId),
    { invalid_type_error: errorMessages.mongoId }
  ),
};

const CustomErrorMap: ZodErrorMap = (error, ctx) => {
  /*
  This is where you override the various error codes
  */
  switch (error.code) {
    case z.ZodIssueCode.invalid_date:
      return { message: errorMessages.date };
    case z.ZodIssueCode.invalid_type:
      if (error.received !== "undefined" && error.received !== "null") {
        return {
          message: `סוג הערך שגוי, הסוג הרצוי הוא ${error.expected}`,
        };
      } else {
        return { message: errorMessages.required };
      }
    case z.ZodIssueCode.invalid_enum_value:
      return { message: errorMessages.enumOption };
    case z.ZodIssueCode.too_big:
      if (error.type === "string") {
        return { message: `מספר התווים המקסימלי הוא ${error.maximum}` };
      }

      if (error.type === "array" || error.type === "set") {
        return {
          message: `מספר הפריטים המקסימלי הוא ${error.maximum}`,
        };
      }

      return { message: `${errorMessages.maxNumber} ${error.maximum}` };

    case z.ZodIssueCode.too_small:
      if (error.type === "string") {
        return { message: `מספר התווים המינימלי הוא ${error.minimum}` };
      }

      if (error.type === "array" || error.type === "set") {
        return {
          message: `מספר הפריטים המינימלי הוא ${error.minimum}`,
        };
      }

      return { message: `${errorMessages.minNumber} ${error.minimum}` };
  }

  // fall back to default message!
  return { message: ctx.defaultError };
};

z.setErrorMap(CustomErrorMap);
