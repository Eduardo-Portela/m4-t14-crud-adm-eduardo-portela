import { QueryConfig } from "pg";
import {
  IUser,
  UserResultWithPassword,
} from "../../interfaces/users.interface";
import { client } from "../../database";

const getUserLoggedService = async (userId: number): Promise<IUser> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
    `;

  const QueryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: UserResultWithPassword = await client.query(QueryConfig);

  return queryResult.rows[0];
};

export default getUserLoggedService;
