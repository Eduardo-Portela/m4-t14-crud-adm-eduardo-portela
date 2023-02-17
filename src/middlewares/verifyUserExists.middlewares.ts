import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../errors";
import { UserResult } from "../interfaces/users.interface";

const verifyUsersExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = Number(req.params.id);

  const queryStringVerifyuserExists: string = `
    SELECT 
        *
    FROM
        users
    WHERE id = $1
`;
  const queryConfigVerifyuserExists: QueryConfig = {
    text: queryStringVerifyuserExists,
    values: [userId],
  };

  const queryResultVerifyuserExists: UserResult = await client.query(
    queryConfigVerifyuserExists
  );

  if (queryResultVerifyuserExists.rowCount === 0) {
    throw new AppError("User not found!", 404);
  }

  return next();
};

export { verifyUsersExistMiddleware };
