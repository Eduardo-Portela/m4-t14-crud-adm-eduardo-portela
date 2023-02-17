import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import {
  IUser,
  IUserRequest,
  UserResult,
  UserResultWithPassword,
  UserWithoutPassword,
} from "../../interfaces/users.interface";
import { client } from "../../database";
import { AppError } from "../../errors";

const editUserService = async (
  userId: number,
  userData: IUserRequest
): Promise<IUser> => {
  const queryStringCheckEmailExists: string = `
        SELECT 
            *
        FROM
            users
        WHERE
            email = $1
    `;
  const QueryConfigCheckEmailExists: QueryConfig = {
    text: queryStringCheckEmailExists,
    values: [userData.email],
  };
  const queryResultCheckEmailExists: UserResult = await client.query(
    QueryConfigCheckEmailExists
  );

  if (queryResultCheckEmailExists.rowCount > 0) {
    throw new AppError("Email already Exists", 409);
  }

  const queryString: string = format(
    `
        UPDATE
            users
        SET(%I) = ROW(%L)
        WHERE id = $1
        RETURNING *
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const QueryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: UserResultWithPassword = await client.query(QueryConfig);

  return queryResult.rows[0];
};

export { editUserService };
