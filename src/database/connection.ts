import client from "./config";

const startDatabase = async () => {
  await client.connect();
  console.log("Database Connected!");
};

export default startDatabase;
