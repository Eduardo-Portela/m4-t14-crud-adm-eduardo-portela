import { ILoginRequest, ILoginResult } from "../../interfaces/login.interface";
import jwt from "jsonwebtoken";
import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import { UserResultWithPassword } from "../../interfaces/users.interface";

const createLoginService = async (
  loginData: ILoginRequest
): Promise<string> => {
  const queryString: string = `
        SELECT 
            *
        FROM
            users
        WHERE
            email = $1
    `;

  const QueryConfig: QueryConfig = {
    text: queryString,
    values: [loginData.email],
  };

  const queryResult: UserResultWithPassword = await client.query(QueryConfig);

  if (queryResult.rowCount == 0) {
    throw new AppError("Wrong Email or Password!", 401);
  }

  const matchPassword: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );

  if (!matchPassword) {
    throw new AppError("Wrong Email or Password!", 401);
  }

  if (!queryResult.rows[0].active) {
    throw new AppError("Inactive User");
  }

  const token: string = jwt.sign(
    {
      isAdmin: queryResult.rows[0].admin,
    },
    "SecretKey",
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};

export default createLoginService;
