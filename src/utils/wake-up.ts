import nodeCron from "node-cron";
import axios from "axios";
import { log } from "./logger";
import HttpError from "../helpers/HttpError";

const healthCheck = async () => {
  try {
    const resp = await axios.get(process.env.BASE_URL!);
    console.log(log, "Health check resp- ", resp.status);
  } catch (error) {
    HttpError(500, (error as Error).message);
  }
};

export const wakeUp = () => {
  nodeCron.schedule("*/10 * * * *", healthCheck);
};
