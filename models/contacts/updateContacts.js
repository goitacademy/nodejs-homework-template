import { filePath } from "./filePath.js";
import fs from "fs/promises";

export const updateContacts = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts));
};