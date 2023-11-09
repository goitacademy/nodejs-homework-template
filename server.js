import "dotenv/config";
import chalk from "chalk";
import { app } from "./app.js";
import { db } from "./helpers/index.js";

const { SERVER_PORT } = process.env;
const DB_NAME = "db-contacts";

console.log(chalk.blueBright("\nConnecting db..."));

try {
  await db.connect(DB_NAME);
  console.log("Database connection successful");

  console.log(chalk.blueBright("\nSrarting server..."));

  app.listen(SERVER_PORT, () => {
    console.log(
      `Server running on port ${SERVER_PORT}\nMode: ${app.get("env")}`
    );
  });
} catch ({ message }) {
  console.error(chalk.red(`Error: ${message}\n`));
}
