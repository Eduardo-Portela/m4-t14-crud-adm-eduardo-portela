import {
  IUserRequest,
  UserResult,
  UserWithoutPassword,
} from "../../interfaces/users.interface";
import { client } from "../../database";
import format from "pg-format";
import { QueryConfig } from "pg";
import { AppError } from "../../errors";
import { UserSchemaWithoutPassword } from "../../schemas/users.schemas";

const createUsersServices = async (
  userData: IUserRequest
): Promise<UserWithoutPassword> => {
  const queryStringUserExist: string = `
      SELECT 
          * 
      FROM 
          users
      WHERE email = $1
  `;

  const queryStringUserExistConfig: QueryConfig = {
    text: queryStringUserExist,
    values: [userData.email],
  };

  const queryStringUserExistResult: UserResult = await client.query(
    queryStringUserExistConfig
  );

  if (queryStringUserExistResult.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  const queryString: string = format(
    `
        INSERT INTO
                users(%I)
        VALUES (%L)
        RETURNING "id", "name", "email", "admin", "active"
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: UserResult = await client.query(queryString);

  const newUser: UserWithoutPassword = UserSchemaWithoutPassword.parse(
    queryResult.rows[0]
  );

  return newUser;
};

export { createUsersServices };
