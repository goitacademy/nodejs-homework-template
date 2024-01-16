import path from "path";
import { promises as fs } from "fs";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export const writeContacts = async (contacts) => {
  try {
    const data = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, data, { encoding: "utf-8" });
  } catch (error) {
    throw new Error("Error saving contacts");
  }
};
