import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean(),
  active: z
    .boolean()
    .optional()
    .transform((e) => {
      return (e = true);
    }),
});

const returnUserSchema = createUserSchema.extend({
  id: z.number(),
});

const UserSchemaWithoutPassword = returnUserSchema.omit({ password: true });

const editUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .transform((pass) => {
      return hashSync(pass, 10);
    })
    .optional(),
});

export {
  createUserSchema,
  returnUserSchema,
  UserSchemaWithoutPassword,
  editUserSchema,
};
