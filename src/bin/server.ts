import app from "../app";
import { connectMongo } from "../model";
import { PORT } from "../config/constants";
import { IError } from "../helpers";

const start = async () => {
  try {
    await connectMongo();

    console.log("Database connection successful.");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (_e: unknown) {
    const error = _e as IError;
    console.log("Failed to start application with error: ", error.message);
    process.exit(1);
  }
};

start();
