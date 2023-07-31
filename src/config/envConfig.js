import { config } from "dotenv";
config();

const { PORT = 3000 } = process.env;

export const envConfigs = {
  port: Number(PORT),
};
