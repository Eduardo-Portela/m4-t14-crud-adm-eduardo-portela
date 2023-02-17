import { QueryConfig } from "pg";
import {
  UserResult,
  UserWithoutPassword,
} from "../../interfaces/users.interface";
import { client } from "../../database";
import { AppError } from "../../errors";

const recoverUserService = async (
  userId: number
): Promise<UserWithoutPassword> => {
  const queryStringVerifyUserIsActive: string = `
        SELECT
            *
        FROM
            users
        WHERE id = $1 AND active = false
    `;
  const queryConfigVerifyUserIsActive: QueryConfig = {
    text: queryStringVerifyUserIsActive,
    values: [userId],
  };

  const queryResultVerifyUserIsActive: UserResult = await client.query(
    queryConfigVerifyUserIsActive
  );

  if (queryResultVerifyUserIsActive.rowCount === 0) {
    throw new AppError("User already Active!", 400);
  }

  const queryString: string = `
        UPDATE
            users
        SET ("active") = ROW(true)
        WHERE id = $1
        RETURNING *
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: UserResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default recoverUserService;
