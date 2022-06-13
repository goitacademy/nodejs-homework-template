import fs from "fs/promises";
import { filePath } from "./filePath.js";

export const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};
