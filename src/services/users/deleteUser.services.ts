import { QueryConfig } from "pg";
import { client } from "../../database";

const deleteUsersServices = async (userId: number): Promise<void> => {
  const queryString: string = `
        UPDATE
            users
        SET
            "active" = false
        WHERE id = $1
  `;

  const QueryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  await client.query(QueryConfig);
};

export default deleteUsersServices;
