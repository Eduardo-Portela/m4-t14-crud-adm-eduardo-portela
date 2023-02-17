import { QueryResult } from "pg";
import {
  createUserSchema,
  returnUserSchema,
  UserSchemaWithoutPassword,
} from "../schemas/users.schemas";
import { z } from "zod";

type IUserRequest = z.infer<typeof createUserSchema>;

type IUser = z.infer<typeof returnUserSchema>;

type UserWithoutPassword = z.infer<typeof UserSchemaWithoutPassword>;
type UserResult = QueryResult<UserWithoutPassword>;

type UserWithPassword = z.infer<typeof returnUserSchema>;
type UserResultWithPassword = QueryResult<UserWithPassword>;
export {
  IUserRequest,
  IUser,
  UserWithoutPassword,
  UserResult,
  UserWithPassword,
  UserResultWithPassword,
};
