import {
  UserWithoutPassword,
  UserResult,
  UserWithPassword,
  UserResultWithPassword,
} from "../../interfaces/users.interface";
import { client } from "../../database";

const getAllUsersServices = async (): Promise<Array<UserWithPassword>> => {
  const queryString: string = `
        SELECT 
            *
        FROM
            users
    `;

  const queryResult: UserResultWithPassword = await client.query(queryString);

  return queryResult.rows;
};

export default getAllUsersServices;
