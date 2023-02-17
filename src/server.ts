import app from "./app";
import { startDatabase } from "./database";
app.listen(3000, async () => {
  await startDatabase();
  console.log("server is running on port 3000!");
});
