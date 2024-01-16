import path from "path";
import { promises as fs } from "fs";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");
console.log(contactsPath);

export const readContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error reading contacts");
  }
};
