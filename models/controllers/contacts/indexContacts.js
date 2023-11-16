import path from "path";
import fs from "fs";

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.promises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (e) {
    console.log(e.toString());
  }
}
