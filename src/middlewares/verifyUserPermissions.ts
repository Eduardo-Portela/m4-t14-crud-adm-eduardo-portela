import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../errors";
import { UserResult } from "../interfaces/users.interface";

const verifyUserPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const loggedUserId: number = Number(req.user.id);
  const paramsUserId: number = Number(req.params.id);

  const queryString: string = `
    SELECT
        *
    FROM
        users
    WHERE id = $1 AND admin = true
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [loggedUserId],
  };

  const queryResult: UserResult = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    return next();
  }

  if (loggedUserId !== paramsUserId) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default verifyUserPermissions;
