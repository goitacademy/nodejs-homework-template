import { app } from "./app.js";
import { connectMongo } from "./db/connection.js";

(async () => {
  connectMongo();

  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
})();
