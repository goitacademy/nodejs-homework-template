import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDirName = path.resolve(__dirname, "..");
export const AVATARS_DIRECTORY = path.join(parentDirName, "public", "avatars");
export const TEMP_DIRECTORY = path.join(parentDirName, "tmp");
