import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { UserResult } from "../interfaces/users.interface";
import { client } from "../database";
import { AppError } from "../errors";

const verifyUserIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const UserId: number = Number(req.user.id);
  const queryString: string = `
      SELECT
          *
      FROM
          users
      WHERE id = $1 AND admin = true
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [UserId],
  };

  const queryResult: UserResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Insufficient Permission!");
  }

  return next();
};

export default verifyUserIsAdminMiddleware;
