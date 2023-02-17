import { createLoginSchema } from "../schemas/login.schemas";
import { z } from "zod";
import { QueryResult } from "pg";

type ILoginRequest = z.infer<typeof createLoginSchema>;

type ILoginResult = QueryResult<string[]>;

export { ILoginRequest, ILoginResult };
