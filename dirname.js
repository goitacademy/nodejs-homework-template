import { fileURLToPath } from "url";
import path from "path";
export const dirname = () => {
  return path.dirname(fileURLToPath(import.meta.url));
};
