import fs from "fs";
import { contactsPath } from "./contactsPath.js";

export async function listContacts() {
  try {
    const contacts = JSON.parse(
      (await fs.promises.readFile(contactsPath)).toString()
    );
    return contacts;
  } catch (er) {
    console.log(`Error ${er}`);
  }
}
