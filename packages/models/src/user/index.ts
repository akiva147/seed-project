import CustomValidations from "src/utils/general.schema";
import { z } from "zod";

export const rolesEnum = ["Admin", "Normal"] as const;

export const UserSchema = z.object({
  _id: CustomValidations.mongoId,
  gmail: z.string().email("Not a valid gmail address"),
  name: CustomValidations.text,
  googleId: CustomValidations.googleId,
  picture: CustomValidations.googlePicture,
  role: z.enum(rolesEnum),
  createdAt: CustomValidations.date,
  updatedAt: CustomValidations.date,
});

export const GoogleUserTokenSchema = z.object({
  iss: z.literal("https://accounts.google.com"),
  aud: z.string().endsWith(".apps.googleusercontent.com"),
  sub: CustomValidations.googleId,
  email: z.string().email("Not a valid gmail address"),
  email_verified: z.boolean(),
  at_hash: z.string(),
  picture: CustomValidations.googlePicture,
  given_name: CustomValidations.text,
  name: CustomValidations.text,
  family_name: CustomValidations.text,
  iat: z.number().min(10).max(10),
  exp: z.number().min(10).max(10),
});

export const UserSchemaPayload = UserSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type User = z.infer<typeof UserSchema>;
export type GoogleUserToken = z.infer<typeof GoogleUserTokenSchema>;
export type Roles = (typeof rolesEnum)[number];
